import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserLoginDTO {
  @ApiProperty({ 
    description: 'User`s email address for login', 
    example: 'user@example.com',
    format: 'email', 
    required: true
  })
  @IsString()
  @IsEmail() 
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password for login',
    example: 'Str0ngP@ssw0rd',
    minLength: 8, 
    required: true,
    format: 'password' 
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
