package edu.placemenet.backend.Service;

import edu.placemenet.backend.Entity.Table1A1;
import edu.placemenet.backend.Repository.Table1A1Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class Table1A1Service {

    @Autowired
    private Table1A1Repository repository;

    public List<Table1A1> getAllRows() {
        return repository.findAll();
    }

    public Optional<Table1A1> getRowById(Long id) {
        return repository.findById(id);
    }

    public Table1A1 saveRow(Table1A1 row) {
        return repository.save(row);
    }

    public Table1A1 updateRow(Long id, Table1A1 updatedRow) {
        if (repository.existsById(id)) {
            updatedRow.setId(id);
            return repository.save(updatedRow);
        }
        return null;
    }

    public void deleteRow(Long id) {
        repository.deleteById(id);
    }
}
