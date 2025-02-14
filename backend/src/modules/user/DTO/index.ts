import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class createUserDTO {
    @ApiProperty()
    @IsString()
    username: string 

    @ApiProperty()
    @IsString()
    email : string

    @ApiProperty()
    @IsString()
    password: string
}

export class updateUserDTO {
    @ApiProperty()
    @IsString()
    username: string 

    @ApiProperty()
    @IsString()
    email : string
}

