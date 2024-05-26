import { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import {Link} from "react-router-dom"

const SearchBooks = (props) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted){
      if (query.length === 0) {
        setBooks([]);
      } else {
        const getSearchBooks = async () => {
          const response = await BooksAPI.search(query);
          if (response?.error){
              return setBooks([]);
          }
          return setBooks(response);
        };
        getSearchBooks();
      }
    };
    return () => {
      unmounted = true;
    }
    
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books &&
            books.map((book, index) => (
              <Book
                key={index}
                title={book.title}
                authors={book.authors}
                imageUrl={book.imageLinks && book.imageLinks.thumbnail}
                bookshelf={book.shelf}
                book={book}
                isSearchingPage
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
