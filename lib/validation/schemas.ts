import { z } from "zod"

// Client schemas
export const clientSignUpSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  fullName: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  companyName: z.string().optional(),
  phone: z.string().optional(),
})

export const clientSignInSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
})

export const clientUpdateSchema = z.object({
  fullName: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل").optional(),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  avatarUrl: z.string().url().optional(),
})

// Client request schemas
export const clientRequestSchema = z
  .object({
    serviceId: z.string().uuid().optional(),
    title: z.string().min(5, "العنوان يجب أن يكون 5 أحرف على الأقل"),
    description: z.string().min(20, "الوصف يجب أن يكون 20 حرف على الأقل"),
    budgetMin: z.number().positive("الميزانية يجب أن تكون أكبر من صفر").optional(),
    budgetMax: z.number().positive("الميزانية يجب أن تكون أكبر من صفر").optional(),
    deadline: z.string().optional(),
    priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
    requirements: z.array(z.string()).optional(),
    attachments: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.budgetMin && data.budgetMax) {
        return data.budgetMax >= data.budgetMin
      }
      return true
    },
    {
      message: "الحد الأقصى للميزانية يجب أن يكون أكبر من أو يساوي الحد الأدنى",
      path: ["budgetMax"],
    },
  )

// Freelancer schemas
export const freelancerSchema = z.object({
  fullName: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  title: z.string().min(5, "المسمى الوظيفي يجب أن يكون 5 أحرف على الأقل"),
  bio: z.string().min(50, "النبذة يجب أن تكون 50 حرف على الأقل").optional(),
  hourlyRate: z.number().positive("السعر بالساعة يجب أن يكون أكبر من صفر").optional(),
  experienceYears: z.number().min(0, "سنوات الخبرة لا يمكن أن تكون سالبة").default(0),
  location: z.string().optional(),
  languages: z.array(z.string()).optional(),
  phone: z.string().optional(),
})

// Project schemas
export const projectUpdateSchema = z.object({
  progressPercentage: z.number().min(0).max(100, "نسبة التقدم يجب أن تكون بين 0 و 100"),
  status: z.enum(["active", "completed", "cancelled", "disputed"]).optional(),
})

export const projectCompletionSchema = z.object({
  clientRating: z.number().min(1).max(5, "التقييم يجب أن يكون بين 1 و 5").optional(),
  clientFeedback: z.string().optional(),
})

// Message schema
export const messageSchema = z.object({
  projectId: z.string().uuid("معرف المشروع غير صحيح"),
  message: z.string().min(1, "الرسالة لا يمكن أن تكون فارغة"),
  attachments: z.array(z.string()).optional(),
})

// Search and filter schemas
export const searchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  deliveryTime: z.number().positive().optional(),
  rating: z.number().min(1).max(5).optional(),
  page: z.number().positive().default(1),
  limit: z.number().positive().max(50).default(20),
})

export type ClientSignUp = z.infer<typeof clientSignUpSchema>
export type ClientSignIn = z.infer<typeof clientSignInSchema>
export type ClientUpdate = z.infer<typeof clientUpdateSchema>
export type ClientRequestInput = z.infer<typeof clientRequestSchema>
export type FreelancerInput = z.infer<typeof freelancerSchema>
export type ProjectUpdate = z.infer<typeof projectUpdateSchema>
export type ProjectCompletion = z.infer<typeof projectCompletionSchema>
export type MessageInput = z.infer<typeof messageSchema>
export type SearchInput = z.infer<typeof searchSchema>
