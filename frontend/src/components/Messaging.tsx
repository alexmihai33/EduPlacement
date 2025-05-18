import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

interface Message {
    id: number;
    senderId: string;
    recipientId: string;
    content: string;
    timestamp: string;
}

interface MessagingProps {
    pj: string;

}

const Messaging: React.FC<MessagingProps> = ({ pj }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth0()

    useEffect(() => {
        if (isOpen) {
            fetchMessages();
            const interval = setInterval(fetchMessages, 5000);
            return () => clearInterval(interval);
        }
    }, [isOpen]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/messages`, {
                params: { pj }
            });
            setMessages(response.data);
            scrollToBottom();
        } catch (err) {
            console.error("Error fetching messages:", err);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        try {
            await axios.post(`http://localhost:8080/api/messages`, {
                pj: pj,
                senderId: user?.email,
                recipientId: user?.userRole,
                content: newMessage
            });
            setNewMessage('');
            fetchMessages();
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    const safeParseDate = (timestamp: string) => {
        try {
            const isoLike = timestamp.replace(' ', 'T').replace(/\+\d+$/, 'Z');
            return new Date(isoLike).toLocaleString('ro-RO');
        } catch {
            return '';
        }
    };

    return (
        <>
            {
                <>
               
                    <button
                        onClick={() => setIsOpen(true)}
                        style={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            borderRadius: '50%',
                            width: '70px',
                            height: '70px',
                            backgroundColor: '#6f42c1',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '32px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}
                        title="Deschide chat"
                        aria-label="Open chat"
                    >
                        <i className="bi bi-chat-dots"></i>
                    </button>
                </>
            }

            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '360px',
                        maxHeight: '480px',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        zIndex: 10000000
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            backgroundColor: '#6f42c1',
                            color: 'white',
                            padding: '12px',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <span><i className="bi bi-chat-fill me-2"></i>Chat</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '20px',
                                cursor: 'pointer'
                            }}
                            title="Închide"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        style={{
                            flex: 1,
                            padding: '12px',
                            overflowY: 'auto',
                            backgroundColor: '#f8f9fc'
                        }}
                    >
                        {messages.length === 0 ? (
                            <p style={{ fontStyle: 'italic', color: '#666' }}>Niciun mesaj încă.</p>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    style={{
                                        marginBottom: '14px',
                                        textAlign: msg.senderId !== user?.email ? 'right' : 'left'
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            marginBottom: '4px',
                                            color: '#6f42c1'
                                        }}
                                    >
                                        {msg.senderId} - {msg.recipientId}
                                    </div>
                                    <div
                                        style={{
                                            display: 'inline-block',
                                            padding: '10px 14px',
                                            borderRadius: '14px',
                                            backgroundColor: msg.senderId === user?.email ? '#6f42c1' : '#e1e4ff',
                                            color: msg.senderId === user?.email ? 'white' : '#333',
                                            maxWidth: '75%',
                                            wordBreak: 'break-word'
                                        }}
                                    >
                                        {msg.content}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '0.7rem',
                                            color: '#999',
                                            marginTop: '4px'
                                        }}
                                    >
                                        {safeParseDate(msg.timestamp)}
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{ display: 'flex', borderTop: '1px solid #ccc' }}>
                        <input
                            type="text"
                            placeholder="Scrie un mesaj..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSend();
                            }}
                            style={{
                                flex: 1,
                                border: 'none',
                                padding: '10px',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                backgroundColor: '#6f42c1',
                                color: 'white',
                                border: 'none',
                                padding: '0 16px',
                                cursor: 'pointer'
                            }}
                            title="Trimite"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Messaging;
