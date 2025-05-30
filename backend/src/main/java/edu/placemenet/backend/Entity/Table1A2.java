package edu.placemenet.backend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "table_1a2")
public class Table1A2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pj;
    private String unitate;
    private String osbervatii;
    private String nivelInvatamantMaxim;
    private String filiera;
    private String speciliazre;
    private String arieCuriculara;
    private String norma;

    private String formatiuneStudiiAnteprescolar;
    private Integer nrCopiiExistentAnteprescolar;
    private Integer nrGrupeExistentAnteprescolar;
    private Integer nrCopiiPropusAnteprescolar;

    private String formatiuneStudiiPrescolar;
    private Integer nrCopiiExistentPrescolar;
    private Integer nrGrupeExistentPrescolar;
    private Integer nrCopiiPropusPrescolar;
    private Integer nrGrupePropusPrescolar;

    private String formatiuneStudiiPrimar;
    private Integer nrEleviExistentPrimar;
    private Integer nrClaseExistentPrimar;
    private Integer nrEleviPropusPrimar;
    private Integer nrClasePropusPrimar;

    private String formatiuneStudiiGimnazial;
    private Integer nrEleviExistentGimnazial;
    private Integer nrClaseExistentGimnazial;
    private Integer nrEleviPropusGimnazial;
    private Integer nrClasePropusGimnazial;

    private String formatiuneStudiiProfesional;
    private Integer nrEleviExistentProfesional;
    private Integer nrClaseExistentProfesional;
    private Integer nrEleviPropusProfesional;
    private Integer nrClasePropusProfesional;

    private String formatiuneStudiiLiceal;
    private Integer nrEleviExistentLiceal;
    private Integer nrClaseExistentLiceal;
    private Integer nrEleviPropusLiceal;
    private Integer nrClasePropusLiceal;

    private String formatiuneStudiiPostliceal;
    private Integer nrEleviExistentPostliceal;
    private Integer nrClaseExistentPostliceal;
    private Integer nrEleviPropusPostliceal;
    private Integer nrClasePropusPostliceal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPj() {
        return pj;
    }

    public void setPj(String pj) {
        this.pj = pj;
    }

    public String getUnitate() {
        return unitate;
    }

    public void setUnitate(String unitate) {
        this.unitate = unitate;
    }

    public String getOsbervatii() {
        return osbervatii;
    }

    public void setOsbervatii(String osbervatii) {
        this.osbervatii = osbervatii;
    }

    public String getNivelInvatamantMaxim() {
        return nivelInvatamantMaxim;
    }

    public void setNivelInvatamantMaxim(String nivelInvatamantMaxim) {
        this.nivelInvatamantMaxim = nivelInvatamantMaxim;
    }

    public String getFiliera() {
        return filiera;
    }

    public void setFiliera(String filiera) {
        this.filiera = filiera;
    }

    public String getSpeciliazre() {
        return speciliazre;
    }

    public void setSpeciliazre(String speciliazre) {
        this.speciliazre = speciliazre;
    }

    public String getArieCuriculara() {
        return arieCuriculara;
    }

    public void setArieCuriculara(String arieCuriculara) {
        this.arieCuriculara = arieCuriculara;
    }

    public String getNorma() {
        return norma;
    }

    public void setNorma(String norma) {
        this.norma = norma;
    }

    public String getFormatiuneStudiiAnteprescolar() {
        return formatiuneStudiiAnteprescolar;
    }

    public void setFormatiuneStudiiAnteprescolar(String formatiuneStudiiAnteprescolar) {
        this.formatiuneStudiiAnteprescolar = formatiuneStudiiAnteprescolar;
    }

    public Integer getNrCopiiExistentAnteprescolar() {
        return nrCopiiExistentAnteprescolar;
    }

    public void setNrCopiiExistentAnteprescolar(Integer nrCopiiExistentAnteprescolar) {
        this.nrCopiiExistentAnteprescolar = nrCopiiExistentAnteprescolar;
    }

    public Integer getNrGrupeExistentAnteprescolar() {
        return nrGrupeExistentAnteprescolar;
    }

    public void setNrGrupeExistentAnteprescolar(Integer nrGrupeExistentAnteprescolar) {
        this.nrGrupeExistentAnteprescolar = nrGrupeExistentAnteprescolar;
    }

    public Integer getNrCopiiPropusAnteprescolar() {
        return nrCopiiPropusAnteprescolar;
    }

    public void setNrCopiiPropusAnteprescolar(Integer nrCopiiPropusAnteprescolar) {
        this.nrCopiiPropusAnteprescolar = nrCopiiPropusAnteprescolar;
    }

    public String getFormatiuneStudiiPrescolar() {
        return formatiuneStudiiPrescolar;
    }

    public void setFormatiuneStudiiPrescolar(String formatiuneStudiiPrescolar) {
        this.formatiuneStudiiPrescolar = formatiuneStudiiPrescolar;
    }

    public Integer getNrCopiiExistentPrescolar() {
        return nrCopiiExistentPrescolar;
    }

    public void setNrCopiiExistentPrescolar(Integer nrCopiiExistentPrescolar) {
        this.nrCopiiExistentPrescolar = nrCopiiExistentPrescolar;
    }

    public Integer getNrGrupeExistentPrescolar() {
        return nrGrupeExistentPrescolar;
    }

    public void setNrGrupeExistentPrescolar(Integer nrGrupeExistentPrescolar) {
        this.nrGrupeExistentPrescolar = nrGrupeExistentPrescolar;
    }

    public Integer getNrCopiiPropusPrescolar() {
        return nrCopiiPropusPrescolar;
    }

    public void setNrCopiiPropusPrescolar(Integer nrCopiiPropusPrescolar) {
        this.nrCopiiPropusPrescolar = nrCopiiPropusPrescolar;
    }

    public Integer getNrGrupePropusPrescolar() {
        return nrGrupePropusPrescolar;
    }

    public void setNrGrupePropusPrescolar(Integer nrGrupePropusPrescolar) {
        this.nrGrupePropusPrescolar = nrGrupePropusPrescolar;
    }

    public String getFormatiuneStudiiPrimar() {
        return formatiuneStudiiPrimar;
    }

    public void setFormatiuneStudiiPrimar(String formatiuneStudiiPrimar) {
        this.formatiuneStudiiPrimar = formatiuneStudiiPrimar;
    }

    public Integer getNrEleviExistentPrimar() {
        return nrEleviExistentPrimar;
    }

    public void setNrEleviExistentPrimar(Integer nrEleviExistentPrimar) {
        this.nrEleviExistentPrimar = nrEleviExistentPrimar;
    }

    public Integer getNrClaseExistentPrimar() {
        return nrClaseExistentPrimar;
    }

    public void setNrClaseExistentPrimar(Integer nrClaseExistentPrimar) {
        this.nrClaseExistentPrimar = nrClaseExistentPrimar;
    }

    public Integer getNrEleviPropusPrimar() {
        return nrEleviPropusPrimar;
    }

    public void setNrEleviPropusPrimar(Integer nrEleviPropusPrimar) {
        this.nrEleviPropusPrimar = nrEleviPropusPrimar;
    }

    public Integer getNrClasePropusPrimar() {
        return nrClasePropusPrimar;
    }

    public void setNrClasePropusPrimar(Integer nrClasePropusPrimar) {
        this.nrClasePropusPrimar = nrClasePropusPrimar;
    }

    public String getFormatiuneStudiiGimnazial() {
        return formatiuneStudiiGimnazial;
    }

    public void setFormatiuneStudiiGimnazial(String formatiuneStudiiGimnazial) {
        this.formatiuneStudiiGimnazial = formatiuneStudiiGimnazial;
    }

    public Integer getNrEleviExistentGimnazial() {
        return nrEleviExistentGimnazial;
    }

    public void setNrEleviExistentGimnazial(Integer nrEleviExistentGimnazial) {
        this.nrEleviExistentGimnazial = nrEleviExistentGimnazial;
    }

    public Integer getNrClaseExistentGimnazial() {
        return nrClaseExistentGimnazial;
    }

    public void setNrClaseExistentGimnazial(Integer nrClaseExistentGimnazial) {
        this.nrClaseExistentGimnazial = nrClaseExistentGimnazial;
    }

    public Integer getNrEleviPropusGimnazial() {
        return nrEleviPropusGimnazial;
    }

    public void setNrEleviPropusGimnazial(Integer nrEleviPropusGimnazial) {
        this.nrEleviPropusGimnazial = nrEleviPropusGimnazial;
    }

    public Integer getNrClasePropusGimnazial() {
        return nrClasePropusGimnazial;
    }

    public void setNrClasePropusGimnazial(Integer nrClasePropusGimnazial) {
        this.nrClasePropusGimnazial = nrClasePropusGimnazial;
    }

    public String getFormatiuneStudiiProfesional() {
        return formatiuneStudiiProfesional;
    }

    public void setFormatiuneStudiiProfesional(String formatiuneStudiiProfesional) {
        this.formatiuneStudiiProfesional = formatiuneStudiiProfesional;
    }

    public Integer getNrEleviExistentProfesional() {
        return nrEleviExistentProfesional;
    }

    public void setNrEleviExistentProfesional(Integer nrEleviExistentProfesional) {
        this.nrEleviExistentProfesional = nrEleviExistentProfesional;
    }

    public Integer getNrClaseExistentProfesional() {
        return nrClaseExistentProfesional;
    }

    public void setNrClaseExistentProfesional(Integer nrClaseExistentProfesional) {
        this.nrClaseExistentProfesional = nrClaseExistentProfesional;
    }

    public Integer getNrEleviPropusProfesional() {
        return nrEleviPropusProfesional;
    }

    public void setNrEleviPropusProfesional(Integer nrEleviPropusProfesional) {
        this.nrEleviPropusProfesional = nrEleviPropusProfesional;
    }

    public Integer getNrClasePropusProfesional() {
        return nrClasePropusProfesional;
    }

    public void setNrClasePropusProfesional(Integer nrClasePropusProfesional) {
        this.nrClasePropusProfesional = nrClasePropusProfesional;
    }

    public String getFormatiuneStudiiLiceal() {
        return formatiuneStudiiLiceal;
    }

    public void setFormatiuneStudiiLiceal(String formatiuneStudiiLiceal) {
        this.formatiuneStudiiLiceal = formatiuneStudiiLiceal;
    }

    public Integer getNrEleviExistentLiceal() {
        return nrEleviExistentLiceal;
    }

    public void setNrEleviExistentLiceal(Integer nrEleviExistentLiceal) {
        this.nrEleviExistentLiceal = nrEleviExistentLiceal;
    }

    public Integer getNrClaseExistentLiceal() {
        return nrClaseExistentLiceal;
    }

    public void setNrClaseExistentLiceal(Integer nrClaseExistentLiceal) {
        this.nrClaseExistentLiceal = nrClaseExistentLiceal;
    }

    public Integer getNrEleviPropusLiceal() {
        return nrEleviPropusLiceal;
    }

    public void setNrEleviPropusLiceal(Integer nrEleviPropusLiceal) {
        this.nrEleviPropusLiceal = nrEleviPropusLiceal;
    }

    public Integer getNrClasePropusLiceal() {
        return nrClasePropusLiceal;
    }

    public void setNrClasePropusLiceal(Integer nrClasePropusLiceal) {
        this.nrClasePropusLiceal = nrClasePropusLiceal;
    }

    public String getFormatiuneStudiiPostliceal() {
        return formatiuneStudiiPostliceal;
    }

    public void setFormatiuneStudiiPostliceal(String formatiuneStudiiPostliceal) {
        this.formatiuneStudiiPostliceal = formatiuneStudiiPostliceal;
    }

    public Integer getNrEleviExistentPostliceal() {
        return nrEleviExistentPostliceal;
    }

    public void setNrEleviExistentPostliceal(Integer nrEleviExistentPostliceal) {
        this.nrEleviExistentPostliceal = nrEleviExistentPostliceal;
    }

    public Integer getNrClaseExistentPostliceal() {
        return nrClaseExistentPostliceal;
    }

    public void setNrClaseExistentPostliceal(Integer nrClaseExistentPostliceal) {
        this.nrClaseExistentPostliceal = nrClaseExistentPostliceal;
    }

    public Integer getNrEleviPropusPostliceal() {
        return nrEleviPropusPostliceal;
    }

    public void setNrEleviPropusPostliceal(Integer nrEleviPropusPostliceal) {
        this.nrEleviPropusPostliceal = nrEleviPropusPostliceal;
    }

    public Integer getNrClasePropusPostliceal() {
        return nrClasePropusPostliceal;
    }

    public void setNrClasePropusPostliceal(Integer nrClasePropusPostliceal) {
        this.nrClasePropusPostliceal = nrClasePropusPostliceal;
    }
}
