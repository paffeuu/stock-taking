package com.developol.stocktaking.entity;

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

    @OneToMany
    private Set<Book> books;

    @OneToOne
    private Employee responsibleEmployee;

    public enum BookCollectionType {
        GENERAL, SPECIALISTIC
    }
}
