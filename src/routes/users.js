import express from 'express';
import usersController from '../controllers/usersController';

const router = express.Router();
router.post('/', usersController.signupWithEmail);
router.get('/verify/:token', usersController.verifyEmail);
export default router;
