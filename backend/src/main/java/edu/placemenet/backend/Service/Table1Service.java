package edu.placemenet.backend.Service;

import edu.placemenet.backend.Entity.Table1;
import edu.placemenet.backend.Repository.Table1Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class Table1Service {

    @Autowired
    private Table1Repository table1Repository;

    // Fetch all rows from the table
    public List<Table1> getAllRows() {
        return table1Repository.findAll();
    }

    // Fetch rows by user_id
    public List<Table1> getRowsByUserId(int userId) {
        return table1Repository.findByUserId(userId);
    }

    // Fetch a row by ID
    public Optional<Table1> getRowById(Long id) {
        return table1Repository.findById(id);
    }

    // Save a new row
    public Table1 saveRow(Table1 row) {
        return table1Repository.save(row);
    }

    // Update an existing row
    public Table1 updateRow(Long id, Table1 updatedRow) {
        if (table1Repository.existsById(id)) {
            updatedRow.setId(id);
            return table1Repository.save(updatedRow);
        }
        return null;
    }

    // Delete a row by ID
    public void deleteRow(Long id) {
        table1Repository.deleteById(id);
    }

    public List<Table1> updateRowsByUserId(Integer userId, Table1 updatedRow) {
        // Find all rows that have the given userId
        List<Table1> rows = table1Repository.findByUserId(userId);

        // If no rows are found, return empty list or handle accordingly
        if (rows.isEmpty()) {
            throw new RuntimeException("No rows found for user_id: " + userId);
        }

        // Update all matching rows with the values from updatedRow
        for (Table1 row : rows) {
            row.setColumn1(updatedRow.getColumn1());
            row.setColumn2(updatedRow.getColumn2());
            row.setColumn3(updatedRow.getColumn3());
            row.setColumn4(updatedRow.getColumn4());
            row.setColumn5(updatedRow.getColumn5());
            row.setColumn6(updatedRow.getColumn6());
            row.setColumn7(updatedRow.getColumn7());
        }

        // Save the updated rows
        return table1Repository.saveAll(rows);  // This will save all the updated rows
    }

}
