package com.developol.stocktaking.repository;

import com.developol.stocktaking.entity.Book;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Long> {
    public Iterable<Book> findAllByCheckedOut(boolean checkedOut);

    @Query("SELECT DISTINCT book FROM Book book WHERE book.bookCollection.id = :bookCollectionId " +
            "AND book.author LIKE CONCAT('%', :author, '%')" +
            "AND book.title LIKE CONCAT('%', :title, '%')" +
            "AND book.publisher LIKE CONCAT('%', :publisher, '%')" +
            "AND book.publicationYear LIKE CONCAT('%', :publicationYear, '%')")
    public Iterable<Book> selectAllBooksByGivenParameters(
            String title, String author, String publisher, String publicationYear, Long bookCollectionId
    );
}
