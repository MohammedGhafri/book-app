DROP TABLE IF EXISTS book;
CREATE TABLE book (
  id SERIAL PRIMARY KEY,
  img VARCHAR(255),
  title VARCHAR(255),
  auther VARCHAR(255),
  description text,
  isbn VARCHAR(255),
  bookShelf VARCHAR(255)
);

INSERT INTO book (img, title, auther, description,isbn, bookShelf) VALUES ('https://i.imgur.com/J5LVHEL.jpg','Mohammed','Book','mmmmm','123456789','irbid');