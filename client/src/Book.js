import React, {Component} from 'react';
import {Link} from "@reach/router";

class Book extends Component {
    render() {
        const book = this.props.getBook(this.props.id);
        let content = <p>Loading</p>;
        if (book) {
            const linkToCategory = `/books/category/${book.category.alias}`;
            content =
                <React.Fragment>
                    <h3 className="title is-3">{book.title}</h3>
                    <ul>
                        <li>Author: {book.author}</li>
                        <li>Category: {book.category.name}</li>
                    </ul>
                    <ul>
                        <li>Price: {book.price}</li>
                        <li>Seller: {book.seller.name} ({book.seller.email})</li>
                    </ul>
                    <br/>
                    <Link to="/books">Books Overview </Link> | <Link to={linkToCategory}>Books
                    in {book.category.name}</Link>
                </React.Fragment>
        }

        return content;
    }
}

export default Book;
