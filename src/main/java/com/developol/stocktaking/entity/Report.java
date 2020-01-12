package com.developol.stocktaking.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Report {
    @Id
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;

    private ReportType type;
    @Column(length=5000)
    private String htmlContent;

    private Date generationDate;

    public enum ReportType {
        BOOKS_IN_LIBRARY,
        BOOKS_IN_BOOKCOLLECTION,
        CHECKED_OUT_BOOKS_IN_SINGLE_BOOKCOLLECTION,
        CHECKED_OUT_BOOKS_IN_LIBRARY,
        BOOKCOLLECTIONS
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ReportType getType() {
        return type;
    }

    public void setType(ReportType type) {
        this.type = type;
    }

    public String getHtmlContent() {
        return htmlContent;
    }

    public void setHtmlContent(String htmlContent) {
        this.htmlContent = htmlContent;
    }

    public Date getGenerationDate() {
        return generationDate;
    }

    public void setGenerationDate(Date generationDate) {
        this.generationDate = generationDate;
    }
}
