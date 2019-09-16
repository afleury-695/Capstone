package com.BackendCapstone.service;

import com.BackendCapstone.DAO.ItemRepository;
import com.BackendCapstone.DTO.Item;

import com.BackendCapstone.Service.ItemService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;


@RunWith(MockitoJUnitRunner.class)
public class ServiceLayerTests {
    @Mock
    @Autowired
    ItemRepository itemRepoMock;

    @InjectMocks
    ItemService itemServiceX;

    Item item1;
    Item item2;

    List<Item> itemListX;

    @Before
    public void setUp() {

        item1 = new Item();
        item1.setId(0);
        item1.setName("Bananas");
        item1.setCategory("Food");
        item1.setQuantity(200);
        item1.setIsImported(false);
        item1.setPrice(2.00);
        item1.setImage("https://media.istockphoto.com/photos/banana-picture-id636739634?k=6&m=636739634&s=612x612&w=0&h=BQ9Z6DobjFzclh3LN7nKSljrRqycJPCq65CS8rtUHU4=");

        item2 = new Item();
        item2.setId(1);
        item2.setName("Tomato");
        item2.setCategory("Food");
        item2.setQuantity(200);
        item2.setIsImported(false);
        item2.setPrice(1.00);
        item2.setImage("https://boygeniusreport.files.wordpress.com/2019/05/capture-2.png?w=782");

        itemListX = Arrays.asList(item1, item2);

    }

    @Test
    public void shouldGetAllItems() {
        List<Item> expectedList = Arrays.asList(item1, item2);
        when(itemRepoMock.findAll()).thenReturn(itemListX);
        assertEquals(expectedList, itemServiceX.getAllItems());
    }

    @Test
    public void shouldGetItemsById() {
        List<Item> expectedList = Arrays.asList(item2);
        List<Item> itemListX = Arrays.asList(item2);
        when(itemRepoMock.findById(item2.getId())).thenReturn(itemListX);
        assertEquals(expectedList, itemServiceX.getItemById(item2.getId()));
    }
}
