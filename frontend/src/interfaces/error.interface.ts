export interface ErrorResponse {
  message: string | Array<InsideMessageObject>;
  error?: string;
  statusCode: number;
}

export interface ErrorData {
  message: string;
  statusCode: number;
}

interface InsideMessageObject {
  property: string;
  message: string;
}
