import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AUTH_EVENTS } from '../enums/auth.enum';
import { AuthResponse } from '../models/auth-response.model';

@Injectable()
export class AuthEventEmitterService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async userRegistered(auth: AuthResponse) {
    await this.eventEmitter.emitAsync(AUTH_EVENTS.AUTH_REGISTER_SUCCESS, auth);
  }

  async notAuthenticated() {
    await this.eventEmitter.emitAsync(AUTH_EVENTS.AUTH_FAILED);
  }
}
