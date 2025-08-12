package com.radhaa.chat_app_backend.Controller;

import com.radhaa.chat_app_backend.Service.chatService;
import com.radhaa.chat_app_backend.config.AppConstants;
import com.radhaa.chat_app_backend.dto.Message;
import com.radhaa.chat_app_backend.payLoad.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@CrossOrigin(AppConstants.Front_end_base_url)
public class chatController {

    @Autowired
    private chatService chatService;

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(@DestinationVariable String roomId,
                               @RequestBody MessageRequest Request){

        System.out.println("recieved message"+roomId+Request);
        return chatService.sendMessage(roomId , Request);
    }
}
