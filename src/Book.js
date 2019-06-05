import React from "react";

const Book = ({
  title, author, id, backgroundImage, moveShelf
}) => (
  <div className='book'>
    <div className='book-top'>
      <div
        className='book-cover'
        style={{
          width: 128,
          height: 193,
          backgroundImage: { backgroundImage }
        }}
      />
      <div className='book-shelf-changer'>
        <select onChange={event => moveShelf(event, id)}>
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
    <div className='book-authors'>{author}</div>
  </div>
);

export default Book;
