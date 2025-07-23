-- إنشاء جداول قاعدة البيانات

-- جدول العملاء
CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    company_name VARCHAR(255),
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الفريلانسرز
CREATE TABLE IF NOT EXISTS freelancers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    title VARCHAR(255) NOT NULL,
    bio TEXT,
    hourly_rate DECIMAL(10,2),
    experience_years INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_projects INTEGER DEFAULT 0,
    total_earnings DECIMAL(12,2) DEFAULT 0.0,
    is_available BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    location VARCHAR(255),
    languages TEXT[], -- مصفوفة اللغات
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول المهارات
CREATE TABLE IF NOT EXISTS skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول مهارات الفريلانسرز
CREATE TABLE IF NOT EXISTS freelancer_skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    freelancer_id UUID REFERENCES freelancers(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    proficiency_level VARCHAR(20) DEFAULT 'intermediate', -- beginner, intermediate, advanced, expert
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(freelancer_id, skill_id)
);

-- جدول التصنيفات
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الخدمات
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES categories(id),
    min_price DECIMAL(10,2) NOT NULL,
    max_price DECIMAL(10,2) NOT NULL,
    delivery_time_days INTEGER NOT NULL,
    features TEXT[] NOT NULL,
    requirements TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول طلبات العملاء
CREATE TABLE IF NOT EXISTS client_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    deadline DATE,
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
    status VARCHAR(20) DEFAULT 'pending', -- pending, assigned, in_progress, completed, cancelled
    requirements TEXT[],
    attachments TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول تعيين الفريلانسرز
CREATE TABLE IF NOT EXISTS freelancer_assignments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_id UUID REFERENCES client_requests(id) ON DELETE CASCADE,
    freelancer_id UUID REFERENCES freelancers(id) ON DELETE CASCADE,
    assigned_by VARCHAR(50) DEFAULT 'system', -- system, admin
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'assigned', -- assigned, accepted, rejected, completed
    estimated_completion DATE,
    actual_completion DATE,
    notes TEXT,
    UNIQUE(request_id, freelancer_id)
);

-- جدول المشاريع
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assignment_id UUID REFERENCES freelancer_assignments(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id),
    freelancer_id UUID REFERENCES freelancers(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    agreed_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active', -- active, completed, cancelled, disputed
    progress_percentage INTEGER DEFAULT 0,
    start_date DATE DEFAULT CURRENT_DATE,
    deadline DATE,
    completion_date DATE,
    client_rating INTEGER CHECK (client_rating >= 1 AND client_rating <= 5),
    client_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الرسائل
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL, -- يمكن أن يكون عميل أو فريلانسر
    sender_type VARCHAR(20) NOT NULL, -- 'client' أو 'freelancer'
    message TEXT NOT NULL,
    attachments TEXT[],
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول المدفوعات
CREATE TABLE IF NOT EXISTS payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id),
    freelancer_id UUID REFERENCES freelancers(id),
    amount DECIMAL(10,2) NOT NULL,
    platform_fee DECIMAL(10,2) NOT NULL,
    freelancer_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed, refunded
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول التقييمات
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id),
    freelancer_id UUID REFERENCES freelancers(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_freelancers_rating ON freelancers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_freelancers_available ON freelancers(is_available) WHERE is_available = true;
CREATE INDEX IF NOT EXISTS idx_client_requests_status ON client_requests(status);
CREATE INDEX IF NOT EXISTS idx_client_requests_created ON client_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_messages_project ON messages(project_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_freelancer_skills_freelancer ON freelancer_skills(freelancer_id);

-- إدراج بيانات أولية للتصنيفات
INSERT INTO categories (name, description, icon, color) VALUES
('تصميم جرافيك', 'تصميم الشعارات والهويات البصرية', '🎨', 'from-purple-500 to-pink-500'),
('برمجة وتطوير', 'تطوير المواقع والتطبيقات', '💻', 'from-blue-500 to-cyan-500'),
('تسويق رقمي', 'إدارة وسائل التواصل والحملات الإعلانية', '📈', 'from-green-500 to-emerald-500'),
('كتابة وترجمة', 'كتابة المحتوى والترجمة', '✍️', 'from-orange-500 to-red-500'),
('تصوير', 'تصوير المنتجات والفعاليات', '📸', 'from-indigo-500 to-purple-500'),
('استشارات', 'الاستشارات التجارية والتقنية', '💡', 'from-yellow-500 to-orange-500')
ON CONFLICT (name) DO NOTHING;

-- إدراج مهارات أولية
INSERT INTO skills (name, category) VALUES
('تصميم الشعارات', 'تصميم جرافيك'),
('فوتوشوب', 'تصميم جرافيك'),
('إليستريتور', 'تصميم جرافيك'),
('React', 'برمجة وتطوير'),
('Next.js', 'برمجة وتطوير'),
('Node.js', 'برمجة وتطوير'),
('Python', 'برمجة وتطوير'),
('إدارة وسائل التواصل', 'تسويق رقمي'),
('Google Ads', 'تسويق رقمي'),
('SEO', 'تسويق رقمي'),
('كتابة المحتوى', 'كتابة وترجمة'),
('الترجمة', 'كتابة وترجمة'),
('تصوير المنتجات', 'تصوير'),
('الاستشارات التجارية', 'استشارات')
ON CONFLICT (name) DO NOTHING;

-- إدراج خدمات أولية
INSERT INTO services (title, description, category_id, min_price, max_price, delivery_time_days, features, requirements) VALUES
(
    'تصميم لوجو احترافي',
    'تصميم شعار مميز يعكس هوية علامتك التجارية مع 3 مفاهيم مختلفة',
    (SELECT id FROM categories WHERE name = 'تصميم جرافيك'),
    25, 100, 3,
    ARRAY['3 مفاهيم تصميم', 'مراجعات غير محدودة', 'ملفات عالية الجودة', 'دليل الاستخدام'],
    ARRAY['وصف مفصل للمشروع', 'الألوان المفضلة', 'أمثلة ملهمة']
),
(
    'تطوير موقع ويب متجاوب',
    'موقع ويب متجاوب وسريع باستخدام أحدث التقنيات مع لوحة إدارة',
    (SELECT id FROM categories WHERE name = 'برمجة وتطوير'),
    150, 500, 14,
    ARRAY['تصميم متجاوب', 'تحسين محركات البحث', 'لوحة إدارة', 'استضافة مجانية لسنة'],
    ARRAY['متطلبات الموقع', 'التصميم المطلوب', 'الوظائف المطلوبة']
),
(
    'إدارة حسابات التواصل الاجتماعي',
    'إدارة شاملة لحساباتك على وسائل التواصل مع تصميم المحتوى',
    (SELECT id FROM categories WHERE name = 'تسويق رقمي'),
    75, 200, 30,
    ARRAY['30 منشور شهرياً', 'تصميم المحتوى', 'تحليل الأداء', 'رد على التعليقات'],
    ARRAY['معلومات الشركة', 'الجمهور المستهدف', 'أهداف التسويق']
)
ON CONFLICT DO NOTHING;
