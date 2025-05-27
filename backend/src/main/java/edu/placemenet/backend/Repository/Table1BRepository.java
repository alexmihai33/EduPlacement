package edu.placemenet.backend.Repository;

import edu.placemenet.backend.Entity.Table1B;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Table1BRepository extends JpaRepository<Table1B, Long> {

    @Query("SELECT DISTINCT t.pj FROM Table1B t")
    List<String> findDistinctPj();

    List<Table1B> findByPj(String pj);
}
