package edu.placemenet.backend.Controller;

import edu.placemenet.backend.Entity.Message;
import edu.placemenet.backend.Service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService service) {
        this.messageService = service;
    }

    // Send a new message
    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        Message saved = messageService.sendMessage(message);
        return ResponseEntity.ok(saved);
    }

    // Get messages for recipient & pj
    @GetMapping
    public ResponseEntity<List<Message>> getMessages(
            @RequestParam String pj) {
        List<Message> messages = messageService.getMessages(pj);
        return ResponseEntity.ok(messages);
    }

    // Mark message as read
    @PatchMapping("/{id}/read")
    public ResponseEntity<Message> markAsRead(@PathVariable Long id) {
        return messageService.markAsRead(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
