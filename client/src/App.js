import React, {Component} from 'react';
import {Link, Router} from "@reach/router";

import Book from "./Book";
import Books from "./Books";
import AddBook from "./AddBook";
import UserHeader from "./UserHeader";
import Alert from "./Alert";
import Login from "./Login";

// Connect wraps a component and makes it a Container component
import {connect} from "react-redux";
import {login, logout, postBook, fetchBooks, postCategory, fetchCategories, hideAlert} from "./actions";
import Categories from "./Categories";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertMsg: ""
        };
    }

    componentDidMount() {
        this.props.fetchCategories();
        this.props.fetchBooks();
    }

    resetAlert() {
        this.setState({
            alertMsg: "",
            suppressInfo: true
        })
    }

    // We keep this method for searching in the list of books provided to the component
    getBook(id) {
        return this.props.books.find(book => book.id === id);
    }

    getBooksInCategory(alias) {
        return this.props.books.filter(book => book.category.alias === alias);
    }

    render() {
        let notification = <></>;
        if (this.props.notifications.active) {
            const notif = this.props.notifications;
            const level = notif.level === "error" ? "is-danger" : "is-warning";

            notification = <section className={`hero ${level} is-small`}>
                <div className="hero-body">
                    <div className="container">
                        <button onClick={() => this.props.hideAlert()} className="delete is-large is-pulled-right"/>
                        <h1 className="title">
                            {notif.title}
                        </h1>
                        <h2 className="subtitle">
                            {notif.text}
                        </h2>
                    </div>
                </div>
            </section>
        }

        return (
            <>
                {notification}

                <section className="hero is-primary is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <Link to="/"><h1 className="title is-2">Books Marketplace</h1></Link>
                            <h2 className="subtitle">
                                Ged rid of your old books!
                            </h2>
                        </div>
                    </div>
                </section>

                <UserHeader username={this.props.user.username} logout={_ => this.props.logout()}/>

                <section className="section">
                    <Alert msg={this.state.alertMsg}/>

                    <div className="container">
                        <Router>
                            <Book path="/books/:id" getBook={id => this.getBook(id)}/>

                            <Categories path="/" categories={this.props.categories}/>

                            <Books path="/books" getBooks={_ => this.props.books}/>

                            <Books path="/books/category/:alias" getBooks={alias => this.getBooksInCategory(alias)}/>

                            <AddBook path="/books/add"
                                     categories={this.props.categories}
                                     onAddBook={(title, author, category, price, seller) =>
                                         this.props.postBook(title, author, category, price, seller)}
                            />

                            <Login path="/login"
                                   login={(username, password) => this.props.login(username, password)}
                                   infoMsg={this.state.infoMsg}
                            />
                        </Router>
                    </div>
                </section>
                <Link to="/books/add">Add Book</Link>
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
    categories: state.categories,
    books: state.books,
    user: state.user,
    notifications: state.notifications,
});

// Making callbacks available to <App>
const mapDispatchToProps = dispatch => ({
    postBook: (title, author, category, price, seller) => dispatch(postBook(title, author, category, price, seller)),
    fetchBooks: (categoryAlias) => dispatch(fetchBooks(categoryAlias)),
    postCategory: (alias, name) => dispatch(postCategory(alias, name)),
    fetchCategories: _ => dispatch(fetchCategories()),
    login: (username, password) => dispatch(login(username, password)),
    logout: _ => dispatch(logout()),
    hideAlert: _ => dispatch(hideAlert())
});

// Wrapping <App> and exporting the wrapped component instead of the original component
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);