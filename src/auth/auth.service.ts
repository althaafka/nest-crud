import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private jwtService: JwtService, 
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username, true);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user; 
      return result;  
    }
    return null; 
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id }; 
    return {
      access_token: this.jwtService.sign(payload),  
    };
  }
}
