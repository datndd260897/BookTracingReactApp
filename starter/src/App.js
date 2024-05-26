import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelves from "./BookShelves";
import { Link } from "react-router-dom";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await BooksAPI.getAll();
    if (response.error) {
      setBooks([]);
    }
    setBooks(response);
  };

  useEffect(() => {
    fetchBooks();
  }, [books]);

  const bookshelves = [
    { title: "Currently Reading", name: "currentlyReading" },
    { title: "Want to Read", name: "wantToRead" },
    { title: "Read", name: "read" },
  ];

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Books</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves.map((bookshelf, index) => (
              <BookShelves
                key={index}
                title={bookshelf.title}
                books={books?.filter(
                  (book) => book && book.shelf === bookshelf.name
                )}
                setBooks={setBooks}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link className="open-search-link" to="/search">
            Add new Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
