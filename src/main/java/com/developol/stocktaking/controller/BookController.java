package com.developol.stocktaking.controller;

import com.developol.stocktaking.entity.Book;
import com.developol.stocktaking.entity.BookCollection;
import com.developol.stocktaking.repository.BookCollectionRepository;
import com.developol.stocktaking.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/book")
public class BookController {

    private BookRepository bookRepository;
    private BookCollectionRepository bookCollectionRepository;

    @Autowired
    public BookController(
            BookRepository bookRepository,
            BookCollectionRepository bookCollectionRepository
    ) {
        this.bookRepository = bookRepository;
        this.bookCollectionRepository = bookCollectionRepository;
    }

    @GetMapping("/get")
    public List<Book> getAllBooks() {
        List<Book> list = new ArrayList<>();
        bookRepository.findAll().forEach(list::add);
        return list;
    }

    @Transactional
    @GetMapping("/get/{id}")
    public List<Book> getBooksByBookCollection(@PathVariable Long id) {
        Optional<BookCollection> bookCollectionOptional = bookCollectionRepository.findById(id);
        BookCollection bookCollection;
        if (bookCollectionOptional.isPresent()) {
            bookCollection = bookCollectionOptional.get();
            List<Book> bookList = new ArrayList<>(bookCollection.getBooks());
            bookList.sort(Comparator.comparingLong(Book::getId));
            return bookList;
        }
        return new ArrayList<>();
    }

    @GetMapping("/get/checkedOut")
    public List<Book> getCheckedOutBooks() {
        List<Book> list = new ArrayList<>();
        bookRepository.findAllByCheckedOut(true).forEach(list::add);
        return list;
    }

    @Transactional
    @GetMapping("/get/{id}/checkedOut")
    public List<Book> getCheckedOutBooksByBookCollection(@PathVariable Long id) {
        Optional<BookCollection> bookCollectionOptional = bookCollectionRepository.findById(id);
        BookCollection bookCollection;
        if (bookCollectionOptional.isPresent()) {
            bookCollection = bookCollectionOptional.get();
            List<Book> bookList = new ArrayList<>(bookCollection.getBooks());
            bookList.sort(Comparator.comparingLong(Book::getId));
            bookList.removeIf(book -> !book.isCheckedOut());
            return bookList;
        }
        return new ArrayList<>();
    }
}
