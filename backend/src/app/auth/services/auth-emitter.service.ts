import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AUTH_EVENTS } from '../enums/auth.enum';

@Injectable()
export class AuthEventEmitterService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async notAuthenticated() {
    await this.eventEmitter.emitAsync(AUTH_EVENTS.AUTH_FAILED);
  }
}
