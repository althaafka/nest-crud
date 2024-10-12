import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Get all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Get user by id
  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Get user by username
  async findOneByUsername(username: string, selectPassword = false): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (selectPassword){
      return this.userRepository.findOne({
        where: { username },
        select: ['id', 'username', 'password', 'bio'],
      });
    }
    return user;
  }

  // Register new user
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);
    
    return newUser;
  }

  // Delete user
  async delete(userId: number, tokenUserId: number): Promise<string> {
    if (userId != tokenUserId) {
      throw new UnauthorizedException('You can only delete your own account');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(userId);
    return 'User deleted successfully';
  }

  // Update user
  async updateBio(userId: number, tokenUserId: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (userId != tokenUserId) {
      throw new UnauthorizedException('You can only update your own bio');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.bio = updateUserDto.bio;
    await this.userRepository.save(user);

    return user;
  }
}
