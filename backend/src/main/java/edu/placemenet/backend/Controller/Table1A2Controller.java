package edu.placemenet.backend.Controller;

import edu.placemenet.backend.Entity.Table1A2;
import edu.placemenet.backend.Service.Table1A2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/api/table1a2")
@CrossOrigin(origins = "*")
public class Table1A2Controller {

    @Autowired
    private Table1A2Service service;

    @GetMapping
    public List<Table1A2> getAllRows() {
        return service.getAllRowsSortedById();
    }

    @GetMapping("/{id}")
    public Optional<Table1A2> getRowById(@PathVariable Long id) {
        return service.getRowById(id);
    }

    @PostMapping
    public Table1A2 saveRow(@RequestBody Table1A2 row) {
        return service.saveRow(row);
    }

    @PatchMapping
    public List<Table1A2> updateAllRows(@RequestBody List<Table1A2> updatedRows) {
        return service.updateAllRows(updatedRows);
    }

    @GetMapping("/distinct-pjs")
    public List<String> getDistinctPjs() {
        return service.getDistinctPjs();
    }

    @GetMapping("/by-pj")
    public List<Table1A2> getRowsByPj(@RequestParam String pj) {
        return service.getRowsByPj(pj);
    }

    @DeleteMapping("/{id}")
    public void deleteRow(@PathVariable Long id) {
        service.deleteRow(id);
    }
}

