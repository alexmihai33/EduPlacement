package edu.placemenet.backend.Entity;


import jakarta.persistence.*;

@Entity
public class Table1 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Automatically generated SERIAL PRIMARY KEY

    private Integer userId;  // user_id as INTEGER

    @Column(nullable = false)
    private String column1;

    @Column(nullable = false)
    private String column2;

    @Column(nullable = false)
    private String column3;

    @Column(nullable = false)
    private String column4;

    @Column(nullable = false)
    private String column5;

    @Column(nullable = false)
    private String column6;

    @Column(nullable = false)
    private String column7;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getColumn1() {
        return column1;
    }

    public void setColumn1(String column1) {
        this.column1 = column1;
    }

    public String getColumn2() {
        return column2;
    }

    public void setColumn2(String column2) {
        this.column2 = column2;
    }

    public String getColumn3() {
        return column3;
    }

    public void setColumn3(String column3) {
        this.column3 = column3;
    }

    public String getColumn4() {
        return column4;
    }

    public void setColumn4(String column4) {
        this.column4 = column4;
    }

    public String getColumn5() {
        return column5;
    }

    public void setColumn5(String column5) {
        this.column5 = column5;
    }

    public String getColumn6() {
        return column6;
    }

    public void setColumn6(String column6) {
        this.column6 = column6;
    }

    public String getColumn7() {
        return column7;
    }

    public void setColumn7(String column7) {
        this.column7 = column7;
    }
}
