import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { User } from "@prisma/client"
import { CreateUserDto } from "src/users/dto/create-user.dto"
import { UsersService } from "src/users/users.service"
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email)
    const isMatch = await bcrypt.compare(password, user.password)
    if (user && isMatch) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(createUserDto.email)
    if (user) {
      throw new HttpException("Email existed", HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const passwordHash = await bcrypt.hash(createUserDto.password, 10)
    const newUser = await this.usersService.create({ ...createUserDto, password: passwordHash })
    return { access_token: this.jwtService.sign(newUser) }
  }
}
