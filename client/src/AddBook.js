import React, {Component} from 'react';
import {Redirect} from "@reach/router";

export default class AddBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            author: "",
            categoryAlias: "",
            price: 0,
        };
        this.handleInput = this.handleInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.props.onAddBook(
            this.state.title,
            this.state.author,
            this.getCategory(this.state.categoryAlias),
            this.state.price,
            {
                "email": "john.snow@gmail.com",
                "name": "John Snow"
            },
        );
        this.setState({
            title: "",
            author: "",
            categoryAlias: "",
            price: 0,
        });
    }

    getCategory(alias) {
        return this.props.categories.find(category => category.alias === alias);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        if (this.props.username) {

            return (
                <form>
                    <div className="field">
                        <label className="label" htmlFor="TitleInput">Title</label>
                        <div className="control">
                            <input className="input" type="text"
                                   onChange={this.onChange}
                                   name="title"
                                   value={this.state.title}
                                   placeholder="Title"
                                   id="TitleInput"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="AuthorInput">Author</label>
                        <div className="control">
                            <input className="input" type="text"
                                   onChange={this.onChange}
                                   name="author"
                                   value={this.state.author}
                                   placeholder="Author"
                                   id="AuthorInput"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="CategorySelect">Category</label>
                        <div className="control">
                            <div className="select">
                                <select onChange={this.onChange}
                                        name="categoryAlias"
                                        value={this.state.categoryAlias}
                                        id="CategorySelect">
                                    {this.props.categories.map(category =>
                                        <option key={category.alias} value={category.alias}>{category.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="PriceInput">Price</label>
                        <div className="control">
                            <input className="input" type="number" min="0"
                                   onChange={this.onChange}
                                   name="price"
                                   value={this.state.price}
                                   placeholder="Price"
                                   id="PriceInput"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button className="button is-primary" onClick={this.handleInput} type="submit"
                                id="AddBookButton">Add Book
                        </button>
                    </div>
                </form>
            )
        } else {
            return <Redirect to="/login"/>
        }
    };
}