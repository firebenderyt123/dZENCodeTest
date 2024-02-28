import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AUTH_EVENTS } from '../enums/auth.enum';
import { AuthGateway } from '../gateways/auth.gateway';

@Injectable()
export class AuthEventListenerService {
  constructor(private readonly authGateway: AuthGateway) {}

  @OnEvent(AUTH_EVENTS.AUTH_FAILED)
  onAuthFailed() {
    this.authGateway.authFailed('Not authenticated');
  }
}
