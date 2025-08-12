package com.radhaa.chat_app_backend.Service;

import com.radhaa.chat_app_backend.Entity.room;
import com.radhaa.chat_app_backend.Repository.RoomRepo;
import com.radhaa.chat_app_backend.dto.Message;
import com.radhaa.chat_app_backend.payLoad.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class chatService
{
  @Autowired
   private RoomRepo roomRepo;

    public Message sendMessage(String roomId , MessageRequest req)
    {
        room byRoomId = roomRepo.findByRoomId(roomId);
        Message message=new Message();
        message.setSender(req.getSender());
        message.setContent(req.getContent());
        message.setTimestamp(LocalDateTime.now());
        if(byRoomId !=null)
        {
         byRoomId.getMessages().add(message);
         roomRepo.save(byRoomId);
        }
        else
        {
            throw new RuntimeException("room not found!!");
        }
        return message;
    }
}
