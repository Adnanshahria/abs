-- Page Content Table for Admin-Editable Content
CREATE TABLE IF NOT EXISTS page_content (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    content_bn TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- About Page Content
INSERT OR IGNORE INTO page_content (id, content, content_bn) VALUES
('about_title', 'About Us', 'আমাদের সম্পর্কে'),
('about_desc', 'Amar Ballot is a civic platform designed to empower Bangladeshi voters with transparent, accessible election information.', 'আমার ব্যালট একটি নাগরিক প্ল্যাটফর্ম যা বাংলাদেশি ভোটারদের স্বচ্ছ, সহজলভ্য নির্বাচন তথ্য দিয়ে ক্ষমতায়িত করার জন্য ডিজাইন করা হয়েছে।'),
('mission_title', 'Our Mission', 'আমাদের লক্ষ্য'),
('mission_desc', 'To provide every citizen with accurate, unbiased information about elections and voting processes.', 'প্রতিটি নাগরিককে নির্বাচন এবং ভোটদান প্রক্রিয়া সম্পর্কে সঠিক, নিরপেক্ষ তথ্য প্রদান করা।'),
('vision_title', 'Our Vision', 'আমাদের দৃষ্টিভঙ্গি'),
('vision_desc', 'A Bangladesh where every voter makes informed decisions, strengthening our democracy.', 'একটি বাংলাদেশ যেখানে প্রতিটি ভোটার সচেতন সিদ্ধান্ত নেয়, আমাদের গণতন্ত্রকে শক্তিশালী করে।'),
('trust_title', 'Trust & Transparency', 'বিশ্বাস ও স্বচ্ছতা'),
('trust_desc', 'We are committed to providing verified, fact-checked information you can rely on.', 'আমরা যাচাইকৃত, তথ্য-পরীক্ষিত তথ্য প্রদান করতে প্রতিশ্রুতিবদ্ধ।'),
('story_title', 'Our Story', 'আমাদের গল্প'),
('story_desc', 'Born from the belief that informed citizens are the foundation of a healthy democracy.', 'সচেতন নাগরিকরা একটি সুস্থ গণতন্ত্রের ভিত্তি এই বিশ্বাস থেকে জন্ম।');

-- Contact Page Content
INSERT OR IGNORE INTO page_content (id, content, content_bn) VALUES
('contact_title', 'Contact Us', 'যোগাযোগ করুন'),
('contact_subtitle', 'Have questions or feedback? We would love to hear from you.', 'প্রশ্ন বা মতামত আছে? আমরা আপনার কাছ থেকে শুনতে চাই।'),
('contact_email_1', 'support@amarballot.bd', 'support@amarballot.bd'),
('contact_email_2', 'info@amarballot.bd', 'info@amarballot.bd'),
('contact_phone', '+880 1711 000000', '+880 1711 000000'),
('contact_address', 'Election Commission Secretariat\nAgargaon, Dhaka-1207\nBangladesh', 'নির্বাচন কমিশন সচিবালয়\nআগারগাঁও, ঢাকা-১২০৭\nবাংলাদেশ');

-- Services Page Content
INSERT OR IGNORE INTO page_content (id, content, content_bn) VALUES
('services_title', 'Our Services', 'আমাদের সেবাসমূহ'),
('services_subtitle', 'Comprehensive tools and resources to help you participate in democracy effectively.', 'গণতন্ত্রে কার্যকরভাবে অংশগ্রহণ করতে সাহায্য করার জন্য ব্যাপক সরঞ্জাম এবং সংস্থান।'),
('service_1_title', 'Vote Center Locator', 'ভোট কেন্দ্র সন্ধানকারী'),
('service_1_desc', 'Find your nearest voting center with ease.', 'সহজে আপনার নিকটতম ভোট কেন্দ্র খুঁজুন।'),
('service_2_title', 'Candidate Search', 'প্রার্থী অনুসন্ধান'),
('service_2_desc', 'Search and compare candidates in your constituency.', 'আপনার নির্বাচনী এলাকায় প্রার্থীদের অনুসন্ধান এবং তুলনা করুন।'),
('service_3_title', 'Voter Education', 'ভোটার শিক্ষা'),
('service_3_desc', 'Learn about your rights and how to vote.', 'আপনার অধিকার এবং কিভাবে ভোট দিতে হয় তা জানুন।'),
('service_4_title', 'Rumor Check', 'গুজব যাচাই'),
('service_4_desc', 'Verify election-related news and information.', 'নির্বাচন সম্পর্কিত সংবাদ এবং তথ্য যাচাই করুন।'),
('service_5_title', 'Sample Ballot', 'নমুনা ব্যালট'),
('service_5_desc', 'Preview and practice with sample ballots.', 'নমুনা ব্যালট দিয়ে প্রিভিউ এবং অনুশীলন করুন।'),
('service_6_title', 'AI Assistant', 'এআই সহকারী'),
('service_6_desc', 'Get instant answers to your election questions.', 'আপনার নির্বাচন সংক্রান্ত প্রশ্নের তাৎক্ষণিক উত্তর পান।');

-- Good Citizen Inspiring Message (shown when all eligibility checks pass)
INSERT OR IGNORE INTO page_content (id, content, content_bn) VALUES
('citizen_inspiring_message', 'A responsible citizen is the backbone of a strong democracy. Your vote is your voice, your power, and your future!', 'একজন দায়িত্বশীল নাগরিক একটি শক্তিশালী গণতন্ত্রের মেরুদণ্ড। আপনার ভোট আপনার কণ্ঠস্বর, আপনার শক্তি এবং আপনার ভবিষ্যৎ!');
