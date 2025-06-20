export interface BlogPost {
  _id?: string;
  title: string;
  content: string; // Markdown content
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  readingTime: number; // in minutes
  published: boolean;
}

export interface CreateBlogPost {
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  published: boolean;
} 