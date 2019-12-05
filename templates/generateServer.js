module.exports = name => `import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (err) {
    res.status(400).json({ error: 'Invalid Request data' });
  } else {
    next();
  }
});

Routes(app);

app.get('/', (req, res) => res.status(200).json({
  message: "Welcome to ${name}"
}));

app.use((req, res) => res.status(404).json({
  status: 404,
  error: ${'`Route ${req.url} Not found`'}
}));

export { app };
`