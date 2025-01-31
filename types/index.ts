export type User = {
  id: string;
  name: string;
  email: string;
  role: "visitor" | "leader";
  points: {
    [projectId: string]: {
      available: number;
      total: number;
    };
  };
  maxPoints: number;
  createdAt: Date;
  updatedAt: Date;
  appliedSessions: Opportunity[];
  invitations: Invitation[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  location: {
    prefecture: string;
    city: string;
    address: string;
  };
  members: {
    id: string;
    name: string;
    title: string;
    image?: string;
  }[];
  socialLinks?: {
    type: "twitter" | "instagram" | "facebook" | "website" | "youtube";
    url: string;
  }[];
  opportunities: Opportunity[];
  createdAt: Date;
  updatedAt: Date;
};

export type Opportunity = {
  id: string;
  title: string;
  description: string;
  type: "EVENT" | "QUEST";
  status: "open" | "in_progress" | "closed";
  projectId: string;
  hostId: string;
  startsAt: string;
  endsAt: string;
  createdAt: Date;
  updatedAt: Date;
  host: {
    name: string;
    image: string;
    title: string;
    bio: string;
  };
  image: string;
  location: {
    name: string;
    address: string;
    isOnline: boolean;
    meetingUrl?: string;
  };
  project?: {
    title: string;
    description: string;
    icon: string;
  };
  recommendedFor: string[];
  relatedArticles?: RelatedArticle[];
  capacity: number;
  pointsForComplete?: number;
  pointsForJoin?: number;
  participants: Participant[];
};

export type Invitation = {
  id: string;
  opportunityId: string;
  hostMessage: string;
  requiredPoints: number;
  createdAt: Date;
};

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  read: boolean;
};

export type Notification = {
  id: string;
  userId: string;
  content: string;
  read: boolean;
  createdAt: Date;
};

export type Participant = {
  id: string;
  name: string;
  image?: string;
};

export type RelatedArticle = {
  title: string;
  url: string;
  type: "interview" | "article";
  image?: string;
  description?: string;
  publishedAt: string;
};
