import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateUserDto {
  @IsNotEmpty({
    message: "Name is required",
  })
  @IsString()
  name: string

  @IsEmail()
  @IsNotEmpty({ message: "Email is required" })
  email: string

  @IsString()
  @MinLength(5, {
    message: "Password is too short. Minimal length is $constraint1 characters",
  })
  password: string
}
