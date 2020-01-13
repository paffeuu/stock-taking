package com.developol.stocktaking.controller;

import com.developol.stocktaking.entity.BookCollection;
import com.developol.stocktaking.repository.BookCollectionRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/bookCollection")
public class BookCollectionController {

    private BookCollectionRepository repository;

    public BookCollectionController(
            BookCollectionRepository repository
    ) {
        this.repository = repository;
    }

    @GetMapping(path = "/get")
    public List<BookCollection> getAllBookCollections() {
        List<BookCollection> list = new ArrayList<>();
        repository.findAll().forEach(list::add);
        return list;
    }
}
