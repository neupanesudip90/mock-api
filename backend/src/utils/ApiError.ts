//api error class to handle errors in a consistent way across the application
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true,
    public stackTrace?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const isApiError = (err: unknown): err is ApiError => {
  return err instanceof ApiError;
};
