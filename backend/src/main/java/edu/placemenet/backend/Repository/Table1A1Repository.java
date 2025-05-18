package edu.placemenet.backend.Repository;

import edu.placemenet.backend.Entity.Table1A1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Table1A1Repository extends JpaRepository<Table1A1, Long> {

    @Query("SELECT DISTINCT t.pj FROM Table1A1 t")
    List<String> findDistinctPj();

    List<Table1A1> findByPj(String pj);
}
