package com.BackendCapstone.dao;

import com.BackendCapstone.DAO.ItemRepository;
import com.BackendCapstone.DTO.Item;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DAOTests {
    @Autowired
    ItemRepository itemRepo;


    Item x1;
    Item x2;

    //setting up the tests
    @Before
    public void setUp() {

        itemRepo.deleteAll();

        x1 = new Item();
        x1.setId(0);
        x1.setName("Bananas");
        x1.setCategory("Food");
        x1.setQuantity(200);
        x1.setIsImported(false);
        x1.setPrice(2.00);
        x1.setImage("https://media.istockphoto.com/photos/banana-picture-id636739634?k=6&m=636739634&s=612x612&w=0&h=BQ9Z6DobjFzclh3LN7nKSljrRqycJPCq65CS8rtUHU4=");

        x2 = new Item();
        x2.setId(1);
        x2.setName("Tomato");
        x2.setCategory("Food");
        x2.setQuantity(200);
        x2.setIsImported(false);
        x2.setPrice(1.00);
        x2.setImage("https://boygeniusreport.files.wordpress.com/2019/05/capture-2.png?w=782");
    }

    //getting all items
    @Test
    @Transactional
    public void shouldGetItems() {
        itemRepo.save(x1);

        List<Item> itemList = new ArrayList<>();
        itemList.add(x1);


        List<Item> fromRepo = itemRepo.findAll();

        assertEquals(itemList, fromRepo);

    }
    //getting an item by id
    @Test
    @Transactional
    public void shouldGetItemsById() {
        Item addedItem = itemRepo.save(x1);
        int id = addedItem.getId();

        Item fromRepo = itemRepo.getOne(id);

        assertEquals(addedItem, fromRepo);
    }
    //adding item
    @Test
    @Transactional
    public void shouldAddItem() {
        itemRepo.save(x1);
        itemRepo.save(x2);

        assertNotNull(x1.getId());
        assertNotNull(x2.getId());

    }
    //update item
    @Test
    @Transactional
    public void shouldUpdateItem() {
        Item addedItem = itemRepo.save(x1);
        addedItem.setName("Oranges");

        itemRepo.save(addedItem);

        List<Item> fromRepo = itemRepo.findAll();

        assertEquals(fromRepo.size(), 1);
        assertEquals(fromRepo.get(0).getName(), "Oranges");
    }
    //deleting an item
    @Test
    @Transactional
    public void shouldDeleteItem() {
        Item addedItem = itemRepo.save(x1);

        itemRepo.deleteById(addedItem.getId());

        List<Item> fromRepo = itemRepo.findAll();

        assertEquals(fromRepo.size(), 0);
    }

}
