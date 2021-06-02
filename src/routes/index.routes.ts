import { Router } from 'express';
const router = Router();

router.route('/')
.get((req, res) => res.json('Hello Word'))

export default router;