package com.developol.stocktaking.repository;

import com.developol.stocktaking.entity.BookCollection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookCollectionRepository extends CrudRepository<BookCollection, Long> {}
