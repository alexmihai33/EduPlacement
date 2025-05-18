package edu.placemenet.backend.Entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String pj;

    @Column(nullable = false)
    private String senderId;

    @Column(nullable = false)
    private String recipientId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private OffsetDateTime sentAt = OffsetDateTime.now();

    @Column(nullable = false)
    private boolean read = false;

    // Getters and setters omitted for brevity

    public Message() {}

    public Message(String pj, String senderId, String recipientId, String content) {
        this.pj = pj;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
        this.sentAt = OffsetDateTime.now();
        this.read = false;
    }

    public Long getId() {
        return id;
    }

    public String getPj() {
        return pj;
    }

    public String getSenderId() {
        return senderId;
    }

    public String getRecipientId() {
        return recipientId;
    }

    public String getContent() {
        return content;
    }

    public OffsetDateTime getSentAt() {
        return sentAt;
    }

    public boolean isRead() {
        return read;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPj(String pj) {
        this.pj = pj;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public void setRecipientId(String recipientId) {
        this.recipientId = recipientId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setSentAt(OffsetDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public void setRead(boolean read) {
        this.read = read;
    }
}
