module.exports = () => `import { app } from './server.js';
import { PORT } from './config/envVariables';

let port = PORT || 4000;
app.listen(port, () => {
  console.log(${'`Server is running on port ${port}`'});
});

export default app;
`