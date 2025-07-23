import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // تحديث الجلسة
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // حماية صفحات لوحة التحكم
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }
  }

  // إعادة توجيه المستخدمين المسجلين بعيداً عن صفحات المصادقة
  if (req.nextUrl.pathname.startsWith("/auth/")) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}
