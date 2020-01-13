package com.developol.stocktaking.repository;

import com.developol.stocktaking.entity.Book;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Long> {
    public Iterable<Book> findAllByCheckedOut(boolean checkedOut);
}
