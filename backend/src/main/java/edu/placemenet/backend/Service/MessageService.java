package edu.placemenet.backend.Service;

import edu.placemenet.backend.Entity.Message;
import edu.placemenet.backend.Repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository repo) {
        this.messageRepository = repo;
    }

    public Message sendMessage(Message message) {
        // Optionally validate sender, recipient, pj here
        return messageRepository.save(message);
    }

    public List<Message> getMessages(String pj) {
        return messageRepository.findByPjOrderBySentAtAsc(pj);
    }

    public Optional<Message> markAsRead(Long messageId) {
        Optional<Message> msg = messageRepository.findById(messageId);
        msg.ifPresent(m -> {
            m.setRead(true);
            messageRepository.save(m);
        });
        return msg;
    }
}
