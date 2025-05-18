package edu.placemenet.backend.Controller;

import edu.placemenet.backend.Entity.Table1A1;
import edu.placemenet.backend.Service.Table1A1Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/api/table1a1")
@CrossOrigin(origins = "*")
public class Table1A1Controller {

    @Autowired
    private Table1A1Service service;

    @GetMapping
    public List<Table1A1> getAllRows() {
        return service.getAllRowsSortedById(); // updated method name
    }

    @GetMapping("/{id}")
    public Optional<Table1A1> getRowById(@PathVariable Long id) {
        return service.getRowById(id);
    }

    @PostMapping
    public Table1A1 saveRow(@RequestBody Table1A1 row) {
        return service.saveRow(row);
    }

    @PatchMapping
    public List<Table1A1> updateAllRows(@RequestBody List<Table1A1> updatedRows) {
        return service.updateAllRows(updatedRows);
    }

    @GetMapping("/distinct-pjs")
    public List<String> getDistinctPjs() {
        return service.getDistinctPjs();
    }

    @GetMapping("/by-pj")
    public List<Table1A1> getRowsByPj(@RequestParam String pj) {
        return service.getRowsByPj(pj);
    }


    @DeleteMapping("/{id}")
    public void deleteRow(@PathVariable Long id) {
        service.deleteRow(id);
    }
}
