package com.radhaa.chat_app_backend.Controller;

import com.radhaa.chat_app_backend.config.AppConstants;
import com.radhaa.chat_app_backend.dto.Message;
import com.radhaa.chat_app_backend.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(AppConstants.Front_end_base_url)
public class RoomController
{
    @Autowired
    RoomService roomService;

    //creating the room by room id
    @PostMapping("/createRoom")
    public ResponseEntity<?> createRoom(@RequestBody String roomId)
    {
        return roomService.createRoom(roomId);
    }

    //joining the room by roomid
    @GetMapping("/join/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId)
    {
        return roomService.joinRoom(roomId);
    }

    //get messages from the room
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String roomId ,
                                                     @RequestParam (value="page", defaultValue = "0" ,required = false) int page,
                                                     @RequestParam (value="size",defaultValue = "20",required = false)int size)
    {
        return roomService.getMessages(roomId);
    }

}
