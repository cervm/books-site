import React, {Component} from 'react';
import {Link} from "@reach/router";

class Categories extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Categories</h1>
                <ol>
                    {this.props.categories.map(category =>
                        <li key={category.alias}>
                            <Link to={`/books/category/${category.alias}`}>{category.name}</Link>
                        </li>
                    )}
                </ol>
            </React.Fragment>
        );
    }

}

export default Categories;
