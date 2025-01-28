export type User = {
  id: string
  name: string
  email: string
  role: "visitor" | "leader"
  createdAt: Date
  updatedAt: Date
}

export type Project = {
  id: string
  title: string
  description: string
  categories: Category[]
  skills: Skill[]
  createdAt: Date
  updatedAt: Date
  opportunities: Opportunity[]
  icon: string
}

export type Opportunity = {
  id: string
  title: string
  description: string
  status: "open" | "in_progress" | "closed"
  projectId: string
  hostId: string
  durationMinutes: 30 | 60 | 90
  categories: Category[]
  skills: Skill[]
  createdAt: Date
  updatedAt: Date
  host: {
    name: string
    image: string
  }
  image: string
  project?: {
    title: string
    description: string
    icon: string
  }
  relatedArticles?: {
    id: string
    title: string
    description: string
    image: string
    url: string
    source: {
      name: string
      icon: string
    }
  }[]
}

export type Skill = {
  id: string
  name: string
  description: string
}

export type Category = {
  id: string
  name: string
  description: string
}

export type Message = {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: Date
  read: boolean
}

export type Notification = {
  id: string
  userId: string
  content: string
  read: boolean
  createdAt: Date
}

