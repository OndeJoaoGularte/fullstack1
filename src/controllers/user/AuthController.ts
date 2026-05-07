import { Request, Response } from "express";
import { AuthService } from "../../services/user/AuthService";

export class AuthController {
  private authService = new AuthService();

  async register(req: Request, res: Response) {
    try {
      const user = await this.authService.register(req.body);

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}
