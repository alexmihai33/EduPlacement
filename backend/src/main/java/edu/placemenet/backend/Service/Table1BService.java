package edu.placemenet.backend.Service;

import edu.placemenet.backend.Entity.Table1B;
import edu.placemenet.backend.Repository.Table1BRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class Table1BService {

    @Autowired
    private Table1BRepository repository;

    public List<Table1B> getAllRowsSortedById() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public Optional<Table1B> getRowById(Long id) {
        return repository.findById(id);
    }

    public Table1B saveRow(Table1B row) {
        return repository.save(row);
    }

    public List<Table1B> updateAllRows(List<Table1B> updatedRows) {
        List<Table1B> savedRows = new ArrayList<>();
        for (Table1B row : updatedRows) {
            savedRows.add(repository.save(row));
        }
        return savedRows;
    }

    public List<String> getDistinctPjs() {
        return repository.findDistinctPj();
    }

    public List<Table1B> getRowsByPj(String pj) {
        return repository.findByPj(pj);
    }

    public void deleteRow(Long id) {
        repository.deleteById(id);
    }
}
