import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
      apiKey?: {
        keyId: string;
        projectId: string;
        name: string;
      };
    }
  }
}

export {};
