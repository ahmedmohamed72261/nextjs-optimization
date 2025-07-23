// Mock database service without Supabase dependency

// Mock clients for development
export const supabase = null
export const supabaseAdmin = null

// Mock database service with sample data
export class DatabaseService {
  // Mock data
  private mockFreelancers = [
    {
      id: "1",
      full_name: "أحمد محمد",
      email: "ahmed@example.com",
      title: "مطور ويب متقدم",
      bio: "مطور ويب متخصص في React و Node.js",
      hourly_rate: 50,
      experience_years: 5,
      location: "الرياض، السعودية",
      languages: ["العربية", "الإنجليزية"],
      rating: 4.8,
      is_available: true,
      is_verified: true,
      freelancer_skills: [
        {
          proficiency_level: "expert",
          skill: { name: "React", category: "Frontend" }
        },
        {
          proficiency_level: "advanced",
          skill: { name: "Node.js", category: "Backend" }
        }
      ]
    },
    {
      id: "2",
      full_name: "فاطمة علي",
      email: "fatima@example.com",
      title: "مصممة UI/UX",
      bio: "مصممة واجهات مستخدم مبدعة",
      hourly_rate: 40,
      experience_years: 3,
      location: "جدة، السعودية",
      languages: ["العربية", "الإنجليزية"],
      rating: 4.9,
      is_available: true,
      is_verified: true,
      freelancer_skills: [
        {
          proficiency_level: "expert",
          skill: { name: "UI Design", category: "Design" }
        }
      ]
    }
  ];

  private mockServices = [
    {
      id: "1",
      title: "تطوير موقع ويب",
      description: "تطوير موقع ويب متجاوب باستخدام أحدث التقنيات",
      price: 1000,
      is_active: true,
      category: {
        name: "تطوير الويب",
        icon: "🌐",
        color: "#3B82F6"
      }
    },
    {
      id: "2",
      title: "تصميم شعار",
      description: "تصميم شعار احترافي لعلامتك التجارية",
      price: 200,
      is_active: true,
      category: {
        name: "التصميم",
        icon: "🎨",
        color: "#EF4444"
      }
    }
  ];

  // Client operations
  async createClient(clientData: {
    email: string
    full_name: string
    phone?: string
    company_name?: string
  }) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...clientData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_verified: false
    }
  }

  async getClientByEmail(email: string) {
    return null // No client found
  }

  async updateClient(
    id: string,
    updates: Partial<{
      full_name: string
      phone: string
      company_name: string
      avatar_url: string
      is_verified: boolean
    }>,
  ) {
    return {
      id,
      ...updates,
      updated_at: new Date().toISOString()
    }
  }

  // Freelancer operations
  async getAvailableFreelancers(limit = 20, offset = 0) {
    return this.mockFreelancers.slice(offset, offset + limit)
  }

  async getFreelancersBySkills(skillNames: string[], limit = 10) {
    return this.mockFreelancers
      .filter(freelancer => 
        freelancer.freelancer_skills.some(skill => 
          skillNames.includes(skill.skill.name)
        )
      )
      .slice(0, limit)
  }

  async createFreelancer(freelancerData: {
    full_name: string
    email: string
    title: string
    bio?: string
    hourly_rate?: number
    experience_years?: number
    location?: string
    languages?: string[]
  }) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...freelancerData,
      rating: 0,
      is_available: true,
      is_verified: false,
      created_at: new Date().toISOString()
    }
  }

  // Service operations
  async getServices(categoryId?: string, limit = 20, offset = 0) {
    return this.mockServices.slice(offset, offset + limit)
  }

  async getCategories() {
    return [
      { id: "1", name: "تطوير الويب", icon: "🌐", color: "#3B82F6", is_active: true },
      { id: "2", name: "التصميم", icon: "🎨", color: "#EF4444", is_active: true },
      { id: "3", name: "التسويق", icon: "📈", color: "#10B981", is_active: true }
    ]
  }

  // Client request operations
  async createClientRequest(requestData: any) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...requestData,
      status: "pending",
      created_at: new Date().toISOString()
    }
  }

  async getClientRequests(clientId?: string, status?: string, limit = 20, offset = 0) {
    return []
  }

  async updateRequestStatus(requestId: string, status: string) {
    return {
      id: requestId,
      status,
      updated_at: new Date().toISOString()
    }
  }

  // Assignment operations
  async assignFreelancerToRequest(requestId: string, freelancerId: string, estimatedCompletion?: string) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      request_id: requestId,
      freelancer_id: freelancerId,
      status: "assigned",
      assigned_at: new Date().toISOString()
    }
  }

  async getAssignments(freelancerId?: string, status?: string, limit = 20) {
    return []
  }

  // Project operations
  async createProject(assignmentId: string, agreedPrice: number, deadline?: string) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      assignment_id: assignmentId,
      agreed_price: agreedPrice,
      deadline,
      status: "in_progress",
      progress_percentage: 0,
      created_at: new Date().toISOString()
    }
  }

  async updateProjectProgress(projectId: string, progressPercentage: number) {
    return {
      id: projectId,
      progress_percentage: progressPercentage,
      updated_at: new Date().toISOString()
    }
  }

  async completeProject(projectId: string, clientRating?: number, clientFeedback?: string) {
    return {
      id: projectId,
      status: "completed",
      progress_percentage: 100,
      completion_date: new Date().toISOString(),
      client_rating: clientRating,
      client_feedback: clientFeedback
    }
  }

  // Statistics
  async getStats() {
    return {
      totalFreelancers: 150,
      totalClients: 300,
      totalProjects: 75,
      completedProjects: 60,
      successRate: 80
    }
  }
}

export const db = new DatabaseService()
