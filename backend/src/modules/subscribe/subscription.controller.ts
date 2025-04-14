import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './DTO';
import { JWTStrategy } from 'src/strategy';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
constructor(private readonly subscriptionService : SubscriptionService){}

    @ApiOperation({ summary: 'Create new subscription', description: 'Allows an authenticated user to subscribe to a wallet address.' })
    @ApiBody({ description: 'Data for creating a subscription', type: CreateSubscriptionDto }) 
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Subscription successfully created.', }) 
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Authorization error (JWT token is missing or invalid).' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data (DTO validation error).' }) 
    @UseGuards(JwtAuthGuard) 
    @UseGuards(JwtAuthGuard)
    @Post('subscribe')
    async subscribe(@Body() createSubscriptionDto : CreateSubscriptionDto,
                    @Req() request ,)
    {
        const userId: number = request?.user?.id as number;
        const subscription = await this.subscriptionService.create(userId,createSubscriptionDto);
        return { 
          message: 'Subscribed successfully',
          subscription 
        };
    }
    @ApiOperation({ summary: 'Delete subscription by ID', description: 'Deletes an existing subscription from a user.' })
    @ApiParam({ name: 'id', description: 'Unique subscription ID to delete', type: Number, example: 1 })
    @ApiResponse({ status: HttpStatus.OK, description: 'Subscription successfully deleted.' }) 
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Subscription with the specified ID not found.' }) 
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard) 
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
