import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSubscriptionDto {
  
  @ApiProperty({ description: 'Solana wallet address(pubkey)', example: '2xWsiabXaaaaaaabbbWgKZ5SckEGqbbbbbbbQwHPaaaS' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly walletAddress: string;
  
  @ApiProperty()
  @IsBoolean()
  readonly notifyOnBalanceChange?: boolean = false;
  
  @ApiProperty()
  @IsBoolean()
  readonly notifyOnNewTransaction?: boolean = false;
  }
  
  export class UpdateSubscriptionDto {
    
    @ApiProperty()
    readonly notifyOnBalanceChange?: boolean;

    @ApiProperty()
    readonly notifyOnNewTransaction?: boolean;
  }