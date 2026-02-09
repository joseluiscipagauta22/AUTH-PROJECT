import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LoginDto } from 'src/auth/dtos/login.dto';
// import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: LoginDto) {
        
        const user = await this.authService.validateUser(
            body.email,
            body.password,
        );
        return this.authService.login(user);
        
    }


}
