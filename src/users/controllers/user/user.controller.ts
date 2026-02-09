import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { UserService } from 'src/users/services/user/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly usersService: UserService) { }

    @Post()
    create(@Body() dto: CreateUserDto) {
        // console.log('entra', dto);
        
        return this.usersService.create(dto);
    }

}
