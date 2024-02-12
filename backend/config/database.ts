import { MongoClient } from "mongodb";
import 'dotenv/config';

const uri = process.env.DATABASE_URL as string;
const client = new MongoClient(uri);

export default client;
