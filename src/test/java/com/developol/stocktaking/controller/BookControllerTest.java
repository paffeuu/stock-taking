package com.developol.stocktaking.controller;

import com.developol.stocktaking.entity.Book;
import com.developol.stocktaking.entity.BookCollection;
import com.developol.stocktaking.repository.BookCollectionRepository;
import com.developol.stocktaking.repository.BookRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.*;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
public class BookControllerTest {
    @Mock
    BookRepository bookRepository;
    @Mock
    BookCollectionRepository bookCollectionRepository;

    @InjectMocks
    BookController bookController;

    private BookCollection generateBookCollection() {
        BookCollection bookCollection = new BookCollection();
        Set<Book> books = new HashSet<>();
        Book book1 = new Book();
        book1.setId(1324240L);
        book1.setCheckedOut(false);
        Book book2 = new Book();
        book2.setId(66123L);
        book2.setCheckedOut(true);
        Book book3 = new Book();
        book3.setId(54L);
        book3.setCheckedOut(true);
        books.add(book1);
        books.add(book2);
        books.add(book3);
        bookCollection.setBooks(books);
        return bookCollection;
    }

    @Test
    public void getBooksByBookCollection() {
        BookCollection bookCollection = generateBookCollection();

        Mockito.when(bookCollectionRepository.findById(0L)).thenReturn(Optional.of(bookCollection));

        assertEquals(3, bookController.getBooksByBookCollection(0L).size());
        assertEquals(54L, (long)bookController.getBooksByBookCollection(0L).get(0).getId());
        assertEquals(1324240L, (long)bookController.getBooksByBookCollection(0L).get(2).getId());
    }


    @Test
    public void getCheckedOutBooksByBookCollection() {
        BookCollection bookCollection = generateBookCollection();

        Mockito.when(bookCollectionRepository.findById(1L)).thenReturn(Optional.of(bookCollection));

        assertEquals(2, bookController.getCheckedOutBooksByBookCollection(1L).size());
        assertEquals(54L, (long)bookController.getCheckedOutBooksByBookCollection(1L).get(0).getId());
        assertEquals(66123L, (long)bookController.getCheckedOutBooksByBookCollection(1L).get(1).getId());
        assertEquals(
                0L,
                bookController.getCheckedOutBooksByBookCollection(1L)
                .stream()
                .filter(book -> !book.isCheckedOut())
                .count()
                );


    }

}