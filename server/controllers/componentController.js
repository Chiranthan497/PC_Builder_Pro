import Component from '../models/Component.js';

// Get all components with filtering
export const getAllComponents = async (req, res) => {
    try {
        const { page = 1, limit = 20, type, minPrice, maxPrice, brand } = req.query;

        const filter = {};
        if (type) filter.type = type;
        if (brand) filter.brand = brand;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const components = await Component.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await Component.countDocuments(filter);

        res.json({
            success: true,
            data: components,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            total: count
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get components by type
export const getByType = async (req, res) => {
    try {
        const { type } = req.params;
        const components = await Component.find({ type });

        res.json({
            success: true,
            count: components.length,
            data: components
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get single component
export const getById = async (req, res) => {
    try {
        const component = await Component.findById(req.params.id);

        if (!component) {
            return res.status(404).json({
                success: false,
                error: 'Component not found'
            });
        }

        res.json({ success: true, data: component });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create component (admin only in production)
export const createComponent = async (req, res) => {
    try {
        const component = await Component.create(req.body);
        res.status(201).json({ success: true, data: component });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
