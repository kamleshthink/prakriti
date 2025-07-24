// User Types
export interface User {
  _id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  website?: string;
  location?: string;
  isVerified: boolean;
  isPrivate: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  boardsCount: number;
  createdAt: Date;
  updatedAt: Date;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  preferences?: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
}

export interface UserProfile extends Omit<User, 'email'> {
  isFollowing?: boolean;
  isFollowedBy?: boolean;
  mutualFollowers?: number;
}

// Post Types
export interface Post {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  tags: string[];
  category: string;
  author: User;
  board?: Board;
  dimensions: {
    width: number;
    height: number;
  };
  colors: string[];
  likesCount: number;
  commentsCount: number;
  savesCount: number;
  viewsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    fileSize: number;
    format: string;
    duration?: number; // for videos
  };
}

export interface PostCreate {
  title: string;
  description?: string;
  tags: string[];
  category: string;
  boardId?: string;
  scheduledFor?: Date;
}

// Board Types
export interface Board {
  _id: string;
  name: string;
  description?: string;
  coverImage?: string;
  isPrivate: boolean;
  isCollaborative: boolean;
  owner: User;
  collaborators: User[];
  postsCount: number;
  followersCount: number;
  posts: Post[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardCreate {
  name: string;
  description?: string;
  isPrivate: boolean;
  isCollaborative: boolean;
}

// Comment Types
export interface Comment {
  _id: string;
  content: string;
  author: User;
  post: string;
  parent?: string;
  replies: Comment[];
  likesCount: number;
  isLiked?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentCreate {
  content: string;
  postId: string;
  parentId?: string;
}

// Notification Types
export interface Notification {
  _id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'board_invite' | 'post_save';
  title: string;
  message: string;
  data: Record<string, any>;
  recipient: string;
  sender?: User;
  isRead: boolean;
  createdAt: Date;
}

// Message Types
export interface Message {
  _id: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'file';
  sender: User;
  conversation: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  isRead: boolean;
  readBy: Array<{
    user: string;
    readAt: Date;
  }>;
  createdAt: Date;
}

export interface Conversation {
  _id: string;
  type: 'direct' | 'group';
  name?: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Search Types
export interface SearchFilters {
  type?: 'image' | 'video' | 'all';
  category?: string;
  tags?: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
  sortBy?: 'relevance' | 'recent' | 'popular';
  user?: string;
}

export interface SearchResult {
  posts: Post[];
  users: UserProfile[];
  boards: Board[];
  totalCount: number;
  hasMore: boolean;
}

// Analytics Types
export interface Analytics {
  views: number;
  likes: number;
  saves: number;
  comments: number;
  shares: number;
  impressions: number;
  clickThroughRate: number;
  engagementRate: number;
  topCountries: Array<{
    country: string;
    count: number;
  }>;
  topReferrers: Array<{
    source: string;
    count: number;
  }>;
  dailyStats: Array<{
    date: Date;
    views: number;
    likes: number;
    saves: number;
  }>;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  displayName: string;
  agreeToTerms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Upload Types
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface FileUpload {
  file: File;
  preview: string;
  progress: UploadProgress;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

// Category Types
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  postsCount: number;
  isActive: boolean;
}

// Tag Types
export interface Tag {
  _id: string;
  name: string;
  slug: string;
  postsCount: number;
  trending: boolean;
}

// Report Types
export interface Report {
  _id: string;
  type: 'post' | 'user' | 'comment';
  targetId: string;
  reason: string;
  description?: string;
  reporter: User;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  moderator?: User;
  moderatorNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Admin Types
export interface AdminStats {
  totalUsers: number;
  totalPosts: number;
  totalBoards: number;
  totalReports: number;
  activeUsers: number;
  newUsersToday: number;
  newPostsToday: number;
  storageUsed: number;
  bandwidthUsed: number;
}

// Socket Event Types
export interface SocketEvents {
  // Client to Server
  'join:conversation': { conversationId: string };
  'leave:conversation': { conversationId: string };
  'send:message': { conversationId: string; message: Omit<Message, '_id' | 'createdAt'> };
  'typing:start': { conversationId: string };
  'typing:stop': { conversationId: string };
  'notification:read': { notificationId: string };

  // Server to Client
  'message:new': { message: Message };
  'message:read': { messageId: string; userId: string };
  'notification:new': { notification: Notification };
  'user:typing': { userId: string; conversationId: string };
  'user:online': { userId: string };
  'user:offline': { userId: string };
}

// Error Types
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: ValidationError[];
}