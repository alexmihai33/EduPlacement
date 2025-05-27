package edu.placemenet.backend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "table_1b")
public class Table1B {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String pj;
    private String mediu;
    private String osbervatii;
    private String cnp;
    private String nume;
    private String bazaUnitate;
    private String statutCadruInUnitate;
    private String tipCadruDidactic;
    private String modIncadrare;
    private String norma;
    private Integer echivalentNorma;
    private Integer nrCrtCatedra;
    private String unitateaStructura;
    private String nivelInvatamant;
    private String catedra;
    private String disciplineDeInvatamant;
    private String claseleGrupele;
    private String literaClasa;
    private String disciplina;
    private Integer totalOreSaptamana;
    private Integer optionalOreSaptamana;
    private String alteActivitati;
    private String statutulPostului;
    private Integer oreIntregite;
    private String avizeAtestate;
    private String modOcupare;
    private String studiiSuperioare;
    private String documentNumire;
    private String functieDidactica;
    private String perioadaOcupare;
    private String perioadaRezervare;
    private String motivRezervare;
    private String viabilitatePost;
    private String nivelPostDebutant;
    private String modalitateOcupare;
    private String nivelPostDupaOcupare;

    public String getNivelPostDupaOcupare() {
        return nivelPostDupaOcupare;
    }

    public void setNivelPostDupaOcupare(String nivelPostDupaOcupare) {
        this.nivelPostDupaOcupare = nivelPostDupaOcupare;
    }

    public String getModalitateOcupare() {
        return modalitateOcupare;
    }

    public void setModalitateOcupare(String modalitateOcupare) {
        this.modalitateOcupare = modalitateOcupare;
    }

    public String getNivelPostDebutant() {
        return nivelPostDebutant;
    }

    public void setNivelPostDebutant(String nivelPostDebutant) {
        this.nivelPostDebutant = nivelPostDebutant;
    }

    public String getViabilitatePost() {
        return viabilitatePost;
    }

    public void setViabilitatePost(String viabilitatePost) {
        this.viabilitatePost = viabilitatePost;
    }

    public String getMotivRezervare() {
        return motivRezervare;
    }

    public void setMotivRezervare(String motivRezervare) {
        this.motivRezervare = motivRezervare;
    }

    public String getPerioadaRezervare() {
        return perioadaRezervare;
    }

    public void setPerioadaRezervare(String perioadaRezervare) {
        this.perioadaRezervare = perioadaRezervare;
    }

    public String getPerioadaOcupare() {
        return perioadaOcupare;
    }

    public void setPerioadaOcupare(String perioadaOcupare) {
        this.perioadaOcupare = perioadaOcupare;
    }

    public String getFunctieDidactica() {
        return functieDidactica;
    }

    public void setFunctieDidactica(String functieDidactica) {
        this.functieDidactica = functieDidactica;
    }

    public String getDocumentNumire() {
        return documentNumire;
    }

    public void setDocumentNumire(String documentNumire) {
        this.documentNumire = documentNumire;
    }

    public String getStudiiSuperioare() {
        return studiiSuperioare;
    }

    public void setStudiiSuperioare(String studiiSuperioare) {
        this.studiiSuperioare = studiiSuperioare;
    }

    public String getModOcupare() {
        return modOcupare;
    }

    public void setModOcupare(String modOcupare) {
        this.modOcupare = modOcupare;
    }

    public String getAvizeAtestate() {
        return avizeAtestate;
    }

    public void setAvizeAtestate(String avizeAtestate) {
        this.avizeAtestate = avizeAtestate;
    }

    public Integer getOreIntregite() {
        return oreIntregite;
    }

    public void setOreIntregite(Integer oreIntregite) {
        this.oreIntregite = oreIntregite;
    }

    public String getStatutulPostului() {
        return statutulPostului;
    }

    public void setStatutulPostului(String statutulPostului) {
        this.statutulPostului = statutulPostului;
    }

    public String getAlteActivitati() {
        return alteActivitati;
    }

    public void setAlteActivitati(String alteActivitati) {
        this.alteActivitati = alteActivitati;
    }

    public Integer getOptionalOreSaptamana() {
        return optionalOreSaptamana;
    }

    public void setOptionalOreSaptamana(Integer optionalOreSaptamana) {
        this.optionalOreSaptamana = optionalOreSaptamana;
    }

    public Integer getTotalOreSaptamana() {
        return totalOreSaptamana;
    }

    public void setTotalOreSaptamana(Integer totalOreSaptamana) {
        this.totalOreSaptamana = totalOreSaptamana;
    }

    public String getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(String disciplina) {
        this.disciplina = disciplina;
    }

    public String getLiteraClasa() {
        return literaClasa;
    }

    public void setLiteraClasa(String literaClasa) {
        this.literaClasa = literaClasa;
    }

    public String getClaseleGrupele() {
        return claseleGrupele;
    }

    public void setClaseleGrupele(String claseleGrupele) {
        this.claseleGrupele = claseleGrupele;
    }

    public String getDisciplineDeInvatamant() {
        return disciplineDeInvatamant;
    }

    public void setDisciplineDeInvatamant(String disciplineDeInvatamant) {
        this.disciplineDeInvatamant = disciplineDeInvatamant;
    }

    public String getCatedra() {
        return catedra;
    }

    public void setCatedra(String catedra) {
        this.catedra = catedra;
    }

    public String getNivelInvatamant() {
        return nivelInvatamant;
    }

    public void setNivelInvatamant(String nivelInvatamant) {
        this.nivelInvatamant = nivelInvatamant;
    }

    public String getUnitateaStructura() {
        return unitateaStructura;
    }

    public void setUnitateaStructura(String unitateaStructura) {
        this.unitateaStructura = unitateaStructura;
    }

    public Integer getNrCrtCatedra() {
        return nrCrtCatedra;
    }

    public void setNrCrtCatedra(Integer nrCrtCatedra) {
        this.nrCrtCatedra = nrCrtCatedra;
    }

    public Integer getEchivalentNorma() {
        return echivalentNorma;
    }

    public void setEchivalentNorma(Integer echivalentNorma) {
        this.echivalentNorma = echivalentNorma;
    }

    public String getNorma() {
        return norma;
    }

    public void setNorma(String norma) {
        this.norma = norma;
    }

    public String getModIncadrare() {
        return modIncadrare;
    }

    public void setModIncadrare(String modIncadrare) {
        this.modIncadrare = modIncadrare;
    }

    public String getTipCadruDidactic() {
        return tipCadruDidactic;
    }

    public void setTipCadruDidactic(String tipCadruDidactic) {
        this.tipCadruDidactic = tipCadruDidactic;
    }

    public String getStatutCadruInUnitate() {
        return statutCadruInUnitate;
    }

    public void setStatutCadruInUnitate(String statutCadruInUnitate) {
        this.statutCadruInUnitate = statutCadruInUnitate;
    }

    public String getBazaUnitate() {
        return bazaUnitate;
    }

    public void setBazaUnitate(String bazaUnitate) {
        this.bazaUnitate = bazaUnitate;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getCnp() {
        return cnp;
    }

    public void setCnp(String cnp) {
        this.cnp = cnp;
    }

    public String getOsbervatii() {
        return osbervatii;
    }

    public void setOsbervatii(String osbervatii) {
        this.osbervatii = osbervatii;
    }

    public String getMediu() {
        return mediu;
    }

    public void setMediu(String mediu) {
        this.mediu = mediu;
    }

    public String getPj() {
        return pj;
    }

    public void setPj(String pj) {
        this.pj = pj;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
