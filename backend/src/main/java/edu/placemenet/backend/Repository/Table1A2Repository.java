package edu.placemenet.backend.Repository;

import edu.placemenet.backend.Entity.Table1A2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Table1A2Repository extends JpaRepository<Table1A2, Long> {

    @Query("SELECT DISTINCT t.pj FROM Table1A2 t")
    List<String> findDistinctPj();

    List<Table1A2> findByPj(String pj);
}
