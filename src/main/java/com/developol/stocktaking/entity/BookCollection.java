package com.developol.stocktaking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

@Entity
public class BookCollection {
    @Id
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;

    private BookCollectionType type;
    private int size;
    private String name;

    @JsonIgnore
    @OneToMany
    private Set<Book> books;

    @OneToOne
    private Employee responsibleEmployee;

    public enum BookCollectionType {
        GENERAL, SPECIALISTIC
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BookCollectionType getType() {
        return type;
    }

    public void setType(BookCollectionType type) {
        this.type = type;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }

    public Employee getResponsibleEmployee() {
        return responsibleEmployee;
    }

    public void setResponsibleEmployee(Employee responsibleEmployee) {
        this.responsibleEmployee = responsibleEmployee;
    }
}
