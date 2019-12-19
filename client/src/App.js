import React, {Component} from 'react';
import {Link, Router} from "@reach/router";
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
            <>
                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <Link to="/"><h1 className="title is-2">Books Marketplace</h1></Link>
                            <h2 className="subtitle">
                                Ged rid of your old books!
                            </h2>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <Router>
                            <Book path="/books/:id" getBook={id => this.getBook(id)}/>
                            <Books path="/" books={this.props.books}
                                   addBook={title => this.props.postBook(title)}/>
                        </Router>
                    </div>
                </section>
                <footer className="footer">
                    <div className="container">
                        <div className="content has-text-centered">
                            <p>
                                <strong>Books Marketplace</strong> by Marek Cervinka
                            </p>
                        </div>
                    </div>
                </footer>
            </>
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