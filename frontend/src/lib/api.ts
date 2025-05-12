// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const api = {
  get: async (endpoint: string) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new APIError(
          `API request failed with status ${response.status}`,
          response.status,
          errorData
        );
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(
        'Failed to fetch data from API',
        500,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  },
  
  post: async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new APIError(
          `API request failed with status ${response.status}`,
          response.status,
          errorData
        );
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(
        'Failed to post data to API',
        500,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  },

  put: async (endpoint: string, data: any) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new APIError(
          `API request failed with status ${response.status}`,
          response.status,
          errorData
        );
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(
        'Failed to update data in API',
        500,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  },

  delete: async (endpoint: string) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new APIError(
          `API request failed with status ${response.status}`,
          response.status,
          errorData
        );
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(
        'Failed to delete data from API',
        500,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  },
};