export interface Client {
  id: string
  email: string
  full_name: string
  phone?: string
  company_name?: string
  avatar_url?: string
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Freelancer {
  id: string
  full_name: string
  email: string
  phone?: string
  avatar_url?: string
  title: string
  bio?: string
  hourly_rate?: number
  experience_years: number
  rating: number
  total_projects: number
  total_earnings: number
  is_available: boolean
  is_verified: boolean
  location?: string
  languages?: string[]
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  category: string
  created_at: string
}

export interface FreelancerSkill {
  id: string
  freelancer_id: string
  skill_id: string
  proficiency_level: "beginner" | "intermediate" | "advanced" | "expert"
  created_at: string
  skill?: Skill
}

export interface Category {
  id: string
  name: string
  description?: string
  icon?: string
  color?: string
  is_active: boolean
  created_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  category_id: string
  min_price: number
  max_price: number
  delivery_time_days: number
  features: string[]
  requirements?: string[]
  is_active: boolean
  created_at: string
  updated_at: string
  category?: Category
}

export interface ClientRequest {
  id: string
  client_id: string
  service_id?: string
  title: string
  description: string
  budget_min?: number
  budget_max?: number
  deadline?: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "assigned" | "in_progress" | "completed" | "cancelled"
  requirements?: string[]
  attachments?: string[]
  created_at: string
  updated_at: string
  client?: Client
  service?: Service
}

export interface FreelancerAssignment {
  id: string
  request_id: string
  freelancer_id: string
  assigned_by: string
  assigned_at: string
  status: "assigned" | "accepted" | "rejected" | "completed"
  estimated_completion?: string
  actual_completion?: string
  notes?: string
  request?: ClientRequest
  freelancer?: Freelancer
}

export interface Project {
  id: string
  assignment_id: string
  client_id: string
  freelancer_id: string
  title: string
  description?: string
  agreed_price: number
  status: "active" | "completed" | "cancelled" | "disputed"
  progress_percentage: number
  start_date: string
  deadline?: string
  completion_date?: string
  client_rating?: number
  client_feedback?: string
  created_at: string
  updated_at: string
  client?: Client
  freelancer?: Freelancer
}

export interface Message {
  id: string
  project_id: string
  sender_id: string
  sender_type: "client" | "freelancer"
  message: string
  attachments?: string[]
  is_read: boolean
  created_at: string
}

export interface Payment {
  id: string
  project_id: string
  client_id: string
  freelancer_id: string
  amount: number
  platform_fee: number
  freelancer_amount: number
  status: "pending" | "completed" | "failed" | "refunded"
  payment_method?: string
  transaction_id?: string
  paid_at?: string
  created_at: string
}

export interface Review {
  id: string
  project_id: string
  client_id: string
  freelancer_id: string
  rating: number
  comment?: string
  is_public: boolean
  created_at: string
  client?: Client
  freelancer?: Freelancer
}
