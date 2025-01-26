import { Injectable } from "@nestjs/common";
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    // Check if the Authorization header is present
    if (!authHeader) {
      throw new UnauthorizedException("Authorization header is missing");
    }

    // Check if the Authorization header has the correct format (Bearer <token>)
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }

    // Optionally, you can attach the token to the request if needed for further use
    request.token = token;

    return true; // If everything is okay, allow the request to continue
  }
}
