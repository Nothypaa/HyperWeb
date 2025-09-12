-- ===================================
-- Test Data for Contact System
-- ===================================

-- Insert test contact submissions
INSERT INTO public.contacts (
    full_name, 
    email, 
    phone, 
    subject, 
    message, 
    ip_address,
    created_at,
    status
) VALUES 
(
    'Jean Dupont',
    'jean.dupont@example.com',
    '+33 6 12 34 56 78',
    'web-development',
    'Bonjour, j''aimerais développer un site web pour mon entreprise de plomberie. Pouvez-vous me faire un devis ?',
    '192.168.1.100',
    NOW() - INTERVAL '2 days',
    'new'
),
(
    'Marie Martin',
    'marie.martin@example.com',
    '+33 7 87 65 43 21',
    'web-design',
    'J''ai besoin d''un redesign de mon site existant. Il n''est plus moderne et ne fonctionne pas bien sur mobile.',
    '192.168.1.101',
    NOW() - INTERVAL '1 day',
    'read'
),
(
    'Pierre Dubois',
    'pierre.dubois@example.com',
    NULL,
    'consultation',
    'Je voudrais une consultation gratuite pour discuter de mes besoins en marketing digital.',
    '192.168.1.102',
    NOW() - INTERVAL '3 hours',
    'new'
),
(
    'Sophie Laurent',
    'sophie.laurent@example.com',
    '+33 6 99 88 77 66',
    'web-development',
    'Création d''une boutique en ligne pour vendre mes créations artisanales. Budget autour de 5000€.',
    '192.168.1.103',
    NOW() - INTERVAL '1 hour',
    'new'
),
(
    'Antoine Moreau',
    'antoine.moreau@example.com',
    '+33 7 11 22 33 44',
    'web-design',
    'Mon restaurant a besoin d''un site web attractif avec système de réservation en ligne.',
    '192.168.1.104',
    NOW() - INTERVAL '30 minutes',
    'replied'
);

-- Create a test admin user (you'll need to create this user in Supabase Auth first)
INSERT INTO public.admin_users (email, last_login, is_active)
VALUES ('admin@agencehyperweb.com', NOW(), true)
ON CONFLICT (email) DO UPDATE SET last_login = NOW();

-- Display test data
SELECT 
    id,
    full_name,
    email,
    subject,
    status,
    created_at,
    CASE 
        WHEN message IS NOT NULL THEN LEFT(message, 50) || '...'
        ELSE NULL 
    END as message_preview
FROM public.contacts 
ORDER BY created_at DESC;

-- Display counts by status
SELECT 
    status,
    COUNT(*) as count
FROM public.contacts 
GROUP BY status 
ORDER BY status;

SELECT 'Test data inserted successfully!' as result;