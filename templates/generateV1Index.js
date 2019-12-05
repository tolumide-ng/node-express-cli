module.exports = () => `import express from 'express';
import sample from './sample';

const router = express.Router();

router.use('/sample', sample);

export default router;
`