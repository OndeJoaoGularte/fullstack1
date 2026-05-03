import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
    // criação de um novo usuário utilizando o service que criamos anteriormente
  async register(req: Request, res: Response) {
    try {
      const service = new AuthService();
      const user = await service.register(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // login de um usuário já registrado utilizando o service que criamos anteriormente
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const service = new AuthService();
      
      const result = await service.login(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}