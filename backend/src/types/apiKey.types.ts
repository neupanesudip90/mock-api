// ============================================================================
// Input Types
// ============================================================================
export interface CreateApiKeyInput {
  name: string;
}

export interface UpdateApiKeyInput {
  name?: string;
  isActive?: boolean;
}

// ============================================================================
// Response Types
// ============================================================================
export interface ApiKeyResponse {
  id: string;
  projectId: string;
  name: string;
  keyPrefix: string;
  isActive: boolean;
  lastUsedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiKeyWithSecret extends ApiKeyResponse {
  plainKey: string; // Only returned on creation
}

export interface ApiKeyListResponse {
  apiKeys: ApiKeyResponse[];
  total: number;
}

// ============================================================================
// Validation Result (for middleware)
// ============================================================================
export interface ValidatedApiKey {
  keyId: string;
  projectId: string;
  name: string;
}
