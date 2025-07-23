import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client with service role
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database helper functions
export class DatabaseService {
  private client = supabaseAdmin

  // Client operations
  async createClient(clientData: {
    email: string
    full_name: string
    phone?: string
    company_name?: string
  }) {
    const { data, error } = await this.client.from("clients").insert([clientData]).select().single()

    if (error) throw error
    return data
  }

  async getClientByEmail(email: string) {
    const { data, error } = await this.client.from("clients").select("*").eq("email", email).single()

    if (error && error.code !== "PGRST116") throw error
    return data
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
    const { data, error } = await this.client
      .from("clients")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Freelancer operations
  async getAvailableFreelancers(limit = 20, offset = 0) {
    const { data, error } = await this.client
      .from("freelancers")
      .select(`
        *,
        freelancer_skills (
          proficiency_level,
          skill:skills (
            name,
            category
          )
        )
      `)
      .eq("is_available", true)
      .eq("is_verified", true)
      .order("rating", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    return data
  }

  async getFreelancersBySkills(skillNames: string[], limit = 10) {
    const { data, error } = await this.client
      .from("freelancers")
      .select(`
        *,
        freelancer_skills!inner (
          proficiency_level,
          skill:skills!inner (
            name,
            category
          )
        )
      `)
      .eq("is_available", true)
      .eq("is_verified", true)
      .in("freelancer_skills.skill.name", skillNames)
      .order("rating", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
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
    const { data, error } = await this.client.from("freelancers").insert([freelancerData]).select().single()

    if (error) throw error
    return data
  }

  // Service operations
  async getServices(categoryId?: string, limit = 20, offset = 0) {
    let query = this.client
      .from("services")
      .select(`
        *,
        category:categories (
          name,
          icon,
          color
        )
      `)
      .eq("is_active", true)

    if (categoryId) {
      query = query.eq("category_id", categoryId)
    }

    const { data, error } = await query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

    if (error) throw error
    return data
  }

  async getCategories() {
    const { data, error } = await this.client.from("categories").select("*").eq("is_active", true).order("name")

    if (error) throw error
    return data
  }

  // Client request operations
  async createClientRequest(requestData: {
    client_id: string
    service_id?: string
    title: string
    description: string
    budget_min?: number
    budget_max?: number
    deadline?: string
    priority?: "low" | "medium" | "high" | "urgent"
    requirements?: string[]
    attachments?: string[]
  }) {
    const { data, error } = await this.client
      .from("client_requests")
      .insert([requestData])
      .select(`
        *,
        client:clients (*),
        service:services (
          *,
          category:categories (*)
        )
      `)
      .single()

    if (error) throw error
    return data
  }

  async getClientRequests(clientId?: string, status?: string, limit = 20, offset = 0) {
    let query = this.client.from("client_requests").select(`
        *,
        client:clients (*),
        service:services (
          *,
          category:categories (*)
        )
      `)

    if (clientId) {
      query = query.eq("client_id", clientId)
    }

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

    if (error) throw error
    return data
  }

  async updateRequestStatus(requestId: string, status: string) {
    const { data, error } = await this.client
      .from("client_requests")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Assignment operations (Platform assigns freelancers)
  async assignFreelancerToRequest(requestId: string, freelancerId: string, estimatedCompletion?: string) {
    const { data, error } = await this.client
      .from("freelancer_assignments")
      .insert([
        {
          request_id: requestId,
          freelancer_id: freelancerId,
          assigned_by: "system",
          estimated_completion: estimatedCompletion,
        },
      ])
      .select(`
        *,
        request:client_requests (
          *,
          client:clients (*)
        ),
        freelancer:freelancers (*)
      `)
      .single()

    if (error) throw error

    // Update request status to assigned
    await this.updateRequestStatus(requestId, "assigned")

    return data
  }

  async getAssignments(freelancerId?: string, status?: string, limit = 20) {
    let query = this.client.from("freelancer_assignments").select(`
        *,
        request:client_requests (
          *,
          client:clients (*)
        ),
        freelancer:freelancers (*)
      `)

    if (freelancerId) {
      query = query.eq("freelancer_id", freelancerId)
    }

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query.order("assigned_at", { ascending: false }).limit(limit)

    if (error) throw error
    return data
  }

  // Project operations
  async createProject(assignmentId: string, agreedPrice: number, deadline?: string) {
    // Get assignment details
    const { data: assignment, error: assignmentError } = await this.client
      .from("freelancer_assignments")
      .select(`
        *,
        request:client_requests (
          *,
          client:clients (*)
        ),
        freelancer:freelancers (*)
      `)
      .eq("id", assignmentId)
      .single()

    if (assignmentError) throw assignmentError

    const { data, error } = await this.client
      .from("projects")
      .insert([
        {
          assignment_id: assignmentId,
          client_id: assignment.request.client_id,
          freelancer_id: assignment.freelancer_id,
          title: assignment.request.title,
          description: assignment.request.description,
          agreed_price: agreedPrice,
          deadline,
        },
      ])
      .select(`
        *,
        client:clients (*),
        freelancer:freelancers (*)
      `)
      .single()

    if (error) throw error
    return data
  }

  async updateProjectProgress(projectId: string, progressPercentage: number) {
    const { data, error } = await this.client
      .from("projects")
      .update({
        progress_percentage: progressPercentage,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async completeProject(projectId: string, clientRating?: number, clientFeedback?: string) {
    const { data, error } = await this.client
      .from("projects")
      .update({
        status: "completed",
        progress_percentage: 100,
        completion_date: new Date().toISOString(),
        client_rating: clientRating,
        client_feedback: clientFeedback,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Statistics
  async getStats() {
    const [
      { count: totalFreelancers },
      { count: totalClients },
      { count: totalProjects },
      { count: completedProjects },
    ] = await Promise.all([
      this.client.from("freelancers").select("*", { count: "exact", head: true }),
      this.client.from("clients").select("*", { count: "exact", head: true }),
      this.client.from("projects").select("*", { count: "exact", head: true }),
      this.client.from("projects").select("*", { count: "exact", head: true }).eq("status", "completed"),
    ])

    return {
      totalFreelancers: totalFreelancers || 0,
      totalClients: totalClients || 0,
      totalProjects: totalProjects || 0,
      completedProjects: completedProjects || 0,
      successRate: totalProjects ? Math.round((completedProjects / totalProjects) * 100) : 0,
    }
  }
}

export const db = new DatabaseService()
