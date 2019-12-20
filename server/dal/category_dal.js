class CategoryDAL {
    constructor(mongoose) {
        this.mongoose = mongoose;
        const categorySchema = new mongoose.Schema({
            alias: String,
            name: String
        });
        this.categoryModel = mongoose.model('category', categorySchema);
    }

    async getCategories() {
        try {
            return await this.categoryModel.find({});
        } catch (error) {
            console.error("getCategories:", error.message);
            return {};
        }
    }

    async createCategory(newCategory) {
        let category = new this.categoryModel(newCategory);
        return category.save();
    }

    async bootstrap() {
        let l = (await this.getCategories()).length;
        console.log("Category collection size:", l);

        if (l !== 0) return;

        const categories = [
            {
                alias: "programming",
                name: "Programming"
            },
            {
                alias: "graphic-design",
                name: "Graphic Design"
            },
            {
                alias: "virtual-reality",
                name: "Virtual Reality"
            }
        ];

        let promises = [];
        categories.forEach(category => {
            let newCategory = new this.categoryModel(category);
            promises.push(newCategory.save());
        });

        return Promise.all(promises);
    }
}

module.exports = (mongoose) => new CategoryDAL(mongoose);