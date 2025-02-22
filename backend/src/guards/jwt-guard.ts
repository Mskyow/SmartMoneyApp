import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard is executing...');
    // const request = context.switchToHttp().getRequest();
    // const authHeader = request.headers.authorization;
    // const token = authHeader.split(' ')[1];
    // console.log(token)
   

    return super.canActivate(context);
  }
}
