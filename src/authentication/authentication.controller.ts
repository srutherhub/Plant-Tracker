import { Post, Body, Controller } from "@nestjs/common";
import { AuthenticationService } from "../authentication/authentication.service";

@Controller("authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("signup")
  async signUp(@Body() body: { email: string; password: string }) {
    return this.authenticationService.signUp(body.email, body.password);
  }

  @Post("signin")
  async signIn(@Body() body: { email: string; password: string }) {
    return this.authenticationService.signIn(body.email, body.password);
  }

  @Post("user")
  async getUser() {
    return this.authenticationService.getUser();
  }

  @Post("signout")
  async signOut() {
    return this.authenticationService.signOut();
  }
}
