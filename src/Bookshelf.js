import React from "react";
import Book from './Book'

const Bookshelf = ({
  title, books, moveShelf
}) => (
  <div className='bookshelf'>
    <h2 className='bookshelf-title'>{title}</h2>
    <div className='bookshelf-books'>
      <ol className='books-grid'>
        <li>
          {books && books.map((book, index) => 
            <Book 
              title={book.title} 
              author={book.author} 
              backgroundImage={book.backgroundImage} 
              moveShelf={(shelf) => moveShelf(book, shelf)}
              key={index}
              id={book.id}
              currentShelf={book.shelf}
            />
          )}
        </li>
      </ol>
    </div>
  </div>
);

export default Bookshelf;
