package com.developol.stocktaking.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class LibraryResources {
    @Id
    @GeneratedValue(generator="increment")
    @GenericGenerator(name="increment", strategy = "increment")
    private Long id;

    private int size;
    private int bookCollectionsNumber;

    @OneToMany
    private Set<BookCollection> bookCollections;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getBookCollectionsNumber() {
        return bookCollectionsNumber;
    }

    public void setBookCollectionsNumber(int bookCollectionsNumber) {
        this.bookCollectionsNumber = bookCollectionsNumber;
    }

    public Set<BookCollection> getBookCollections() {
        return bookCollections;
    }

    public void setBookCollections(Set<BookCollection> bookCollections) {
        this.bookCollections = bookCollections;
    }
}
