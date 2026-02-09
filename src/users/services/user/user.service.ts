import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    async create(dto: CreateUserDto): Promise<User> {
        const exists = await this.userRepo.findOne({
            where: { email: dto.email },
        });

        if (exists) {
            throw new ConflictException('Email already exists');
        }

        const user = this.userRepo.create({
            email: dto.email,
            password: await bcrypt.hash(dto.password, 10),
        });

        return this.userRepo.save(user);
    }

    async findByEmail(email: string) {
        console.log('entra pa', email);
        
        const user = await this.userRepo.findOne({ where: { email: email } });
        if (!user) {
            throw new NotFoundException(`User ${email} not found`);
        }
        return user;
    }


}
