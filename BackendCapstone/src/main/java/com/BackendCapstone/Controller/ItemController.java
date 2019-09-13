package com.BackendCapstone.Controller;


//java file imports
import com.BackendCapstone.DTO.Item;
import com.BackendCapstone.Service.ItemService;

//controller imports

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

//connecting to angular program
@CrossOrigin(origins = "http://localhost:4200")
@RestController

public class ItemController {
    @Autowired
    public ItemService itemService;

    //Basic CRUD operations:

    //POST
    @RequestMapping(value="/items", method= RequestMethod.POST)
    public Item addItem(@RequestBody Item item) {
        itemService.addItem(item);
        return item;
    }

    //GET (all)
    @RequestMapping(value="/items", method=RequestMethod.GET)
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    //GET (by id)
    @RequestMapping(value="/items/{id}", method=RequestMethod.GET)
    public Item getItemById(@PathVariable int id) {
        return itemService.getItemById(id);
    }

    //PUT
    @RequestMapping(value="/items/{id}", method=RequestMethod.PUT)
    public void updateItem(@RequestBody Item item, @PathVariable int id) {
        itemService.updateItem(item, id);
    }

    //DELETE
    @RequestMapping(value="/items/{id}", method=RequestMethod.DELETE)
    public void deleteItem(@PathVariable int id) {
        itemService.deleteItem(id);
    }


    @RequestMapping(value = "/purchase", method = RequestMethod.POST)
    public void purchase(@RequestBody Item[] item) {
        itemService.purchase(item);
    }

}
