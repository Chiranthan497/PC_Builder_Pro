import mongoose from 'mongoose';

const buildSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: 'My PC Build'
    },
    components: {
        cpu: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
        gpu: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
        motherboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
        ram: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
        storage: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
        psu: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
        case: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' }
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    isPublic: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model('Build', buildSchema);
