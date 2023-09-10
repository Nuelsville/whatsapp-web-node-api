const slugify = require('slugify')
const { Category } = require('../models');

const createCategory = async (req, res) => {
    try {
        const { title, description } = req.body;

        let slug = slugify(title, { lower: true })

        // Check if the slug already exists
        let existingSlug = await Category.findOne({ where: { slug } });

        // If the slug already exists, add a counter to make it distinct
        let counter = 0;
        let newSlug;

        while (existingSlug) {
            counter++;
            newSlug = `${slug}-${counter}`;
            existingSlug = await Category.findOne({ where: { slug: newSlug } });
        }

        slug = (counter > 0) ? newSlug : slug;

        const category = await Category.create({ title, description, slug })

        res.status(201).json(category)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const editCategory = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            res.status(404).json({message: "Category not found"});
        }

        // Generate the slug from the title
        let slug = slugify(title, { lower: true });

        // Check if the slug already exists
        let existingSlug = await Category.findOne({ where: { slug } });

        // If the slug already exists, add a counter to make it distinct
        let counter = 0;
        let newSlug;

        while (existingSlug) {
            counter++;
            newSlug = `${slug}-${counter}`;
            existingSlug = await Category.findOne({ where: { slug: newSlug } });
        }

        slug = (counter > 0) ? newSlug : slug;

        await category.update({ title, description, slug })
        res.status(200).json(sector)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllCategory = async (req, res) => {
    try {
        // Fetch all category
        const category = await Category.findAll();

        res.status(200).json(category);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createCategory,
    editCategory,
    getAllCategory
}