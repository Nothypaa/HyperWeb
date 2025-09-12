-- ===================================
-- Fresh Contact System Database Schema
-- ===================================

-- 1. Drop existing table if it exists
DROP TABLE IF EXISTS public.contacts CASCADE;

-- 2. Create contacts table with proper structure
CREATE TABLE public.contacts (
    id BIGSERIAL PRIMARY KEY,
    full_name TEXT NOT NULL CHECK (char_length(full_name) >= 2 AND char_length(full_name) <= 100),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
    phone TEXT CHECK (phone IS NULL OR char_length(phone) >= 10),
    subject TEXT NOT NULL CHECK (subject IN ('web-development', 'web-design', 'consultation')),
    message TEXT CHECK (message IS NULL OR char_length(message) <= 2000),
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived'))
);

-- 3. Create indexes for performance
CREATE INDEX idx_contacts_created_at ON public.contacts (created_at DESC);
CREATE INDEX idx_contacts_status ON public.contacts (status);
CREATE INDEX idx_contacts_email ON public.contacts (email);
CREATE INDEX idx_contacts_subject ON public.contacts (subject);

-- 4. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Create trigger for updated_at
CREATE TRIGGER update_contacts_updated_at 
    BEFORE UPDATE ON public.contacts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 7. Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow service role all operations" ON public.contacts;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contacts;
DROP POLICY IF EXISTS "Allow authenticated users to read all" ON public.contacts;

-- 8. Create RLS Policies

-- Policy 1: Service role can do everything (for admin operations)
CREATE POLICY "Allow service role all operations" ON public.contacts
    FOR ALL USING (auth.role() = 'service_role');

-- Policy 2: Anonymous users can only insert (for contact form)
CREATE POLICY "Allow anonymous inserts" ON public.contacts
    FOR INSERT TO anon
    WITH CHECK (true);

-- Policy 3: Authenticated users can read all (for admin panel)
CREATE POLICY "Allow authenticated users to read all" ON public.contacts
    FOR SELECT TO authenticated
    USING (true);

-- Policy 4: Authenticated users can update status (for admin actions)
CREATE POLICY "Allow authenticated users to update status" ON public.contacts
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy 5: Authenticated users can delete (for admin cleanup)
CREATE POLICY "Allow authenticated users to delete" ON public.contacts
    FOR DELETE TO authenticated
    USING (true);

-- 9. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON public.contacts TO service_role;
GRANT INSERT ON public.contacts TO anon;
GRANT SELECT, UPDATE, DELETE ON public.contacts TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.contacts_id_seq TO anon, authenticated, service_role;

-- 10. Create admin users table for authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true
);

-- 11. Enable RLS for admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 12. Admin users RLS policies
CREATE POLICY "Allow service role all operations on admin_users" ON public.admin_users
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow authenticated users to read own profile" ON public.admin_users
    FOR SELECT TO authenticated
    USING (auth.uid() = id);

-- 13. Grant permissions for admin_users
GRANT ALL ON public.admin_users TO service_role;
GRANT SELECT ON public.admin_users TO authenticated;

-- ===================================
-- Verification Queries
-- ===================================

-- Check table structure
\d public.contacts;

-- Check policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename IN ('contacts', 'admin_users');

-- Success message
SELECT 'Database schema setup completed successfully!' as status;