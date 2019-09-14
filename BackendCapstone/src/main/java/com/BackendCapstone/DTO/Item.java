package com.BackendCapstone.DTO;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

@Table(name="items2")


public class Item {


    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Id
    private int id;

    private String name;


    private double price;


    private boolean isImported;


    private String category;


    private int quantity;


    private String image;

    //added
    private double salesTax;


    private double importTax;

//getters and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean getIsImported() {
        return isImported;
    }

    public void setIsImported(boolean imported) {
        isImported = imported;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    //set up

    public double getSalesTax() {
        return salesTax;
    }

    public double setSalesTax(double salesTax) {
            return this.salesTax = salesTax;
        }

    public double getImportTax() {
            return importTax;
    }

        public void setImportTax(double importTax) {
        this.importTax = importTax;
        }
//        return this.importTax = importTax;
    }

