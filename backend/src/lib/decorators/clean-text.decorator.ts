import { Transform } from 'class-transformer';
import { CleanTextPipe } from 'src/lib/pipes/clean-text.pipe';

export function CleanTextHTML() {
  return Transform(({ value }) => new CleanTextPipe().transform(value));
}
