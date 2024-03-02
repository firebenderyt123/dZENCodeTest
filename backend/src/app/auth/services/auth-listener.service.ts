import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AUTH_EVENTS } from '../enums/auth.enum';
import { AuthResponse } from '../models/auth-response.model';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Injectable()
export class AuthEventListenerService {
  constructor() {}

  @OnEvent(AUTH_EVENTS.AUTH_REGISTER_SUCCESS)
  onRegistrationSuccess(auth: AuthResponse) {
    pubSub.publish(AUTH_EVENTS.AUTH_REGISTER_SUCCESS, auth);
  }

  @OnEvent(AUTH_EVENTS.AUTH_FAILED)
  onAuthFailed() {}
}
