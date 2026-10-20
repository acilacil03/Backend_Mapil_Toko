import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/', updateProduct);
router.put('/:id', updateProduct);
router.delete('/', deleteProduct);
router.delete('/:id', deleteProduct);

export default router;
