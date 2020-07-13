DROP TABLE IF EXISTS book;
CREATE TABLE book (
  id SERIAL PRIMARY KEY,
  img VARCHAR(255),
  title VARCHAR(255),
  auther VARCHAR(255),
  description text,
  bookShelf VARCHAR(255)
);

-- INSERT INTO book (img, title, auther, description, bookShelf) 
-- VALUES('feed Sherry','Razan','do immediately after getting home','pets','Sherry is hungry');