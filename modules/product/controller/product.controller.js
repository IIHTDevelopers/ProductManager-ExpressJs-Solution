const ProductServiceImpl = require("../service/impl/product.serviceImpl");

const productService = new ProductServiceImpl();

class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve products.' });
        }
    };

    async createProduct(req, res) {
        try {
            const newProduct = await productService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create product.' });
        }
    };

    async searchProduct(req, res) {
        try {
            const { name, description } = req.query;
            const foundProducts = await productService.searchProduct(name, description);
            res.json(foundProducts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search products.' });
        }
    };

    async getTopRatedProducts(req, res) {
        try {
            const limit = parseInt(req.params.limit);
            const topRatedProducts = await productService.getTopRatedProducts(limit);
            res.json(topRatedProducts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve top rated products.' });
        }
    };

    async getProduct(req, res) {
        try {
            const product = await productService.getProduct(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(404).json({ error: 'Product not found.' });
        }
    };

    async updateProduct(req, res) {
        try {
            const updatedProduct = await productService.updateProduct(req.params.id, req.body);
            res.json(updatedProduct);
        } catch (error) {
            res.status(404).json({ error: 'Product not found.' });
        }
    };

    async deleteProduct(req, res) {
        try {
            const deletedProduct = await productService.deleteProduct(req.params.id);
            res.json(deletedProduct);
        } catch (error) {
            res.status(404).json({ error: 'Product not found.' });
        }
    };
}

module.exports = ProductController;
