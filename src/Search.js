import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

const Search = ({
  input, handleUpdate, books, moveShelf
}) => (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-search'>
          Close
      </Link>
        <div className='search-books-input-wrapper'>
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
        */}
          <input
            type='text'
            placeholder='Search by title or author'
            value={input}
            onChange={event => handleUpdate(event)}
          />
        </div>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
          {books.map((book, index) =>
            <Book
              title={book.title}
              authors={book.authors}
              backgroundImage={book.imageLinks && book.imageLinks.thumbnail}
              key={index}
              moveShelf={(shelf) => moveShelf(book, shelf)}
              currentShelf={book.shelf}
            />
          )}
        </ol>
      </div>
    </div>
  );

export default Search;
