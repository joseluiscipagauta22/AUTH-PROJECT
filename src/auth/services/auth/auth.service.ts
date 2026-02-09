import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../../users/services/user/user.service';
import { User } from 'src/users/entities/user.entity';
import { UserModel } from 'src/users/interfaces/user';
// import { CreateUserDto} from 'src/users/dtos/user.dto';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
        // @InjectRepository(User) private userRepo: Repository<User>
    ){}

    async validateUser(email: string, password: string) {
        const user: User = await this.usersService.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password: _, ...result } = user;
        return result;
    }

    async login(user: UserModel) {
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
