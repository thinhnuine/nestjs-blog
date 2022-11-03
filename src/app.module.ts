import { Module } from "@nestjs/common"
import { PrismaModule } from "./prisma/prisma.module"
import { UsersModule } from "./users/users.module"
import { BlogsModule } from "./blogs/blogs.module"
import { AuthModule } from "./auth/auth.module"

@Module({
  imports: [PrismaModule, UsersModule, BlogsModule, AuthModule],
})
export class AppModule {}
