import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-minimal';
import { parseUploadedFiles, validateFiles } from '../utils/files.utils';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InternalServerError } from '../models/app-error.model';

@Injectable()
export class UloadsValidationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    const files: FileUpload[] = ctx.req.body.variables.files.map(
      (upload: { promise: Promise<FileUpload> }) => upload.promise,
    );

    try {
      const parsedFiles = await parseUploadedFiles(files);
      const validFiles = validateFiles(parsedFiles);

      ctx.req.body.validFiles = validFiles;

      return true;
    } catch (error) {
      throw new InternalServerError('Files uploading failed');
    }
  }
}
