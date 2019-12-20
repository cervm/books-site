import React, {Component} from 'react';

export default class CreateCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alias: "",
            name: ""
        };
        this.handleInput = this.handleInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.props.onCreateCategory(this.state.alias, this.state.name);
        this.setState({
            alias: "",
            name: "",
        });
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <form>
                <h3 className="subtitle is-3">Add New Category</h3>
                <div className="field">
                    <label className="label" htmlFor="AliasInput">URL Alias</label>
                    <div className="control">
                        <input className="input" type="text"
                               onChange={this.onChange}
                               name="alias"
                               value={this.state.alias}
                               placeholder="URL alias"
                               id="AliasInput"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label" htmlFor="NameInput">Category Name</label>
                    <div className="control">
                        <input className="input" type="text"
                               onChange={this.onChange}
                               name="name"
                               value={this.state.name}
                               placeholder="URL alias"
                               id="NameInput"
                        />
                    </div>
                </div>
                <div className="field">
                    <button className="button is-primary" onClick={this.handleInput} type="submit"
                            id="CategoryButton">Create Category
                    </button>
                </div>
            </form>
        )
    };
}