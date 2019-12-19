import React, {Component} from 'react';
import {Router} from "@reach/router";
import Book from "./Book";
import Books from "./Books";

// Connect wraps a component and makes it a Container component
import {connect} from "react-redux";
import {postBook, fetchBooks} from "./actions";

class App extends Component {
    componentDidMount() {
        this.props.fetchBooks();
    }

    // We keep this method for searching in the list of books provided to the component
    getBook(id) {
        return this.props.books.find(book => book.id === id);
    }

    render() {
        return (
            // Remember, we now use this.props.books everywhere where we previously used this.state.books
            <div className="container">
                <Router>
                    <Book path="/books/:id" getBook={id => this.getBook(id)}/>
                    <Books path="/" books={this.props.books}
                           addBook={title => this.props.postBook(title)}/>
                </Router>
            </div>
        );
    }
}

// Mapping our state to props for <App>
const mapStateToProps = state => ({
    books: state.books
});

// Making callbacks available to <App>
const mapDispatchToProps = dispatch => ({
    postBook: (title) => dispatch(postBook(title)),
    fetchBooks: _ => dispatch(fetchBooks())
});

// Wrapping <App> and exporting the wrapped component instead of the original component
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);