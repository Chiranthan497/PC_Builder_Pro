import express from 'express';
import {
    getAllComponents,
    getByType,
    getById,
    createComponent
} from '../controllers/componentController.js';

const router = express.Router();

router.get('/', getAllComponents);
router.post('/', createComponent);
router.get('/:type', getByType);
router.get('/detail/:id', getById);

export default router;
