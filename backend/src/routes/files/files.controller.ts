import { FastifyReply } from 'fastify';
import { Controller } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
}
