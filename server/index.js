import app from './app.js';
import dbConnection from './utils/dbConnection.js';

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Server shutting down due to Uncaught Expception');
  process.exit(1);
});

const port = process.env.PORT || 8000;

dbConnection();
const Server = app.listen(port, () => {
  console.log(`Server is runing on http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Server shutting down due to unhandled Rejection');
  Server.close(() => {
    process.exit(1);
  });
});
