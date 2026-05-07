import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    // registro de um novo usuário, o "Partial<User>" é usado para informar que o novo objeto vai conter apenas algumas propriedades do User
    async register(data: Partial<User>) {
        const { name, email, password } = data;

        const userExists = await this.userRepository.findOneBy({ email });
        if (userExists) {
            throw new Error("Email já cadastrado.");
        }

        // criptografa a senha utilizando o bcrypt, o "8" representa o número de vezes que a senha será criptografada
        const hashedPassword = await bcrypt.hash(password as string, 8);

        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await this.userRepository.save(user);

        // tiramos a senha do objeto retornado para que ela não apareça no JSON
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    // login de um usuário já registrado
    async login(email: string, password: string) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new Error("Email ou senha incorretos.");
        }

        // compara a senha fornecida com a criptografada
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error("Email ou senha incorretos.");
        }

        // gera o token JWT
        const secret = process.env.JWT || "fallback_secret";
        const token = jwt.sign({ id: user.id }, secret, {
            expiresIn: "1d",
        });

        const { password: _, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }
}
