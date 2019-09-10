package com.BackendCapstone.DAO;

import com.BackendCapstone.DTO.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer>{

}
