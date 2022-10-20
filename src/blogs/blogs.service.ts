import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(private prismaService: PrismaService) {}
  create(createBlogDto: CreateBlogDto) {
    return this.prismaService.blog.create({data:createBlogDto})
  }

  findAll() {
   return this.prismaService.blog.findMany()
  }

  findOne(id: string) {
    return this.prismaService.blog.findUnique({where:{id}})
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    return this.prismaService.blog.update({data:updateBlogDto,where:{id}})
  }

  remove(id: string) {
    return this.prismaService.blog.delete({where:{id}})
  }
}
