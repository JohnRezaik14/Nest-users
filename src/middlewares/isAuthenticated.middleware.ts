import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class isAuthenticatedMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) {
      throw new UnauthorizedException('You have to login first');
    }

    const token = bearerToken?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('You have to login first');
    }
    try {
      const payload = jwt.verify(
        token,
        this.configService.getOrThrow<string>('JWT_SECRET'),
      );
      req['email'] = payload['sub'];
    } catch (error) {
      throw new UnauthorizedException('You have to login first');
    }

    next();
  }
}
