import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UpdateUserDto } from "./dto/update-user.dto"
import { JwtGuard } from "src/auth/guards/jwt-auth.guard"
import { ListQueryUser } from "./dto/list-query.dto"
import { CreateUserDto } from "./dto/create-user.dto"
import { Roles } from "src/auth/decorator/roles.decorator"
import { Role } from "@prisma/client"
import { RolesGuard } from "src/auth/guards/roles.guard"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Query() query: ListQueryUser) {
    return this.usersService.findAll(query.name, query.limit, query.status)
  }

  @Get(":id")
  @UseGuards(JwtGuard)
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(":id")
  @UseGuards(JwtGuard)
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(":id")
  @UseGuards(JwtGuard)
  remove(@Param("id") id: string) {
    return this.usersService.remove(id)
  }
}
