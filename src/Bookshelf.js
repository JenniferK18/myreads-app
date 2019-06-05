import React from "react";
import Book from './Book'

const Bookshelf = ({
  title, books, moveShelf
}) => (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{title}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {books.map((book, index) =>
            <Book
              title={book.title}
              authors={book.authors}
              backgroundImage={book.imageLinks.thumbnail}
              key={index}
              moveShelf={(shelf) => moveShelf(book, shelf)}
              currentShelf={book.shelf}
            />
          )}
        </ol>
      </div>
    </div>
  );

export default Bookshelf;
