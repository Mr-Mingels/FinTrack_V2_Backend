import { connect } from 'mongoose'

const connectToMongoDb = async () => {
  try {
    const database = await connect(process.env.MONGODB_URL as string)
    console.log("connected to MongoDB");
    console.log("Current database:", database.connection.db.databaseName);
  } catch (err) {
    console.log(err);
  }
};

export default connectToMongoDb;