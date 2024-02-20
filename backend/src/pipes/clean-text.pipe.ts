import { PipeTransform, Injectable } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class CleanTextPipe implements PipeTransform<string, string> {
  private readonly allowedTags = ['a', 'code', 'i', 'strong'];
  private readonly allowedSchemes = ['http', 'https', 'ftp'];

  transform(text: string): string {
    const cleanText = sanitizeHtml(text, {
      allowedTags: this.allowedTags,
      allowedAttributes: {
        a: ['href', 'title'],
      },
      allowedSchemes: this.allowedSchemes,
      disallowedTagsMode: 'discard',
      nestingLimit: 4,
    });

    return cleanText;
  }
}
