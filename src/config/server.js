import "dotenv/config";
import app from "../app.js";
import connectDB from "./database.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();

        app.get('/', (req, res) => {
            res.json({ message: "API online e rodando no Render!" });
        });

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();