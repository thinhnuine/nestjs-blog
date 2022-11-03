import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto })
  }

  findAll(name: string, limit: number, status: string) {
    if (status && status === "deleted") {
      return this.prismaService.user.findMany({ where: { name: { contains: name }, NOT: { deletedAt: null } }, take: limit })
    }
    return this.prismaService.user.findMany({ where: { name: { contains: name } }, take: limit })
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } })
    if (!user) {
      throw new HttpException("The user you're looking for doesn't exist", HttpStatus.NOT_FOUND)
    }
    return user
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    if (!user) {
      throw new HttpException("The user you're looking for doesn't exist", HttpStatus.NOT_FOUND)
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({ where: { id } })
    if (!user) {
      throw new HttpException("The user you're looking for doesn't exist", HttpStatus.NOT_FOUND)
    }
    const passwordHash = await bcrypt.hash(updateUserDto.password, 10)
    return this.prismaService.user.update({ data: { ...updateUserDto, password: passwordHash }, where: { id } })
  }

  async remove(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } })
    if (!user) {
      throw new HttpException("The user you're looking for doesn't exist", HttpStatus.NOT_FOUND)
    }
    this.prismaService.user.update({ data: { deletedAt: new Date(Date.now()) }, where: { id } })
  }
}
