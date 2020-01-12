package com.developol.stocktaking.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Reader {
    @Id
    private Long libraryIdNumber;

    private String firstName;
    private String lastName;

    public Long getLibraryIdNumber() {
        return libraryIdNumber;
    }

    public void setLibraryIdNumber(Long libraryIdNumber) {
        this.libraryIdNumber = libraryIdNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
