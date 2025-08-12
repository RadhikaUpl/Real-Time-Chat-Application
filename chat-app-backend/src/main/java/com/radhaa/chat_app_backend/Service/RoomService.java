package com.radhaa.chat_app_backend.Service;

import com.radhaa.chat_app_backend.dto.Message;
import com.radhaa.chat_app_backend.Entity.room;
import com.radhaa.chat_app_backend.Repository.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    
    @Autowired
    RoomRepo roomRepo;
    
    public ResponseEntity<?> createRoom(String roomId)
    {
        room byRoomId = roomRepo.findByRoomId(roomId);
        if(byRoomId!=null)
        {
           return ResponseEntity.badRequest().body("Room already exists !!");
        }
        room Room=new room();
        Room.setRoomId(roomId);
        roomRepo.save(Room);
        return ResponseEntity.status(HttpStatus.CREATED).body(Room);
    }

    public ResponseEntity<?> joinRoom(String roomId)
    {
        room byRoomId = roomRepo.findByRoomId(roomId);
        if(byRoomId==null)
        {
            return ResponseEntity.badRequest().body("Room not found !!");
        }
        return ResponseEntity.ok(byRoomId);
    }

    public ResponseEntity<List<Message>> getMessages(String roomId)
    {
        room byRoomId = roomRepo.findByRoomId(roomId);
        if(byRoomId==null)
        {
            return ResponseEntity.badRequest().build();
        }
        List<Message> messages = byRoomId.getMessages();
        return ResponseEntity.ok(messages);
    }
}
