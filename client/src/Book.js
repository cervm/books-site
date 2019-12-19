import React, {Component} from 'react';
import {Link} from "@reach/router";

class Book extends Component {
    render() {
        const book = this.props.getBook(this.props.id);
        let content = <p>Loading</p>;
        if (book) {
            content =
                <React.Fragment>
                    <h1>{book.title}</h1>
                    <ul>
                        <li>Author: {book.author}</li>
                        <li>Category: {book.category.name}</li>
                        <li>Price: {book.price}</li>
                        <li>Seller: {book.seller.name}</li>
                    </ul>
                    <br/>
                    <Link to="/">Back</Link>
                </React.Fragment>
        }

        return content;
    }
}

export default Book;
