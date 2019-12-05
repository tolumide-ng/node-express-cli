module.exports = () => `import express from 'express';
import Sample from '../../controllers/sample';

const router = express.Router();

router.get(
  '/',
  Sample.dummyRoute
);

export default router;
`