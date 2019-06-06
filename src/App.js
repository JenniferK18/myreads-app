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
        title: "Title1",
        author: ["Author1"],
        id: 1,
        shelf: "currentlyReading"
      },
      {
        title: "Title2",
        author: ["Author2"],
        id: 2,
        shelf: "wantToRead"
      },
      {
        title: "Title3",
        author: ["Author3"],
        id: 3,
        shelf: "read"
      }
    ],
    searchBooks: [
      {
        title: "Title1",
        author: ["Author1"],
        id: 1
      },
      {
        title: "Title2",
        author: ["Author2"],
        id: 2
      },
      {
        title: "Title3",
        author: ["Author3"],
        id: 4
      }
    ]
  };

  updateSearchInput = event => {

    /*BooksAPI.search(event.target.value).then(books => {
      this.setState(prevState => {
        prevState.searchBooks.map(
          searchBook =>
            prevState.books.filter(book => searchBook.id === book.id)[0] ||
            searchBook
        );
      });
    });
    */
    this.setState(prevState => {
      prevState.searchBooks.map(
        searchBook =>
          prevState.books.filter(book => searchBook.id === book.id)[0] ||
          searchBook
      );
    });

    /*const newBooks = this.state.searchBooks.map(searchBook => (
      this.state.books.filter(book => (searchBook.id === book.id))[0] || searchBook
    ))

    this.setState({
      searchBooks: newBooks
    })
    */
  };

  moveShelf = (book, shelf) => {
    //const newShelf = event.target.value
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(books => {
      this.setState(() => ({
        books: this.state.books.filter(b => b.id !== book.id).concat(book)
      }));
    });

    /*const newBook = this.state.books.filter(book => book.id === bookId);
    newBook[0].shelf = newShelf;
    const oldBooks = this.state.books.filter(book => book.id !== bookId);
    const newBooks = [newBook[0], ...oldBooks];
    this.setState({
      books: newBooks
    });
    */
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
