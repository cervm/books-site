import React, {Component} from 'react';
import {Link, Redirect} from "@reach/router";
import CreateCategory from "./CreateCategory";

class Admin extends Component {
    render() {
        if (this.props.username) {
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
        } else {
            return <Redirect to="/login"/>
        }
    }

}

export default Admin;
