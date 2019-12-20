import AuthService from "../AuthService";
import {navigate} from "@reach/router";

const API_URL = process.env.REACT_APP_API_URL;
const Auth = new AuthService(`${API_URL}/users/authenticate`);

/******************************************************
 Actions for Notifications
 ******************************************************/
export const showAlert = (title, text, level) => ({
    type: 'SHOW_ALERT',
    title: title,
    text: text,
    level: level
});

export const showAndHideAlert = (title, text, level, delay = 10000) => async function (dispatch) {
    console.log("Delay of " + delay);
    dispatch(showAlert(title, text, level));
    setTimeout(_ => dispatch(hideAlert()), delay);
};

export const hideAlert = (title, text) => ({
    type: 'HIDE_ALERT',
});

/******************************************************
 Actions for User credentials and Login / logout
 ******************************************************/
export const addUserCredentials = (username) => ({
    type: 'ADD_USER_CRED',
    username: username
});

export const removeUserCredentials = (username) => ({
    type: 'REMOVE_USER_CRED'
});

export const login = (username, password) => async function (dispatch) {
    try {
        await Auth.login(username, password);
        dispatch(addUserCredentials(username));
        navigate("/"); // Front page
    } catch (e) {
        dispatch(showAndHideAlert("Login Failed", e.message, "error"));
    }
};

export const logout = _ => async function (dispatch) {
    Auth.logout();
    dispatch(removeUserCredentials());
};

/******************************************************
 Actions for Books
 ******************************************************/
export const addBook = (id, title, author, category, price, seller) => ({
    type: 'ADD_BOOK',
    id: id,
    title: title,
    author: author,
    category: category,
    price: price,
    seller: seller,
});

export const fetchBooks = _ => async function (dispatch) {
    let url = `${API_URL}/books`;
    let result = await fetch(url);
    let json = await result.json();
    for (let book of json) {
        dispatch(addBook(
            book._id, book.title, book.author, book.category, book.price, book.seller
        ))
    }
};

export const postBook = (title, author, category, price, seller) => async function (dispatch) {
    if (title === "" || author === "") return;
    try {
        const newBook = {
            title: title,
            author: author,
            category: category,
            price: price,
            seller: seller,
        };
        const response = await Auth.fetch(`${API_URL}/books`, {
            method: "POST",
            body: JSON.stringify(newBook)
        });
        if (response.status === 401) {
            dispatch(showAndHideAlert("Login", "You need to login to add books!", "alert"));
        } else {
            await response.json();
            dispatch(fetchBooks());
        }
    } catch (e) {
        dispatch(showAndHideAlert("Error while adding book", e.message, "error"));
        console.error(e);
    }
};

/******************************************************
 Actions for Categories
 ******************************************************/
export const addCategory = (id, alias, name) => ({
    type: 'ADD_CATEGORY',
    id: id,
    alias: alias,
    name: name,
});

export const fetchCategories = _ => async function (dispatch) {
    let url = `${API_URL}/categories`;
    let result = await fetch(url);
    let json = await result.json();
    for (let category of json) {
        dispatch(addCategory(
            category._id, category.alias, category.name
        ))
    }
};

export const postCategory = (alias, name) => async function (dispatch) {
    const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            alias: alias, name: name
        })
    });
    const newCategory = await response.json();
    dispatch(addCategory(
        newCategory._id, newCategory.alias, newCategory.name
    ));
};