package com.radhaa.chat_app_backend.Repository;

import com.radhaa.chat_app_backend.Entity.room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepo extends MongoRepository<room, String>
{
     room findByRoomId(String roomId);
}
