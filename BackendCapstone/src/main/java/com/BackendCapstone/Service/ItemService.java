package com.BackendCapstone.Service;

import com.BackendCapstone.DAO.ItemRepository;
import com.BackendCapstone.DTO.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ItemService {

    @Autowired
    private ItemRepository itemRepo;

    //basic crud route methods:

    //POST
    public Item addItem(Item item) {
        itemRepo.save(item);
        return item;
    }

    //GET (all)
    public List<Item> getAllItems() {
        return itemRepo.findAll();
    }

    //GET (id)
    public Item getItemById(int id) {
        return itemRepo.getOne(id);
    }

    //POST
    public void updateItem(Item item, int id) {
        itemRepo.save(item);
    }

    //DELETE
    public void deleteItem(int id) {
        itemRepo.deleteById(id);
    }

    //for purchasing the items via the PURCHASE route and updating the quantities we have in the actual database
    public void purchase(Item[] item) {
        for(Item i: item ) {
            Item currItem= this.getItemById(i.getId());

            currItem.setQuantity(currItem.getQuantity() - i.getQuantity());
            this.updateItem(currItem, currItem.getId());
        }
    }

}
