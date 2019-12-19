export const addBook = (id, title, author, category, price, seller) => ({
    type: 'ADD_BOOK',
    id: id,
    title: title,
    author: author,
    category: category,
    price: price,
    seller: seller,
});

const API_URL = process.env.REACT_APP_API_URL;

export const fetchBooks = _ => async function (dispatch) {
    let url = `${API_URL}/books`;
    let result = await fetch(url);
    let json = await result.json();
    for (let book of json) {
        dispatch(addBook(book._id, book.title, book.author, book.category, book.price, book.seller))
    }
};

export const postBook = (title) => async function (dispatch) {
    const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({title: title})
    });
    const newBook = await response.json();
    dispatch(addBook(newBook._id, newBook.title, newBook.author, newBook.category, newBook.price));
};
