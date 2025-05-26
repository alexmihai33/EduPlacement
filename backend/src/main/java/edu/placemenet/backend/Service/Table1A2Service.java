package edu.placemenet.backend.Service;

import edu.placemenet.backend.Entity.Table1A2;
import edu.placemenet.backend.Repository.Table1A2Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class Table1A2Service {

    @Autowired
    private Table1A2Repository repository;

    public List<Table1A2> getAllRowsSortedById() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public Optional<Table1A2> getRowById(Long id) {
        return repository.findById(id);
    }

    public Table1A2 saveRow(Table1A2 row) {
        return repository.save(row);
    }

    public List<Table1A2> updateAllRows(List<Table1A2> updatedRows) {
        List<Table1A2> savedRows = new ArrayList<>();
        for (Table1A2 row : updatedRows) {
            savedRows.add(repository.save(row));
        }
        return savedRows;
    }

    public List<String> getDistinctPjs() {
        return repository.findDistinctPj();
    }

    public List<Table1A2> getRowsByPj(String pj) {
        return repository.findByPj(pj);
    }

    public void deleteRow(Long id) {
        repository.deleteById(id);
    }
}
