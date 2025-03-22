import { Body, Controller, Post } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';

@Controller('subscribe')
export class SubscribeController {
constructor(private readonly subscriptionService : SubscribeService){}


    @Post('subscribe')
    async subscribe(@Body() body: { userId: number, walletAddress: string }) {
    const { userId, walletAddress } = body;
    await this.subscriptionService.create(userId, walletAddress);
    return { message: 'Subscribed successfully' };
}
}
