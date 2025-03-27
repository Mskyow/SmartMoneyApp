import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateSubscriptionDto {
  
  @IsString()
  readonly walletAddress: string;
  
  @IsBoolean()
  readonly notifyOnBalanceChange?: boolean = false;
  
  @IsBoolean()
  readonly notifyOnNewTransaction?: boolean = false;
  }
  
  export class UpdateSubscriptionDto {
    readonly notifyOnBalanceChange?: boolean;
    readonly notifyOnNewTransaction?: boolean;
  }