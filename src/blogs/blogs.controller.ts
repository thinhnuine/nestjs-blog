import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { JwtGuard } from "src/auth/guards/jwt-auth.guard"
import { Me } from "src/auth/me.decorator"
import { BlogsService } from "./blogs.service"
import { CreateBlogDto } from "./dto/create-blog.dto"
import { UpdateBlogDto } from "./dto/update-blog.dto"

@Controller("blogs")
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Me() me, @Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create({ ...createBlogDto, authorId: me.id })
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
  update(@Param("id") id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto)
  }

  @Delete(":id")
  @UseGuards(JwtGuard)
  remove(@Param("id") id: string) {
    return this.blogsService.remove(id)
  }
}
