import React, {Component} from 'react';
import {Link} from "@reach/router";

class Books extends Component {
    render() {
        const books = this.props.getBooks(this.props.alias);
        let content = <p>Loading</p>;
        if (books) {
            content = <React.Fragment>
                <h1>Books</h1>
                <ol>
                    {books.map(book =>
                        <li key={book.id}>
                            <Link to={`/books/${book.id}`}>{book.title} {}</Link>
                        </li>)}
                </ol>
            </React.Fragment>
        }

        return content;
    }

}

export default Books;
