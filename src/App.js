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

    const input=event.target.value
    /*
    BooksAPI.search(input).then(books => {
      this.setState(prevState => ({
        searchBooks: prevState.searchBooks.map(
          searchBook =>
            prevState.books.filter(book => searchBook.id === book.id)[0] ||
            searchBook
        ),
        searchInput: input
      }));
    });
    */
    this.setState(prevState => ({
      searchBooks: prevState.searchBooks.map(
        searchBook =>
          prevState.books.filter(book => searchBook.id === book.id)[0] ||
          searchBook
      ),
      searchInput: input
    }));
  };

  moveShelf = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      this.setState((prevState) => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }));
    });

    //const newShelf = event.target.value
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
