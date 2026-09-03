import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 3000 });
    console.log('Connected to octofit_db');
  } catch (error) {
    console.error('MongoDB unavailable; API started without database:', error);
  }
}

export default mongoose.connection;
