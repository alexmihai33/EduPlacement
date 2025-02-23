package edu.placemenet.backend.Repository;

import edu.placemenet.backend.Entity.Table1;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// Extend JpaRepository for CRUD operations
public interface Table1Repository extends JpaRepository<Table1, Long> {
    // Custom query method to find rows by user_id
    List<Table1> findByUserId(int userId);
}

