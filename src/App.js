import React from "react";
import * as BooksAPI from "./BooksAPI";
import Search from "./Search";
import Shelves from "./Shelves";
import "./App.css";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    searchInput: "",
    books: [
      {
        title: 'Title',
        author: ['Author'],
        id: 1,
        shelf: 'read'
      }
    ],
    searchBooks: null
  };

  updateSearchInput = event => {
    this.setState({
      searchInput: event.target.value
    })
    BooksAPI.search(event.target.value).then(books => {
      console.log('here')
      this.setState(() => ({
        searchBooks: books
      }));
    });
  }

  moveShelf = (event, bookId) => {  
    const newShelf=event.target.value;
    //console.log(`book shelf: ${this.state.books[0].shelf}`)
    //console.log(`oldShelf: ${this.state.books.filter(book => 
    //  book.id === bookId
    //).shelf}`); 
    //console.log(`newShelf: ${newShelf}`); 

    BooksAPI.update({id: bookId}, newShelf).then(books => {
      this.setState(() => ({
        books
      }));
    });


    this.state.books.filter(book => 
      book.id === bookId
    ).shelf=newShelf

    this.setState({
      books: this.state.books
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  render() {
    const { searchInput, searchBooks } = this.state;
    return (
      <div className='app'>
        <Route
          path='/search'
          render={({ history }) => (
            <Search
              handleUpdate={this.updateSearchInput}
              input={searchInput}
              books={searchBooks}
            />
          )}
        />
        <Route
          exact
          path='/'
          render={() => 
            <Shelves 
              books={this.state.books}
              moveShelf={this.moveShelf}
            />}
        />
      </div>
    );
  }
}

export default BooksApp;
