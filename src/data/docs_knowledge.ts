// Auto-generated: Full Docs folder content for AI context injection
// This gives Prerona (AI chatbot) access to all project documentation

export const DOCS_KNOWLEDGE = `
[PROJECT DOCUMENTATION - আমার ব্যালট প্রজেক্ট ডকুমেন্টেশন]

=== README ===
Amar Ballot is a civic engagement web application designed to help citizens become informed and responsible voters in Bangladesh. Features an AI assistant named "Prerona" who guides users through voting eligibility and provides quick access to election resources.
Tech Stack: React 18 + TypeScript, Vite 7.x, TailwindCSS 4.x, Lucide React icons.
Features: Header navigation, Eligibility Checker, Prerona AI Assistant, Quick Links (Election Updates, Vote Centers, Courses), Emergency Contacts (999, police).
Color palette: Green-based (#4CAF50, #22C55E). Mobile-first responsive design.

=== FEATURES & CHANGELOG ===
- Social Features: Likes (anonymous + logged-in), Comments, Share Links with ?id= deep linking on Election Updates and Rumor Check pages.
- Train AI: Admins add custom Q&A pairs at /adm/train-ai. AI prioritizes admin-trained knowledge over web search.
- AI Caching: Persistent localStorage caching (365 days). Force refresh from admin panel. Priority: Admin KB > Local DB > Web search.
- Chatbot Login: /chat route requires authentication. Unauthenticated users see login prompt.
- Good Citizen Popup: Sparkle animations with dynamic inspiring message when eligibility check passes.
- Universal Footer: Brand section, Quick Links, Support Links, Emergency Contacts, Copyright.
- Dynamic Logo: Header fetches logo from database branding settings.
- Past Results: Historical election data with charts for 2024, 2018, 2014, 2008, 2001.
- UI: 4-column grid layout, compact headers, share button in thumbnail, sorting (newest/oldest).

=== DATABASE ===
Tables: users, candidates, election_updates, rumors, ai_knowledge, page_content, content_likes, content_comments, past_elections.
AI Knowledge schema: id, division, question, answer, keywords, priority, is_active, created_at, updated_at.

=== AUTO-LEARN SYSTEM ===
When a user asks a question not found in the knowledge base:
1. AI generates response from web search or general knowledge
2. Q&A pair is auto-saved to Turso DB
3. Keywords extracted for future matching
4. Cache invalidated for next search

=== PROJECT INFO ===
Project by: Amar Ballot (Organization)
Developed by: Orbit SaaS- call- 01619138898
AI Assistant Name: Prerona (প্রেরণা)
Website: amarballot.com
`;
