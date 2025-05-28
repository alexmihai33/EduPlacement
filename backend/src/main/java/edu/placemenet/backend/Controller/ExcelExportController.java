package edu.placemenet.backend.Controller;

import edu.placemenet.backend.Entity.Table1A1;
import edu.placemenet.backend.Repository.Table1A1Repository;
import edu.placemenet.backend.Service.ExcelExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/export")
public class ExcelExportController {

    @Autowired
    private ExcelExportService excelExportService;

    @GetMapping("/table1a1")
    public ResponseEntity<byte[]> exportTable1A1(@RequestParam String pj) throws IOException {
        ByteArrayInputStream in = excelExportService.exportTable1A1ToExcel(pj);
        return createExcelResponse(in, "table1a1.xlsx");
    }

    @GetMapping("/table1a2")
    public ResponseEntity<byte[]> exportTable1A2(@RequestParam String pj) throws IOException {
        ByteArrayInputStream in = excelExportService.exportTable1A2ToExcel(pj);
        return createExcelResponse(in, "table1a2.xlsx");
    }

    @GetMapping("/table1b")
    public ResponseEntity<byte[]> exportTable1B(@RequestParam String pj) throws IOException {
        ByteArrayInputStream in = excelExportService.exportTable1BToExcel(pj);
        return createExcelResponse(in, "table1b.xlsx");
    }

    private ResponseEntity<byte[]> createExcelResponse(ByteArrayInputStream in, String filename) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=" + filename);
        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(in.readAllBytes());
    }
}


