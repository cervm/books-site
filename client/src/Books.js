import React, {Component} from 'react';
import {Link} from "@reach/router";

class Books extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Books</h1>
                <ol>
                    {this.props.books.map(book =>
                        <li key={book.id}>
                            <Link to={`/books/${book.id}`}>{book.title} {}</Link>
                        </li>)}
                </ol>
            </React.Fragment>
        );
    }

}

export default Books;
