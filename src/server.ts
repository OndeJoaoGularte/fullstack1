import express from "express";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("banco conectado");

    const app = express();
    app.use(express.json());

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.log("erro:", error));
