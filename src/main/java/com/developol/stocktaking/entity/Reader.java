package com.developol.stocktaking.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Reader {
    @Id
    private Long libraryIdNumber;

    private String firstName;
    private String lastName;
}
