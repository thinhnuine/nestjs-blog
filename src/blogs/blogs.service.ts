import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { User } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"
import { CreateBlogDto } from "./dto/create-blog.dto"
import { UpdateBlogDto } from "./dto/update-blog.dto"

@Injectable()
export class BlogsService {
  constructor(private prismaService: PrismaService) {}
  create(createBlogDto: CreateBlogDto) {
    return this.prismaService.blog.create({ data: createBlogDto })
  }

  findAll(author_id?: string) {
    return this.prismaService.blog.findMany({ where: { authorId: author_id } })
  }

  async findOne(id: string) {
    const blog = await this.prismaService.blog.findUnique({ where: { id } })
    if (!blog) {
      throw new HttpException("The blog you're looking for doesn't exist", HttpStatus.NOT_FOUND)
    }
    return blog
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, user: User) {
    const blog = await this.prismaService.blog.findUnique({ where: { id } })
    if (!blog) {
      throw new HttpException("The blog you're looking for doesn't exist", HttpStatus.NOT_FOUND)
    }
    if (user.id !== blog.authorId) {
      throw new HttpException("The blog doesn't belong to you", HttpStatus.FORBIDDEN)
    }
    return this.prismaService.blog.update({
      data: updateBlogDto,
      where: { id },
    })
  }

  async remove(id: string, user: User) {
    const blog = await this.prismaService.blog.findUnique({ where: { id } })
    if (!blog) {
      throw new HttpException("The blog you're looking for doesn't exist", HttpStatus.NOT_FOUND)
    }
    if (user.id !== blog.authorId) {
      throw new HttpException("The blog doesn't belong to you", HttpStatus.FORBIDDEN)
    }
    return this.prismaService.blog.delete({ where: { id } })
  }
}
