package edu.placemenet.backend.Controller;

import edu.placemenet.backend.Entity.Table1;
import edu.placemenet.backend.Service.Table1Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/table1")
@CrossOrigin(origins = "*")
public class Table1Controller {

    @Autowired
    private Table1Service service;

    // Get all rows from the table
    @GetMapping
    public List<Table1> getAllRows() {
        return service.getAllRows();
    }

    // Get rows by user_id
    @GetMapping("/user/{userId}")
    public List<Table1> getRowsByUserId(@PathVariable int userId) {
        return service.getRowsByUserId(userId);
    }

    // Get a row by ID
    @GetMapping("/{id}")
    public Optional<Table1> getRowById(@PathVariable Long id) {
        return service.getRowById(id);
    }

    // Create a new row
    @PostMapping
    public Table1 saveRow(@RequestBody Table1 row) {
        return service.saveRow(row);
    }

    // Update an existing row (PATCH)
    @PatchMapping("/{id}")
    public Table1 updateRow(@PathVariable Long id, @RequestBody Table1 updatedRow) {
        return service.updateRow(id, updatedRow);
    }

    // Delete a row by ID
    @DeleteMapping("/{id}")
    public void deleteRow(@PathVariable Long id) {
        service.deleteRow(id);
    }

    @PatchMapping("/user/{userId}")
    public void updateRowsByUserId(@PathVariable Integer userId, @RequestBody List<Table1> rows) {
        for (Table1 row : rows) {
            row.setUserId(userId); // Ensure userId is correctly set for each row
            service.updateRow(row.getId(), row); // Update the row based on its ID
        }
    }

}
