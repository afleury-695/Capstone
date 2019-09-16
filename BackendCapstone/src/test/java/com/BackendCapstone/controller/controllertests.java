package com.BackendCapstone.controller;

import com.BackendCapstone.Controller.ItemController;
import com.BackendCapstone.DTO.Item;
import com.BackendCapstone.Service.ItemService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.util.NestedServletException;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class controllertests {

    private MockMvc mockMvc;

    @Mock
    ItemService mockItemService;

    @InjectMocks
    ItemController itemController;

    Item item1;
    Item item2;

    List<Item> itemListX;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(itemController).build();

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
    public void rootContext_shouldRespondWith404() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void ShouldReturnAllItems() throws Exception {
        when(mockItemService.getAllItems()).thenReturn(itemListX);

        mockMvc.perform(get("/items"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is(itemListX.get(0).getName())));

        verify(mockItemService).getAllItems();

    }

    @Test
    public void ShouldReturnItemById() throws Exception {
        itemListX = Arrays.asList(item2);
        when(mockItemService.getItemById(itemListX.get(0).getId())).thenReturn(itemListX);

        mockMvc.perform(get("/items/id" + itemListX.get(0).getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(itemListX.get(0).getId())));

        verify(mockItemService).getItemById(itemListX.get(0).getId());
    }
}
