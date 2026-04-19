import express from 'express';
import connectdb from './utils/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

import userRoutes from './routes/user.route.js';
import orgRoutes from './routes/org.route.js';
app.use('/api/user', userRoutes);
app.use('/api/org', orgRoutes);

const port = 4000;  // ← fallback added

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

connectdb();