import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { User } from "@prisma/client"
import { AuthUser } from "src/auth/decorator/users.decorator"
import { JwtGuard } from "src/auth/guards/jwt-auth.guard"
import { BlogsService } from "./blogs.service"
import { CreateBlogDto } from "./dto/create-blog.dto"
import { UpdateBlogDto } from "./dto/update-blog.dto"

@Controller("blogs")
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@AuthUser() user: User, @Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create({ ...createBlogDto, authorId: user.id })
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Query("author_id") author_id: string) {
    return this.blogsService.findAll(author_id)
  }

  @Get(":id")
  @UseGuards(JwtGuard)
  findOne(@Param("id") id: string) {
    return this.blogsService.findOne(id)
  }

  @Patch(":id")
  @UseGuards(JwtGuard)
  update(@Param("id") id: string, @Body() updateBlogDto: UpdateBlogDto, @AuthUser() user: User) {
    return this.blogsService.update(id, updateBlogDto, user)
  }

  @Delete(":id")
  @UseGuards(JwtGuard)
  remove(@Param("id") id: string, @AuthUser() user: User) {
    return this.blogsService.remove(id, user)
  }
}
