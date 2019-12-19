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
}

module.exports = (mongoose) => new BookDAL(mongoose);