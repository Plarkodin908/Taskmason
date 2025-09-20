// src/services/strapiApi.ts
// Service to handle Strapi API calls

// API configuration from environment variables
const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || '';

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}

// User interfaces
interface User {
  id: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  bio?: string;
  membership?: string;
}

interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
}

interface UserProfileData {
  username?: string;
  email?: string;
  bio?: string;
  avatar?: string;
}

// Course interfaces
interface Course {
  purchases: any;
  id: string;
  title: string;
  description: string;
  price: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  creator: Creator;
  image?: string;
  chapters: Chapter[];
  PaddleProductID?: string; // Added PaddleProductID field
}

interface CourseData {
  title: string;
  description: string;
  price: number;
  category: string;
  creator: string;
  image?: string;
  PaddleProductID?: string; // Added PaddleProductID field
}

// Chapter interfaces
interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  course: Course;
}

// Ebook interfaces
interface Ebook {
  access?: string;
  id: string;
  title: string;
  description: string;
  price: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  creator: Creator;
  fileUrl: string;
  coverImage?: string;
  PaddleProductID?: string; // Added PaddleProductID field
}

interface EbookData {
  title: string;
  description: string;
  price: number;
  category: string;
  creator: string;
  fileUrl: string;
  coverImage?: string;
  PaddleProductID?: string; // Added PaddleProductID field
}

// Category interfaces
interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Creator interfaces
interface Creator {
  id: string;
  name: string;
  bio: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  user: User;
}

// Purchase interfaces
interface Purchase {
  id: string;
  status: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  course?: Course;
  ebook?: Ebook;
}

interface PurchaseData {
  course?: string;
  ebook?: string;
}

// Payout interfaces
interface Payout {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface PayoutData {
  amount: number;
  method: string;
  details: Record<string, unknown>;
}

// Message interfaces
interface Message {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  sender: User;
  recipient: User;
}

interface MessageData {
  content: string;
  recipient: string;
}

// Auth interfaces
interface AuthResponse {
  user: User;
  jwt: string;
}

class StrapiApiService {
  private baseUrl: string;
  private apiToken: string;

  constructor() {
    this.baseUrl = STRAPI_API_URL;
    this.apiToken = STRAPI_API_TOKEN;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.apiToken) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed');
    }

    // If T is StrapiResponse, return the data property which contains the actual data
    if (data && typeof data === 'object' && 'data' in data && 'meta' in data) {
      return data as T;
    }

    return data as T;
  }

  // Authentication endpoints
  async login(identifier: string, password: string): Promise<StrapiResponse<AuthResponse>> {
    const response = await fetch(`${this.baseUrl}/api/auth/local`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ identifier, password }),
    });

    return this.handleResponse<StrapiResponse<AuthResponse>>(response);
  }

  async register(username: string, email: string, password: string): Promise<StrapiResponse<AuthResponse>> {
    const response = await fetch(`${this.baseUrl}/api/auth/local/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ username, email, password }),
    });

    return this.handleResponse<StrapiResponse<AuthResponse>>(response);
  }

  // User endpoints
  async getUser(id: string): Promise<StrapiResponse<User>> {
    const response = await fetch(`${this.baseUrl}/api/users/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<User>>(response);
  }

  async updateUser(id: string, data: UserProfileData): Promise<StrapiResponse<User>> {
    const response = await fetch(`${this.baseUrl}/api/users/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ data }),
    });

    return this.handleResponse<StrapiResponse<User>>(response);
  }

  // Course endpoints
  async getCourses(): Promise<StrapiResponse<Course[]>> {
    const response = await fetch(`${this.baseUrl}/api/courses`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Course[]>>(response);
  }

  async getCourse(id: string): Promise<StrapiResponse<Course>> {
    const response = await fetch(`${this.baseUrl}/api/courses/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Course>>(response);
  }

  async createCourse(data: CourseData): Promise<StrapiResponse<Course>> {
    const response = await fetch(`${this.baseUrl}/api/courses`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ data }),
    });

    return this.handleResponse<StrapiResponse<Course>>(response);
  }

  async updateCourse(id: string, data: CourseData): Promise<StrapiResponse<Course>> {
    const response = await fetch(`${this.baseUrl}/api/courses/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ data }),
    });

    return this.handleResponse<StrapiResponse<Course>>(response);
  }

  // Ebook endpoints
  async getEbooks(): Promise<StrapiResponse<Ebook[]>> {
    const response = await fetch(`${this.baseUrl}/api/ebooks`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Ebook[]>>(response);
  }

  async getEbook(id: string): Promise<StrapiResponse<Ebook>> {
    const response = await fetch(`${this.baseUrl}/api/ebooks/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Ebook>>(response);
  }

  async createEbook(data: EbookData): Promise<StrapiResponse<Ebook>> {
    const response = await fetch(`${this.baseUrl}/api/ebooks`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ data }),
    });

    return this.handleResponse<StrapiResponse<Ebook>>(response);
  }

  // Category endpoints
  async getCategories(): Promise<StrapiResponse<Category[]>> {
    const response = await fetch(`${this.baseUrl}/api/categories`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Category[]>>(response);
  }

  // Creator endpoints
  async getCreators(): Promise<StrapiResponse<Creator[]>> {
    const response = await fetch(`${this.baseUrl}/api/creators`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Creator[]>>(response);
  }

  async getCreator(id: string): Promise<StrapiResponse<Creator>> {
    const response = await fetch(`${this.baseUrl}/api/creators/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Creator>>(response);
  }

  // Purchase endpoints
  async getPurchases(): Promise<StrapiResponse<Purchase[]>> {
    const response = await fetch(`${this.baseUrl}/api/purchases`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Purchase[]>>(response);
  }

  async getPurchase(id: string): Promise<StrapiResponse<Purchase>> {
    const response = await fetch(`${this.baseUrl}/api/purchases/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Purchase>>(response);
  }

  async createPurchase(data: PurchaseData): Promise<StrapiResponse<Purchase>> {
    const response = await fetch(`${this.baseUrl}/api/purchases`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ data }),
    });

    return this.handleResponse<StrapiResponse<Purchase>>(response);
  }

  // Payout endpoints
  async getPayouts(): Promise<StrapiResponse<Payout[]>> {
    const response = await fetch(`${this.baseUrl}/api/payouts`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Payout[]>>(response);
  }

  async getPayout(id: string): Promise<StrapiResponse<Payout>> {
    const response = await fetch(`${this.baseUrl}/api/payouts/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Payout>>(response);
  }

  async createPayout(data: PayoutData): Promise<StrapiResponse<Payout>> {
    const response = await fetch(`${this.baseUrl}/api/payouts`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ data }),
    });

    return this.handleResponse<StrapiResponse<Payout>>(response);
  }

  // Message endpoints
  async getMessages(): Promise<StrapiResponse<Message[]>> {
    const response = await fetch(`${this.baseUrl}/api/messages`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Message[]>>(response);
  }

  async getMessage(id: string): Promise<StrapiResponse<Message>> {
    const response = await fetch(`${this.baseUrl}/api/messages/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<StrapiResponse<Message>>(response);
  }

  async createMessage(data: MessageData): Promise<StrapiResponse<Message>> {
    const response = await fetch(`${this.baseUrl}/api/messages`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ data }),
    });

    return this.handleResponse<StrapiResponse<Message>>(response);
  }
}

export default new StrapiApiService();