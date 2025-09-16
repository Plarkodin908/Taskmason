export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface User {
  id: number;
  name: string;
  bio?: string;
  avatar?: {
    url: string;
  };
}

export interface Purchase {
  id: number;
  users_permissions_user: {
    id: number;
  };
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  status?: "Published" | "Draft" | "Pending Approval";
  featured?: boolean;
  categories?: Category[] | null;
  videoURL?: string;
  aiSummary?: {
    content: string;
    keywords?: string[];
  };
  duration?: number;
  level?: "Beginner" | "Intermediate" | "Advanced";
  language?: "English" | "French" | "Arabic" | "Spanish" | "Portuguese";
  thumbnail?: {
    url: string;
  } | null;
  AIQuizQuestions?: {
    question: string;
    answers: string[];
    correctAnswer: number;
  }[];
  creator?: User | null;
  purchases?: Purchase[] | null;
  courseID?: string;
}