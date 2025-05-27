package edu.placemenet.backend.Controller;

import edu.placemenet.backend.Entity.Table1B;
import edu.placemenet.backend.Service.Table1BService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/api/table1b")
@CrossOrigin(origins = "*")
public class Table1BController {

    @Autowired
    private Table1BService service;

    @GetMapping
    public List<Table1B> getAllRows() {
        return service.getAllRowsSortedById();
    }

    @GetMapping("/{id}")
    public Optional<Table1B> getRowById(@PathVariable Long id) {
        return service.getRowById(id);
    }

    @PostMapping
    public Table1B saveRow(@RequestBody Table1B row) {
        return service.saveRow(row);
    }

    @PatchMapping
    public List<Table1B> updateAllRows(@RequestBody List<Table1B> updatedRows) {
        return service.updateAllRows(updatedRows);
    }

    @GetMapping("/distinct-pjs")
    public List<String> getDistinctPjs() {
        return service.getDistinctPjs();
    }

    @GetMapping("/by-pj")
    public List<Table1B> getRowsByPj(@RequestParam String pj) {
        return service.getRowsByPj(pj);
    }

    @DeleteMapping("/{id}")
    public void deleteRow(@PathVariable Long id) {
        service.deleteRow(id);
    }
}
