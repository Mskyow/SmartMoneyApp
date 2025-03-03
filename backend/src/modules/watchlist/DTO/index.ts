import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'src/modules/user/models/user.model';

export class AddressDTO {
  @ApiProperty()
  @IsString()
  account_address: string;

  @ApiProperty()
  @IsString()
  account_name?: string;

  @ApiProperty()
  @IsString()
  account_image?: string;

  @ApiProperty()
  user: User;
}
export class addAddressDTO {
  @ApiProperty()
  @IsString()
  account_address: string;

  @ApiProperty()
  @IsString()
  account_name?: string;

  @ApiProperty()
  @IsString()
  account_image?: string;
}

export class deleteAddressDTO {
  @ApiProperty()
  @IsString()
  account_address: string;
}

export class updateAddressImgDTO {
  @ApiProperty()
  @IsString()
  account_address: string;

  @ApiProperty()
  @IsString()
  new_account_image: string;
}

export class updateAddressNameDTO {
  @ApiProperty()
  @IsString()
  account_address: string;

  @ApiProperty()
  @IsString()
  new_account_name: string;
}

export class updateAddressDTO {
  @ApiProperty()
  @IsString()
  account_address: string;
  @ApiProperty()
  @IsString()
  new_account_name?: string; // Опциональное поле
  @ApiProperty()
  @IsString()
  new_account_image?: string; // Опциональное поле
}
