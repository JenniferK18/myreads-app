import React from "react";
import { Link } from "react-router-dom";
import Bookshelf from './Bookshelf'

const titles=[
  {
    formattedTitle: 'Currently Reading',
    variableTitle: 'currentlyReading'
  },
  {
    formattedTitle: 'Want to Read',
    variableTitle: 'wantToRead'
  },
  {
    formattedTitle: 'Read',
    variableTitle: 'read'
  }
]

const Shelves = ({
  books, moveShelf
}) => (
  <div className='list-books'>
    <div className='list-books-title'>
      <h1>MyReads</h1>
    </div>
    <div className='list-books-content'>
      { titles.map((title, index) => 
        <Bookshelf 
          title={title.formattedTitle} 
          books={books.filter(book => book.shelf === title.variableTitle)}
          moveShelf={moveShelf} 
          key={index}
        />
      )}      
    </div>
    <Link to='/search' className='open-search'>
      Add a book
    </Link>
  </div>
);

export default Shelves;
