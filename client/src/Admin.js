import React, {Component} from 'react';
import {Link} from "@reach/router";
import CreateCategory from "./CreateCategory";

class Admin extends Component {
    render() {
        return (
            <React.Fragment>
                <h2 className="title is-2">Manage Categories</h2>
                <ul>
                    {this.props.categories.map(category =>
                        <li key={category.alias}>
                            <Link to={`/books/category/${category.alias}`}>{category.name}</Link>
                        </li>
                    )}
                </ul>
                <br/>
                <CreateCategory onCreateCategory={this.props.onCreateCategory}/>
            </React.Fragment>
        );
    }

}

export default Admin;
