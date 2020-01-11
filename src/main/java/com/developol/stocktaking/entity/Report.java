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
}
