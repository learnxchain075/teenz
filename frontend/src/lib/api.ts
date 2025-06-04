// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

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
      console.log('Fetching from:', `${API_URL}${endpoint}`);
      const response = await fetch(`${API_URL}${endpoint}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new APIError(
          `API request failed with status ${response.status}`,
          response.status,
          errorData
        );
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.error('API Error:', error);
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