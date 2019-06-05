import React from "react";
import * as BooksAPI from "./BooksAPI";
import Search from "./Search";
import Shelves from "./Shelves";
import "./App.css";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    searchInput: "",
    books: [],
    searchBooks: []
  };

  updateSearchInput = event => {
    const input = event.target.value
    input === '' ? this.setState({ searchBooks: [], searchInput: input }) :
      BooksAPI.search(input).then(books => {
        this.setState(prevState => ({
          searchBooks: Array.isArray(books) ? books.map(searchBook =>
            prevState.books.filter(book => searchBook.id === book.id)[0] ||
            searchBook
          ) : [],
          searchInput: input
        }));
      });
  };

  moveShelf = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }));
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  render() {
    const { searchInput, searchBooks, books } = this.state;
    return (
      <div className='app'>
        <Route
          path='/search'
          render={({ history }) => (
            <Search
              handleUpdate={this.updateSearchInput}
              input={searchInput}
              books={searchBooks}
              moveShelf={this.moveShelf}
            />
          )}
        />
        <Route
          exact
          path='/'
          render={() => <Shelves books={books} moveShelf={this.moveShelf} />}
        />
      </div>
    );
  }
}

export default BooksApp;
