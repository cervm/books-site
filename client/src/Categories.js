import React, {Component} from 'react';
import {Link} from "@reach/router";

class Categories extends Component {
    render() {
        return (
            <React.Fragment>
                <h2 className="title is-2">Categories</h2>
                <ul>
                    {this.props.categories.map(category =>
                        <li key={category.alias}>
                            <Link to={`/books/category/${category.alias}`}>{category.name}</Link>
                        </li>
                    )}
                </ul>
            </React.Fragment>
        );
    }

}

export default Categories;
