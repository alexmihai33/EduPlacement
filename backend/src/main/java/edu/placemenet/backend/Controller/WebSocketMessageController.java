package edu.placemenet.backend.Controller;


import edu.placemenet.backend.Entity.Message;
import edu.placemenet.backend.Service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketMessageController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageService messageService;

    @MessageMapping("/chat") // Clients send to /app/chat
    public void receiveMessage(Message message) {
        Message saved = messageService.sendMessage(message);
        messagingTemplate.convertAndSend("/topic/messages/" + message.getPj(), saved);
    }
}
