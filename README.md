# FinalCapstone-TEK
1
The table I generated is called items2


Please refresh or click "items" in the nav bar after adding new items to database to ensure sales tax is calculated if any issues with auto-taxing arise. This is in case of any issues. 

EXAMPLE MYSQL COMMAND & EXAMPLE ITEM: 
(with randomized data, can be easily deleted from the admin page) 

USE shopping_cart;
INSERT INTO items2 (category, image, import_tax, is_imported, name, price, quantity, sales_tax) VALUES ('Music', 'https://bit.ly/2kLKdct', 0, true, 'Imported Example Item', 12.00, 200, 0); 
