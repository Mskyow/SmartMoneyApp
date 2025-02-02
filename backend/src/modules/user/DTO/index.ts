import { IsString } from "class-validator";

export class createUserDTO {
    @IsString()
    username: string 
    @IsString()
    email : string
    @IsString()
    password: string
}