import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './DTO';
import { JWTStrategy } from 'src/strategy';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('subscriptions')
export class SubscriptionController {
constructor(private readonly subscriptionService : SubscriptionService){}

    @UseGuards(JwtAuthGuard)
    @Post('subscribe')
    async subscribe(@Body() createSubscriptionDto : CreateSubscriptionDto,
                    @Req() request ,
) {
        const userId: number = request?.user?.id as number;
        const subscription = await this.subscriptionService.create(userId,createSubscriptionDto);
        return { 
          message: 'Subscribed successfully',
          subscription 
        };
    }

    @Delete(':id')
    async unsubscribe(@Param('id') id: number) {
      await this.subscriptionService.remove(id);
      return { message: 'Unsubscribed successfully' };
    }

    @Put(':id')
    async updateSubscription(
        @Param('id') id: number,
        @Body() updateSubscriptionDto: UpdateSubscriptionDto
    ) {
        const subscription = await this.subscriptionService.update(id, updateSubscriptionDto);
        return {
        message: 'Subscription updated successfully',
        subscription
        };
    }

    @Get('user/:userId')
    async getUserSubscriptions(@Param('userId') userId: number) {
        return this.subscriptionService.findByUserId(userId);
    }

    @Get('wallet/:walletAddress')
    async getSubscriptionsForWallet(@Param('walletAddress') walletAddress: string) {
        return this.subscriptionService.findByWalletAddress(walletAddress);
    }
}
