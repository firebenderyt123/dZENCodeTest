import { Injectable } from '@nestjs/common';
import { AuthService as AuthenticationService } from 'src/app/auth/auth.service';

@Injectable()
export class AuthService {
  constructor(private authService: AuthenticationService) {}

  validateToken() {
    this;
  }
}
