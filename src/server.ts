import express from 'express';
import path from 'path';

const app = express();
const port = 9898;

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, '../build')));

// Serve the index.html file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
