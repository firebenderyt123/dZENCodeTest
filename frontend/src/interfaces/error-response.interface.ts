export interface ErrorResponse {
  message: string | Array<InsideMessageObject>;
  error?: string;
  statusCode: number;
}

export interface Error {
  message: string;
  error?: string;
  statusCode: number;
}

interface InsideMessageObject {
  property: string;
  message: string;
}
