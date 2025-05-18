package edu.placemenet.backend.Repository;

import edu.placemenet.backend.Entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    // Get messages for a recipient filtered by pj ordered by date ascending
    List<Message> findByPjOrderBySentAtAsc(String pj);

}