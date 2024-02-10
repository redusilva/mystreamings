import { MongoClient } from "mongodb";
import 'dotenv/config';

const uri = process.env.DATABASE_URL as string;
const client = new MongoClient(uri);

// Função para conectar ao banco de dados
async function connectDatabase() {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}

// Chamando a função para conectar ao banco de dados
connectDatabase();

// Exportando o cliente conectado
export default client;
