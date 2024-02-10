import 'dotenv/config';
import client from "../../config/database";

const database = client.db(process.env.DATABASE_NAME);
const table = database.collection("users");