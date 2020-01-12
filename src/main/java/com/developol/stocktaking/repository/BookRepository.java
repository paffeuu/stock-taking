package com.developol.stocktaking.repository;

import com.developol.stocktaking.entity.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Long> {}
