package edu.placemenet.backend.Service;

import edu.placemenet.backend.Entity.Table1A1;
import edu.placemenet.backend.Entity.Table1A2;
import edu.placemenet.backend.Entity.Table1B;
import edu.placemenet.backend.Repository.Table1A1Repository;
import edu.placemenet.backend.Repository.Table1A2Repository;
import edu.placemenet.backend.Repository.Table1BRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelExportService {

    @Autowired
    private Table1A1Repository table1A1Repository;
    @Autowired
    private Table1A2Repository table1A2Repository;
    @Autowired
    private Table1BRepository table1BRepository;

    private void createCellOrEmpty(Row row, int col, Object value) {
        row.createCell(col).setCellValue(value != null ? value.toString() : "");
    }

    public ByteArrayInputStream exportTable1A1ToExcel(String pj) throws IOException {
        List<Table1A1> list = table1A1Repository.findByPj(pj);

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Table1A1");

            Row header = sheet.createRow(0);
            String[] headers = {
                    "ID", "PJ", "Unitate", "Filiera", "Specializare",
                    "Formatiune Studii Anteprescolar", "Nr Copii Existent Anteprescolar", "Nr Grupe Existent Anteprescolar", "Nr Copii Propus Anteprescolar",
                    "Formatiune Studii Prescolar", "Nr Copii Existent Prescolar", "Nr Grupe Existent Prescolar", "Nr Copii Propus Prescolar", "Nr Grupe Propus Prescolar",
                    "Formatiune Studii Primar", "Nr Elevi Existent Primar", "Nr Clase Existent Primar", "Nr Elevi Propus Primar", "Nr Clase Propus Primar",
                    "Formatiune Studii Gimnazial", "Nr Elevi Existent Gimnazial", "Nr Clase Existent Gimnazial", "Nr Elevi Propus Gimnazial", "Nr Clase Propus Gimnazial",
                    "Formatiune Studii Profesional", "Nr Elevi Existent Profesional", "Nr Clase Existent Profesional", "Nr Elevi Propus Profesional", "Nr Clase Propus Profesional",
                    "Formatiune Studii Liceal", "Nr Elevi Existent Liceal", "Nr Clase Existent Liceal", "Nr Elevi Propus Liceal", "Nr Clase Propus Liceal",
                    "Formatiune Studii Postliceal", "Nr Elevi Existent Postliceal", "Nr Clase Existent Postliceal", "Nr Elevi Propus Postliceal", "Nr Clase Propus Postliceal"
            };
            for (int i = 0; i < headers.length; i++) {
                header.createCell(i).setCellValue(headers[i]);
            }

            int rowIdx = 1;
            for (Table1A1 row : list) {
                Row r = sheet.createRow(rowIdx++);
                int col = 0;
                createCellOrEmpty(r, col++, row.getId());
                createCellOrEmpty(r, col++, row.getPj());
                createCellOrEmpty(r, col++, row.getUnitate());
                createCellOrEmpty(r, col++, row.getFiliera());
                createCellOrEmpty(r, col++, row.getSpecializare());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiAnteprescolar());
                createCellOrEmpty(r, col++, row.getNrCopiiExistentAnteprescolar());
                createCellOrEmpty(r, col++, row.getNrGrupeExistentAnteprescolar());
                createCellOrEmpty(r, col++, row.getNrCopiiPropusAnteprescolar());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiPrescolar());
                createCellOrEmpty(r, col++, row.getNrCopiiExistentPrescolar());
                createCellOrEmpty(r, col++, row.getNrGrupeExistentPrescolar());
                createCellOrEmpty(r, col++, row.getNrCopiiPropusPrescolar());
                createCellOrEmpty(r, col++, row.getNrGrupePropusPrescolar());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiPrimar());
                createCellOrEmpty(r, col++, row.getNrEleviExistentPrimar());
                createCellOrEmpty(r, col++, row.getNrClaseExistentPrimar());
                createCellOrEmpty(r, col++, row.getNrEleviPropusPrimar());
                createCellOrEmpty(r, col++, row.getNrClasePropusPrimar());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiGimnazial());
                createCellOrEmpty(r, col++, row.getNrEleviExistentGimnazial());
                createCellOrEmpty(r, col++, row.getNrClaseExistentGimnazial());
                createCellOrEmpty(r, col++, row.getNrEleviPropusGimnazial());
                createCellOrEmpty(r, col++, row.getNrClasePropusGimnazial());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiProfesional());
                createCellOrEmpty(r, col++, row.getNrEleviExistentProfesional());
                createCellOrEmpty(r, col++, row.getNrClaseExistentProfesional());
                createCellOrEmpty(r, col++, row.getNrEleviPropusProfesional());
                createCellOrEmpty(r, col++, row.getNrClasePropusProfesional());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiLiceal());
                createCellOrEmpty(r, col++, row.getNrEleviExistentLiceal());
                createCellOrEmpty(r, col++, row.getNrClaseExistentLiceal());
                createCellOrEmpty(r, col++, row.getNrEleviPropusLiceal());
                createCellOrEmpty(r, col++, row.getNrClasePropusLiceal());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiPostliceal());
                createCellOrEmpty(r, col++, row.getNrEleviExistentPostliceal());
                createCellOrEmpty(r, col++, row.getNrClaseExistentPostliceal());
                createCellOrEmpty(r, col++, row.getNrEleviPropusPostliceal());
                createCellOrEmpty(r, col++, row.getNrClasePropusPostliceal());
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

    public ByteArrayInputStream exportTable1A2ToExcel(String pj) throws IOException {
        List<Table1A2> list = table1A2Repository.findByPj(pj);
        return generateExcelFromTable1A2(list);
    }

    public ByteArrayInputStream exportTable1BToExcel(String pj) throws IOException {
        List<Table1B> list = table1BRepository.findByPj(pj);
        return generateExcelFromTable1B(list);
    }

    private ByteArrayInputStream generateExcelFromTable1A2(List<Table1A2> list) throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Table1A2");

            Row header = sheet.createRow(0);
            String[] headers = {
                    "ID", "PJ", "Unitate", "Observatii", "Nivel Invatamant Maxim", "Filiera", "Speciliazre",
                    "Arie Curiculara", "Norma",
                    "Formatiune Studii Anteprescolar", "Nr Copii Existent Anteprescolar", "Nr Grupe Existent Anteprescolar", "Nr Copii Propus Anteprescolar",
                    "Formatiune Studii Prescolar", "Nr Copii Existent Prescolar", "Nr Grupe Existent Prescolar", "Nr Copii Propus Prescolar", "Nr Grupe Propus Prescolar",
                    "Formatiune Studii Primar", "Nr Elevi Existent Primar", "Nr Clase Existent Primar", "Nr Elevi Propus Primar", "Nr Clase Propus Primar",
                    "Formatiune Studii Gimnazial", "Nr Elevi Existent Gimnazial", "Nr Clase Existent Gimnazial", "Nr Elevi Propus Gimnazial", "Nr Clase Propus Gimnazial",
                    "Formatiune Studii Profesional", "Nr Elevi Existent Profesional", "Nr Clase Existent Profesional", "Nr Elevi Propus Profesional", "Nr Clase Propus Profesional",
                    "Formatiune Studii Liceal", "Nr Elevi Existent Liceal", "Nr Clase Existent Liceal", "Nr Elevi Propus Liceal", "Nr Clase Propus Liceal",
                    "Formatiune Studii Postliceal", "Nr Elevi Existent Postliceal", "Nr Clase Existent Postliceal", "Nr Elevi Propus Postliceal", "Nr Clase Propus Postliceal"
            };
            for (int i = 0; i < headers.length; i++) {
                header.createCell(i).setCellValue(headers[i]);
            }

            int rowIdx = 1;
            for (Table1A2 row : list) {
                Row r = sheet.createRow(rowIdx++);
                int col = 0;
                createCellOrEmpty(r, col++, row.getId());
                createCellOrEmpty(r, col++, row.getPj());
                createCellOrEmpty(r, col++, row.getUnitate());
                createCellOrEmpty(r, col++, row.getOsbervatii());
                createCellOrEmpty(r, col++, row.getNivelInvatamantMaxim());
                createCellOrEmpty(r, col++, row.getFiliera());
                createCellOrEmpty(r, col++, row.getSpeciliazre());
                createCellOrEmpty(r, col++, row.getArieCuriculara());
                createCellOrEmpty(r, col++, row.getNorma());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiAnteprescolar());
                createCellOrEmpty(r, col++, row.getNrCopiiExistentAnteprescolar());
                createCellOrEmpty(r, col++, row.getNrGrupeExistentAnteprescolar());
                createCellOrEmpty(r, col++, row.getNrCopiiPropusAnteprescolar());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiPrescolar());
                createCellOrEmpty(r, col++, row.getNrCopiiExistentPrescolar());
                createCellOrEmpty(r, col++, row.getNrGrupeExistentPrescolar());
                createCellOrEmpty(r, col++, row.getNrCopiiPropusPrescolar());
                createCellOrEmpty(r, col++, row.getNrGrupePropusPrescolar());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiPrimar());
                createCellOrEmpty(r, col++, row.getNrEleviExistentPrimar());
                createCellOrEmpty(r, col++, row.getNrClaseExistentPrimar());
                createCellOrEmpty(r, col++, row.getNrEleviPropusPrimar());
                createCellOrEmpty(r, col++, row.getNrClasePropusPrimar());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiGimnazial());
                createCellOrEmpty(r, col++, row.getNrEleviExistentGimnazial());
                createCellOrEmpty(r, col++, row.getNrClaseExistentGimnazial());
                createCellOrEmpty(r, col++, row.getNrEleviPropusGimnazial());
                createCellOrEmpty(r, col++, row.getNrClasePropusGimnazial());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiProfesional());
                createCellOrEmpty(r, col++, row.getNrEleviExistentProfesional());
                createCellOrEmpty(r, col++, row.getNrClaseExistentProfesional());
                createCellOrEmpty(r, col++, row.getNrEleviPropusProfesional());
                createCellOrEmpty(r, col++, row.getNrClasePropusProfesional());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiLiceal());
                createCellOrEmpty(r, col++, row.getNrEleviExistentLiceal());
                createCellOrEmpty(r, col++, row.getNrClaseExistentLiceal());
                createCellOrEmpty(r, col++, row.getNrEleviPropusLiceal());
                createCellOrEmpty(r, col++, row.getNrClasePropusLiceal());

                createCellOrEmpty(r, col++, row.getFormatiuneStudiiPostliceal());
                createCellOrEmpty(r, col++, row.getNrEleviExistentPostliceal());
                createCellOrEmpty(r, col++, row.getNrClaseExistentPostliceal());
                createCellOrEmpty(r, col++, row.getNrEleviPropusPostliceal());
                createCellOrEmpty(r, col++, row.getNrClasePropusPostliceal());
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

    private ByteArrayInputStream generateExcelFromTable1B(List<Table1B> list) throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Table1B");

            Row header = sheet.createRow(0);
            String[] headers = {
                    "ID", "PJ", "Mediu", "Observatii", "CNP", "Nume", "Baza Unitate", "Statut Cadru In Unitate",
                    "Tip Cadru Didactic", "Mod Incadrare", "Norma", "Echivalent Norma", "Nr Crt Catedra", "Unitatea Structura",
                    "Nivel Invatamant", "Catedra", "Discipline De Invatamant", "Clasele Grupele", "Litera Clasa", "Disciplina",
                    "Total Ore Saptamana", "Optional Ore Saptamana", "Alte Activitati", "Statutul Postului", "Ore Intregite",
                    "Avize Atestate", "Mod Ocupare", "Studii Superioare", "Document Numire", "Functie Didactica",
                    "Perioada Ocupare", "Perioada Rezervare", "Motiv Rezervare", "Viabilitate Post", "Nivel Post Debutant",
                    "Modalitate Ocupare", "Nivel Post Dupa Ocupare"
            };
            for (int i = 0; i < headers.length; i++) {
                header.createCell(i).setCellValue(headers[i]);
            }

            int rowIdx = 1;
            for (Table1B row : list) {
                Row r = sheet.createRow(rowIdx++);
                int col = 0;
                createCellOrEmpty(r, col++, row.getId());
                createCellOrEmpty(r, col++, row.getPj());
                createCellOrEmpty(r, col++, row.getMediu());
                createCellOrEmpty(r, col++, row.getOsbervatii());
                createCellOrEmpty(r, col++, row.getCnp());
                createCellOrEmpty(r, col++, row.getNume());
                createCellOrEmpty(r, col++, row.getBazaUnitate());
                createCellOrEmpty(r, col++, row.getStatutCadruInUnitate());
                createCellOrEmpty(r, col++, row.getTipCadruDidactic());
                createCellOrEmpty(r, col++, row.getModIncadrare());
                createCellOrEmpty(r, col++, row.getNorma());
                createCellOrEmpty(r, col++, row.getEchivalentNorma());
                createCellOrEmpty(r, col++, row.getNrCrtCatedra());
                createCellOrEmpty(r, col++, row.getUnitateaStructura());
                createCellOrEmpty(r, col++, row.getNivelInvatamant());
                createCellOrEmpty(r, col++, row.getCatedra());
                createCellOrEmpty(r, col++, row.getDisciplineDeInvatamant());
                createCellOrEmpty(r, col++, row.getClaseleGrupele());
                createCellOrEmpty(r, col++, row.getLiteraClasa());
                createCellOrEmpty(r, col++, row.getDisciplina());
                createCellOrEmpty(r, col++, row.getTotalOreSaptamana());
                createCellOrEmpty(r, col++, row.getOptionalOreSaptamana());
                createCellOrEmpty(r, col++, row.getAlteActivitati());
                createCellOrEmpty(r, col++, row.getStatutulPostului());
                createCellOrEmpty(r, col++, row.getOreIntregite());
                createCellOrEmpty(r, col++, row.getAvizeAtestate());
                createCellOrEmpty(r, col++, row.getModOcupare());
                createCellOrEmpty(r, col++, row.getStudiiSuperioare());
                createCellOrEmpty(r, col++, row.getDocumentNumire());
                createCellOrEmpty(r, col++, row.getFunctieDidactica());
                createCellOrEmpty(r, col++, row.getPerioadaOcupare());
                createCellOrEmpty(r, col++, row.getPerioadaRezervare());
                createCellOrEmpty(r, col++, row.getMotivRezervare());
                createCellOrEmpty(r, col++, row.getViabilitatePost());
                createCellOrEmpty(r, col++, row.getNivelPostDebutant());
                createCellOrEmpty(r, col++, row.getModalitateOcupare());
                createCellOrEmpty(r, col++, row.getNivelPostDupaOcupare());
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}