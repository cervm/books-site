import React, {Component} from 'react';
import {Link} from "@reach/router";

class Books extends Component {
    render() {
        const books = this.props.getBooks(this.props.alias);
        let content = <p>Loading</p>;
        if (books) {
            content = <React.Fragment>
                <h2 className="title is-2">Books</h2>

                {books.map(book =>
                    <Link to={`/books/${book.id}`}>
                        <article key={book.id} className="book media is-medium">
                            <div className="media-content">
                                <div className="content">
                                    <p>
                                        <strong>{book.title}</strong>
                                        <br/>
                                        {book.author}
                                    </p>
                                </div>
                            </div>
                        </article>
                    </Link>)}
            </React.Fragment>
        }

        return content;
    }

}

export default Books;
