export interface ErrorResponse {
  message: string | Array<{ [key: number]: { message: string } }>;
  error?: string;
  statusCode: number;
}
