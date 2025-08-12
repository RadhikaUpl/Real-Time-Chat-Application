package com.radhaa.chat_app_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer
{
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat")
                .setAllowedOrigins(AppConstants.Front_end_base_url)
                .withSockJS();
    }

    @Override
    //it used to configure messagebroker , msgBroker is and intermediate that helps to route the message
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        // /topic/messages
        config.setApplicationDestinationPrefixes("/app");
        //it creates perfix for that message that is handled by server side controller
        // /app/chat
        //server side: @MessagingMapping("/chat")
    }
}
