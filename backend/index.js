import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'; 
import cors from 'cors';
import authRoute from './routes/auth.js'; 
import goalRoute from "./routes/Goals.js";
import nudgeRoutes from './routes/nudge.js';


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoute);
app.use("/api/goals", goalRoute);
app.use("/api/nudge", nudgeRoutes);

// MongoDB Connection
// Using process.env.MONGO_URL from your .env file
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB Atlas!"))
    .catch((err) => console.log(" DB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});