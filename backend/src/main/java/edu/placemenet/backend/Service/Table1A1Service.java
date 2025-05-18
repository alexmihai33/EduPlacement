package edu.placemenet.backend.Service;

import edu.placemenet.backend.Entity.Table1A1;
import edu.placemenet.backend.Repository.Table1A1Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class Table1A1Service {

    @Autowired
    private Table1A1Repository repository;

    public List<Table1A1> getAllRowsSortedById() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }


    public Optional<Table1A1> getRowById(Long id) {
        return repository.findById(id);
    }

    public Table1A1 saveRow(Table1A1 row) {
        return repository.save(row);
    }

    public List<Table1A1> updateAllRows(List<Table1A1> updatedRows) {
        List<Table1A1> savedRows = new ArrayList<>();
        for (Table1A1 row : updatedRows) {
            savedRows.add(repository.save(row)); // repository auto-updates if ID exists
        }
        return savedRows;
    }

    public List<String> getDistinctPjs() {
        return repository.findDistinctPj();
    }

    public List<Table1A1> getRowsByPj(String pj) {
        return repository.findByPj(pj);
    }


    public void deleteRow(Long id) {
        repository.deleteById(id);
    }
}
