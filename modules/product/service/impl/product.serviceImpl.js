const Product = require("../../dao/models/product.model");
const ProductService = require('../product.service');

class ProductServiceImpl extends ProductService {
    async getAllProducts() {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            throw new Error('Failed to get all products.');
        }
    }

    async createProduct(productData) {
        try {
            const product = await Product.create(productData);
            return product;
        } catch (error) {
            throw new Error('Failed to create product.');
        }
    }

    async searchProduct(name, description) {
        try {
            const query = {};

            if (name) {
                query.name = { $regex: name, $options: 'i' };
            }

            if (description) {
                query.description = { $regex: description, $options: 'i' };
            }

            const products = await Product.find(query);
            return products;
        } catch (error) {
            throw new Error('Failed to search for products.');
        }
    }

    async getProduct(productId) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found.');
            }
            return product;
        } catch (error) {
            throw new Error('Failed to get product.');
        }
    }

    async updateProduct(productId, updatedProduct) {
        try {
            const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
            if (!product) {
                throw new Error('Product not found.');
            }
            return product;
        } catch (error) {
            throw new Error('Failed to update product.');
        }
    }

    async deleteProduct(productId) {
        try {
            const product = await Product.findByIdAndDelete(productId);
            if (!product) {
                throw new Error('Product not found.');
            }
            return product;
        } catch (error) {
            throw new Error('Failed to delete product.');
        }
    }

    async getTopRatedProducts(limit) {
        try {
            const products = await Product.find().sort({ ratings: -1 }).limit(limit);
            return products;
        } catch (error) {
            throw new Error('Failed to get top rated products.');
        }
    }
}

module.exports = ProductServiceImpl;
