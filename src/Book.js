import React from "react";

const Book = ({
  title,
  authors,
  backgroundImage,
  moveShelf,
  currentShelf
}) => (
    <div className='book'>
      <div className='book-top'>
        <div
          className='book-cover'
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${backgroundImage}")`
          }}
        />
        <div className='book-shelf-changer'>
          <select
            onChange={(event) => moveShelf(event.target.value)}
            value={currentShelf || 'none'}
          >
            <option value='move' disabled>
              Move to...
          </option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{title}</div>
      {authors && authors.map((author, index) => <div className='book-authors' key={index}>{author}</div>)}
    </div>
  );

export default Book;
