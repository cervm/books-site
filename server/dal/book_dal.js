class BookDAL {
    constructor(mongoose) {
        this.mongoose = mongoose;
        const bookSchema = new mongoose.Schema({
            title: String,
            author: String,
            category: {
                alias: String,
                name: String,
            },
            price: Number,
            seller: {
                email: String,
                name: String,
            }
        });
        this.bookModel = mongoose.model('book', bookSchema);
    }

    async getBooks(category) {
        try {
            return await this.bookModel.find(
                (category !== undefined)
                    ? {'category.alias': category}
                    : {}
            );
        } catch (error) {
            console.error("getBooks:", error.message);
            return {};
        }
    }

    async getBook(id) {
        try {
            return await this.bookModel.findById(id);
        } catch (error) {
            console.error("getBook:", error.message);
            return {};
        }
    }

    async createBook(newBook) {
        let book = new this.bookModel(newBook);
        return book.save();
    }

    async bootstrap() {
        let l = (await this.getBooks()).length;
        console.log("Book collection size:", l);

        if (l !== 0) return;

        const books = [
            {
                title: "Design patterns : elements of reusable object-oriented software",
                author: "Erich Gamma",
                category: {
                    alias: "programming",
                    name: "Programming"
                },
                seller: {
                    email: "marek.cervinka@gmail.com",
                    name: "Marek Cervinka"
                },
                price: 250
            },
            {
                title: "The History of Graphic Design. Vol. 2, 1960-Today",
                author: "Jens Muller",
                category: {
                    alias: "graphic-design",
                    name: "Graphic Design"
                },
                seller: {
                    email: "john.snow@gmail.com",
                    name: "John Snow"
                },
                price: 400
            },
            {
                title: "Refactoring: Improving the Design of Existing Code",
                author: "Martin Fowler",
                category: {
                    alias: "programming",
                    name: "Programming"
                },
                seller: {
                    email: "marek.cervinka@gmail.com",
                    name: "Marek Cervinka"
                },
                price: 300
            }
        ];

        let promises = [];
        books.forEach(book => {
            let newBook = new this.bookModel(book);
            promises.push(newBook.save());
        });

        return Promise.all(promises);
    }
}

module.exports = (mongoose) => new BookDAL(mongoose);