import React from "react";
import * as BooksAPI from "../BooksAPI";

const Book = (props) => {
  const handleShelfChange = (event) => {
    if (event.target.value !== "move") {
      updateBook(event);
      fetchBooks();
    }
  };

  const updateBook = async (event) => {
    let shelf = event.target.value
    await BooksAPI.update(props.book, shelf);
  };
  const fetchBooks = async () => {
    const response = await BooksAPI.getAll();
    props.setBooks(response);
  };
  const handleShelfChangeInSearchBooks = (event) => {
    if (event.target.value !== "move") {
      updateBook(event);
    }
  };
  const checkPage = (event) => {
    if (!props.isSearchingPage) {
      handleShelfChange(event);
    } else {
      handleShelfChangeInSearchBooks(event);
    }
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: `url("${props.imageUrl}")`,
            height: 170,
            width: 140,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={checkPage} defaultValue={props.bookshelf}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="none">None</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">
        {props.authors.map((author) => `${author},`)}
      </div>
    </div>
  );
};

export default Book;
