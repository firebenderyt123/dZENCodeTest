import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventEmitterService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitEvent(eventName: string, data: any) {
    await this.eventEmitter.emitAsync(eventName, data);
  }
}
