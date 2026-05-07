import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(data: Partial<User>) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new Error(
        "Erro ao registrar usuário: Nome, email e senha são obrigatórios.",
      );
    }

    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) {
      throw new Error("Erro ao registrar usuário: Email já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email?: string, password?: string) {
    if (!email || !password) {
      throw new Error("Erro ao fazer login: Email e senha são obrigatórios.");
    }
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new Error("Erro ao fazer login: Email ou senha incorretos.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Erro ao fazer login: Email ou senha incorretos.");
    }

    const secret = process.env.JWT || "fallback_secret";
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "1d",
    });

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}
