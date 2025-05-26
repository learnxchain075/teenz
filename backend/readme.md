# API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL](#base-url)
4. [Response Format](#response-format)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Endpoints](#endpoints)
   - [Authentication](#authentication-endpoints)
   - [Users](#user-endpoints)
   - [Students](#student-endpoints)
   - [Teachers](#teacher-endpoints)
   - [Courses](#course-endpoints)
   - [Hostel](#hostel-endpoints)
   - [Library](#library-endpoints)
   - [Transport](#transport-endpoints)
   - [Accounts](#accounts-endpoints)
8. [Webhooks](#webhooks)
9. [SDK Examples](#sdk-examples)
10. [Best Practices](#best-practices)

## Overview

The Educational Dashboard API provides a comprehensive set of endpoints for managing educational institutions. This RESTful API supports JSON format and uses standard HTTP methods and status codes.

### API Versioning
```
https://api.edu-dashboard.com/v1/
```
ss

### Supported Formats
- Request: `application/json`
- Response: `application/json`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

### Token Management

```typescript
interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: "Bearer";
}
```

### Role-Based Access Control
```typescript
type Role = "super_admin" | "admin" | "teacher" | "student" | "parent";

interface Permission {
  resource: string;
  actions: ("create" | "read" | "update" | "delete")[];
}
```

## Base URL

Production: `https://api.edu-dashboard.com/v1`
Staging: `https://staging-api.edu-dashboard.com/v1`
Development: `https://dev-api.edu-dashboard.com/v1`

## Response Format

All responses follow this standard format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
  };
}
```

## Error Handling

### Error Codes
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Validation Error
- `429`: Too Many Requests
- `500`: Internal Server Error

### Error Response Example
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": {
      "email": ["Email is required", "Must be a valid email"],
      "password": ["Password must be at least 8 characters"]
    }
  }
}
```

## Rate Limiting

- Rate limit: 1000 requests per hour
- Headers included in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## Endpoints

### Authentication Endpoints

#### Login
```http
POST /auth/login
```

Request:
```typescript
interface LoginRequest {
  email: string;
  password: string;
  department?: string;
}
```

Response:
```typescript
interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
}
```

#### Refresh Token
```http
POST /auth/refresh
```

Request:
```typescript
interface RefreshRequest {
  refresh_token: string;
}
```

### User Endpoints

#### Get User Profile
```http
GET /users/me
```

Response:
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  avatar?: string;
  settings: {
    notifications: boolean;
    theme: "light" | "dark";
  };
}
```

#### Update User Profile
```http
PATCH /users/me
```

Request:
```typescript
interface UpdateProfileRequest {
  name?: string;
  email?: string;
  avatar?: string;
  settings?: {
    notifications?: boolean;
    theme?: "light" | "dark";
  };
}
```

### Student Endpoints

#### List Students
```http
GET /students
```

Query Parameters:
```typescript
interface StudentListParams {
  page?: number;
  per_page?: number;
  search?: string;
  grade?: string;
  section?: string;
  sort_by?: "name" | "grade" | "created_at";
  order?: "asc" | "desc";
}
```

Response:
```typescript
interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  section: string;
  roll_number: string;
  admission_date: string;
  parent_details: {
    name: string;
    contact: string;
    email: string;
  };
  academic_details: {
    attendance: number;
    performance: number;
  };
}
```

#### Create Student
```http
POST /students
```

Request:
```typescript
interface CreateStudentRequest {
  name: string;
  email: string;
  grade: string;
  section: string;
  roll_number: string;
  parent_details: {
    name: string;
    contact: string;
    email: string;
  };
}
```

### Hostel Endpoints

#### List Rooms
```http
GET /hostel/rooms
```

Query Parameters:
```typescript
interface RoomListParams {
  block?: string;
  status?: "available" | "occupied" | "maintenance";
  type?: "single" | "double" | "dormitory";
  page?: number;
  per_page?: number;
}
```

Response:
```typescript
interface Room {
  id: string;
  number: string;
  block: string;
  type: "single" | "double" | "dormitory";
  capacity: number;
  occupied: number;
  status: "available" | "occupied" | "maintenance";
  amenities: string[];
  occupants?: {
    id: string;
    name: string;
    student_id: string;
  }[];
}
```

#### Allocate Room
```http
POST /hostel/rooms/{room_id}/allocate
```

Request:
```typescript
interface RoomAllocationRequest {
  student_id: string;
  check_in_date: string;
  check_out_date?: string;
  comments?: string;
}
```

### Library Endpoints

#### Search Books
```http
GET /library/books/search
```

Query Parameters:
```typescript
interface BookSearchParams {
  query: string;
  category?: string;
  author?: string;
  status?: "available" | "borrowed";
  page?: number;
  per_page?: number;
}
```

Response:
```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher: string;
  publish_year: number;
  copies: number;
  available_copies: number;
  location: string;
  cover_image?: string;
  status: "available" | "borrowed";
}
```

#### Borrow Book
```http
POST /library/books/{book_id}/borrow
```

Request:
```typescript
interface BorrowBookRequest {
  student_id: string;
  borrow_date: string;
  return_date: string;
}
```

### Transport Endpoints

#### List Routes
```http
GET /transport/routes
```

Response:
```typescript
interface Route {
  id: string;
  name: string;
  vehicle: {
    id: string;
    number: string;
    type: string;
    capacity: number;
  };
  driver: {
    id: string;
    name: string;
    contact: string;
  };
  stops: {
    id: string;
    name: string;
    time: string;
    sequence: number;
  }[];
  schedule: {
    departure: string;
    arrival: string;
    days: string[];
  };
}
```

#### Track Vehicle
```http
GET /transport/vehicles/{vehicle_id}/location
```

Response:
```typescript
interface VehicleLocation {
  vehicle_id: string;
  latitude: number;
  longitude: number;
  speed: number;
  timestamp: string;
  next_stop: {
    name: string;
    eta: string;
  };
}
```

### Accounts Endpoints

#### Get Fee Details
```http
GET /accounts/fees/{student_id}
```

Response:
```typescript
interface FeeDetails {
  student_id: string;
  total_amount: number;
  paid_amount: number;
  pending_amount: number;
  due_date: string;
  status: "paid" | "pending" | "overdue";
  installments: {
    id: string;
    amount: number;
    due_date: string;
    status: "paid" | "pending" | "overdue";
    payment_date?: string;
    transaction_id?: string;
  }[];
}
```

#### Make Payment
```http
POST /accounts/payments
```

Request:
```typescript
interface PaymentRequest {
  student_id: string;
  amount: number;
  payment_method: "card" | "bank_transfer" | "cash";
  reference?: string;
  description?: string;
}
```

## Webhooks

### Available Events
- `student.created`
- `student.updated`
- `payment.success`
- `payment.failed`
- `book.borrowed`
- `book.returned`
- `room.allocated`
- `room.vacated`

### Webhook Format
```typescript
interface WebhookPayload {
  event: string;
  timestamp: string;
  data: any;
  signature: string;
}
```

## SDK Examples

### JavaScript/TypeScript
```typescript
import { EduDashboardClient } from '@edu-dashboard/sdk';

const client = new EduDashboardClient({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Authentication
const { user, token } = await client.auth.login({
  email: 'user@example.com',
  password: 'password123'
});

// Fetch students
const students = await client.students.list({
  grade: '10',
  section: 'A',
  page: 1,
  per_page: 20
});

// Allocate hostel room
const allocation = await client.hostel.allocateRoom({
  roomId: 'room_123',
  studentId: 'student_456',
  checkInDate: '2024-03-20'
});
```

## Best Practices

### 1. Rate Limiting
- Implement exponential backoff for failed requests
- Cache responses when appropriate
- Batch requests when possible

### 2. Error Handling
```typescript
try {
  const response = await client.students.create(data);
  // Handle success
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    // Handle validation errors
  } else if (error.code === 'UNAUTHORIZED') {
    // Handle authentication errors
  } else {
    // Handle other errors
  }
}
```

### 3. Authentication
- Securely store tokens
- Implement token refresh mechanism
- Handle token expiration gracefully

### 4. Data Validation
- Validate input before sending requests
- Handle response validation
- Implement proper type checking

### 5. Security
- Use HTTPS for all requests
- Implement proper CORS headers
- Validate webhook signatures
- Implement request signing for sensitive operations

### 6. Performance
- Implement response caching
- Use pagination for large datasets
- Optimize request payloads
- Monitor API usage and response times

### 7. Versioning
- Include API version in URL
- Maintain backward compatibility
- Document breaking changes
- Provide migration guides

### 8. Testing
- Test all endpoints with various scenarios
- Validate response formats
- Test error handling
- Implement integration tests

### 9. Monitoring
- Track API usage
- Monitor error rates
- Set up alerts for critical issues
- Analyze performance metrics

### 10. Documentation
- Keep documentation up to date
- Provide clear examples
- Document all parameters
- Include error scenarios