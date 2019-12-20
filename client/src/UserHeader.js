import React, {Component} from 'react';
import {Link} from "@reach/router";

class UserHeader extends Component {
    render() {
        const writeLoginStatus = () => {
            if (this.props.username) {
                return (
                    <>
                        <nav className="level">
                            <div className="level-left">
                                Welcome {this.props.username}.
                                <button className="button is-small" onClick={
                                    (event) => this.props.logout(event)}>logout</button>
                            </div>
                            <div className="level-right">
                                <p className="level-item"><Link to="/books/add">Add Book</Link></p>
                                <p className="level-item"><Link to="/admin">Admin</Link></p>
                            </div>
                        </nav>
                    </>)
            } else {
                return <Link to="/login" className="btnText">Login</Link>
            }
        };

        return (
            <div className="container is-widescreen">
                <div className="notification">
                    {writeLoginStatus()}
                </div>
            </div>
        );
    }
}

export default UserHeader;
