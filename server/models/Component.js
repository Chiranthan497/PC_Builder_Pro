import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Component name is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Component type is required'],
        enum: ['cpu', 'gpu', 'motherboard', 'ram', 'storage', 'psu', 'case']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required']
    },
    model: String,
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    specs: {
        type: Map,
        of: String
    },
    compatibility: [{
        type: String
    }],
    inStock: {
        type: Boolean,
        default: true
    },
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/300x200?text=PC+Component'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
}, {
    timestamps: true
});

// Index for efficient queries
componentSchema.index({ type: 1, brand: 1 });
componentSchema.index({ price: 1 });

export default mongoose.model('Component', componentSchema);
