import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailNotConfirmedException extends HttpException {
  constructor(
    message = "Email address not confirmed",
    error = "EmailNotConfirmed"
  ) {
    super({ message, error }, HttpStatus.UNAUTHORIZED);
  }
}
