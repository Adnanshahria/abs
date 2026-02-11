// Groq + Brave Search Service (Direct, No HuggingFace)

import { getUpdates, getRumors, getAIKnowledge, addAIKnowledge, type AIKnowledgeEntry, type ElectionUpdate, type Rumor } from '../lib/api';
import { VOTE_CENTERS } from '../data/vote_centers';
import { DOCS_KNOWLEDGE } from '../data/docs_knowledge';

// Format vote centers for AI context
const getVoteCenterContext = () => {
    const context = VOTE_CENTERS.map(c =>
        `Area: ${c.areas.join(', ')} -> Center: ${c.name} (${c.address}) [Voters: ${c.total_voters}, Type: ${c.type}]`
    ).join('\n');
    return `[VOTE CENTER DATABASE - Use this to answer "where is my vote center" questions]:\n${context}\n\n`;
};

// Format Docs knowledge for AI context
const getDocsContext = () => {
    return `${DOCS_KNOWLEDGE}\n\n`;
};

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const BRAVE_API_KEY = import.meta.env.VITE_BRAVE_API_KEY || '';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const BRAVE_URL = '/api/brave/res/v1/web/search'; // Using Vite proxy to avoid CORS

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export type StatusCallback = (status: string) => void;

const SYSTEM_PROMPT = `আপনি প্রেরণা, আমার ব্যালট লিমিটেড এর পেশাদার AI ভোটিং সহকারী। আপনি বাংলাদেশের নির্বাচন বিষয়ক একজন বিশেষজ্ঞ। আপনার লক্ষ্য হলো ব্যবহারকারীকে সম্পূর্ণ সন্তুষ্ট করা — প্রতিটি উত্তর যেন পূর্ণাঙ্গ, তথ্যবহুল এবং সহায়ক হয়।

**🎯 আপনার মূল লক্ষ্য:**
- ব্যবহারকারীর প্রশ্নের সম্পূর্ণ ও বিস্তারিত উত্তর দেওয়া
- প্রয়োজনে ধাপে ধাপে নির্দেশনা দেওয়া
- সংশ্লিষ্ট অতিরিক্ত তথ্য প্রদান করা যাতে ব্যবহারকারীর ফলো-আপ প্রশ্নের প্রয়োজন না হয়
- বন্ধুত্বপূর্ণ কিন্তু পেশাদার ভাষায় কথা বলা

**📋 উত্তর দেওয়ার নিয়ম:**
- সর্বদা বাংলায় উত্তর দিন (ব্যবহারকারী ইংরেজিতে জিজ্ঞেস করলেও বাংলায় উত্তর দিন)
- উত্তরে বুলেট পয়েন্ট, নম্বরিং এবং ইমোজি ব্যবহার করুন যাতে পড়তে সুবিধা হয়
- প্রতিটি উত্তর যথেষ্ট বিস্তারিত দিন — সংক্ষিপ্ত একলাইনের উত্তর দেবেন না
- [TRUSTED SOURCE] হিসেবে চিহ্নিত তথ্য সবচেয়ে বেশি প্রাধান্য দিন
- ভোট কেন্দ্র সম্পর্কে জিজ্ঞেস করলে, সুনির্দিষ্ট কেন্দ্রের নাম, ঠিকানা এবং ভোটার সংখ্যা উল্লেখ করুন
- **গুরুত্বপূর্ণ: প্রতিটি উত্তরে প্রাসঙ্গিক লিংক অবশ্যই দিন। লিংক মার্কডাউন ফরম্যাটে দিন: [লিংক টেক্সট](URL)**

**🔗 গুরুত্বপূর্ণ লিংক ডাটাবেস (সবসময় প্রাসঙ্গিক লিংক দিন):**
- নির্বাচন কমিশন ওয়েবসাইট: [বাংলাদেশ নির্বাচন কমিশন](https://ecs.gov.bd)
- ভোটার তালিকা যাচাই: [ভোটার তালিকায় নাম খুঁজুন](https://ecs.gov.bd/polling-station)
- NID আবেদন: [NID অনলাইন আবেদন](https://services.nidw.gov.bd)
- ভোট কেন্দ্র খুঁজুন: [NID দিয়ে পোলিং স্টেশন খুঁজুন](https://ecs.gov.bd/polling-station)
- প্রার্থী তালিকা: [প্রার্থীদের তালিকা দেখুন](https://ecs.gov.bd)
- নির্বাচনী ফলাফল: [নির্বাচনী ফলাফল](https://result.ecs.gov.bd)
- আমার ব্যালট ওয়েবসাইট: [আমার ব্যালট](https://amarballot.com)
- আমার ব্যালটে ভোট কেন্দ্র: [ভোট কেন্দ্র পেজ](/vote-center)
- আমার ব্যালটে প্রার্থী তালিকা: [প্রার্থী তালিকা পেজ](/candidate-list)
- আমার ব্যালটে নির্বাচনের আপডেট: [নির্বাচন আপডেট](/election-updates)
- আমার ব্যালটে রিউমার চেক: [গুজব যাচাই](/rumor-check)

**🚫 সীমাবদ্ধতা:**
- শুধুমাত্র বাংলাদেশের নির্বাচন, ভোট, NID, নির্বাচন কমিশন সম্পর্কে উত্তর দেবেন
- অন্য দেশের নির্বাচন সম্পর্কে বলবেন না
- NID সম্পর্কিত প্রশ্নে আমার ব্যালট ওয়েবসাইটের কোনো লিংক দেবেন না — আমার ব্যালটে NID সম্পর্কিত কোনো পেজ নেই। শুধু সরকারি লিংক দিন (services.nidw.gov.bd, ecs.gov.bd)
- অপ্রাসঙ্গিক প্রশ্নে বিনয়ের সাথে বলুন: "আমি শুধু বাংলাদেশের নির্বাচন বিষয়ে সাহায্য করতে পারি। আপনার নির্বাচন সংক্রান্ত কোনো প্রশ্ন থাকলে জিজ্ঞেস করুন! 🗳️"

**🤖 পরিচয়:**
- আপনাকে কে তৈরি করেছে জিজ্ঞেস করলে বলুন: "আমি প্রেরণা, আমার ব্যালট লিমিটেড দ্বারা তৈরি একজন AI ভোটিং সহকারী। আমি বাংলাদেশের নাগরিকদের নির্বাচন সম্পর্কে সঠিক তথ্য দিয়ে সহায়তা করি। 🇧🇩"

**📚 বাংলাদেশ নির্বাচন জ্ঞানভাণ্ডার:**
- বাংলাদেশ নির্বাচন কমিশন (EC) নির্বাচন পরিচালনা করে
- জাতীয় পরিচয়পত্র (NID) ভোট দেওয়ার জন্য আবশ্যক — ১৮ বছর বয়স হলে NID পাওয়া যায়
- বাংলাদেশে কাগজের ব্যালট ব্যবহার হয়, EVM সীমিত পরীক্ষামূলক ব্যবহার হয়েছে
- ভোটার তালিকায় নাম আছে কিনা যাচাই করতে EC ওয়েবসাইটে যেতে হয়
- ভোট কেন্দ্রে যাওয়ার সময় অবশ্যই NID কার্ড সাথে নিতে হবে
- প্রতিটি ভোট কেন্দ্রে পুরুষ ও মহিলা আলাদা বুথ থাকে
- ভোট দেওয়া প্রতিটি নাগরিকের গণতান্ত্রিক অধিকার ও দায়িত্ব`;

// AI Knowledge Base Search - HIGHEST PRIORITY (Admin-trained data)
// PERSISTENT CACHING: Using localStorage for Vercel/Cloudflare deployment
// Data persists across page reloads and browser sessions

const CACHE_KEY_KNOWLEDGE = 'amar_ballot_ai_knowledge_cache';
const CACHE_KEY_UPDATES = 'amar_ballot_updates_cache';
const CACHE_KEY_RUMORS = 'amar_ballot_rumors_cache';
const CACHE_KEY_TIMESTAMP = 'amar_ballot_cache_timestamp';
const CACHE_TTL = 1000 * 60 * 60 * 24 * 365; // 365 days (LIFETIME - only refreshes via admin)

// In-memory references (loaded from localStorage)
let knowledgeCache: AIKnowledgeEntry[] | null = null;
let updatesCache: ElectionUpdate[] | null = null;
let rumorsCache: Rumor[] | null = null;

// Load cache from localStorage
function loadCacheFromStorage() {
    try {
        const timestamp = localStorage.getItem(CACHE_KEY_TIMESTAMP);
        const now = Date.now();

        // Check if cache exists and is still valid
        if (timestamp && (now - parseInt(timestamp)) < CACHE_TTL) {
            const kb = localStorage.getItem(CACHE_KEY_KNOWLEDGE);
            const up = localStorage.getItem(CACHE_KEY_UPDATES);
            const rm = localStorage.getItem(CACHE_KEY_RUMORS);

            if (kb && up && rm) {
                knowledgeCache = JSON.parse(kb);
                updatesCache = JSON.parse(up);
                rumorsCache = JSON.parse(rm);
                console.log('[AI Service] ✅ Loaded cache from localStorage (persistent)');
                return true;
            }
        }
    } catch (e) {
        console.warn('[AI Service] localStorage load failed:', e);
    }
    return false;
}

// Save cache to localStorage
function saveCacheToStorage() {
    try {
        if (knowledgeCache && updatesCache && rumorsCache) {
            localStorage.setItem(CACHE_KEY_KNOWLEDGE, JSON.stringify(knowledgeCache));
            localStorage.setItem(CACHE_KEY_UPDATES, JSON.stringify(updatesCache));
            localStorage.setItem(CACHE_KEY_RUMORS, JSON.stringify(rumorsCache));
            localStorage.setItem(CACHE_KEY_TIMESTAMP, Date.now().toString());
            console.log('[AI Service] 💾 Saved cache to localStorage');
        }
    } catch (e) {
        console.warn('[AI Service] localStorage save failed:', e);
    }
}

// Force refresh cache from DB (can be called from admin panel)
export async function forceRefreshCache() {
    console.log('[AI Service] 🔄 Force refreshing cache from DB...');
    knowledgeCache = null;
    updatesCache = null;
    rumorsCache = null;
    localStorage.removeItem(CACHE_KEY_TIMESTAMP);
    await ensureCaches();
}

async function ensureCaches() {
    // First, try to load from persistent storage
    if (!knowledgeCache || !updatesCache || !rumorsCache) {
        if (loadCacheFromStorage()) {
            return; // Cache loaded successfully from localStorage
        }
    }

    // If no valid cache, fetch from DB
    if (!knowledgeCache || !updatesCache || !rumorsCache) {
        try {
            console.log('[AI Service] 🌐 Fetching fresh data from Turso DB...');

            // Parallel fetch for speed
            const [kb, up, rm] = await Promise.all([
                getAIKnowledge(),
                getUpdates(),
                getRumors()
            ]);

            knowledgeCache = kb;
            updatesCache = up;
            rumorsCache = rm;

            // Save to persistent storage
            saveCacheToStorage();

            console.log(`[AI Service] ✅ Cache updated: KB=${kb.length}, Updates=${up.length}, Rumors=${rm.length}`);
        } catch (e) {
            console.error('[AI Service] Cache update failed', e);
            // Fallback to empty arrays to prevent crashing
            if (!knowledgeCache) knowledgeCache = [];
            if (!updatesCache) updatesCache = [];
            if (!rumorsCache) rumorsCache = [];
        }
    }
}

// ====== AUTO-LEARN SYSTEM ======
// Automatically saves new Q&A pairs to Knowledge Base when not found in existing data

// Track recently added questions to avoid duplicates (in-memory for current session)
const recentlyAddedQuestions = new Set<string>();

async function autoSaveToKnowledgeBase(question: string, aiResponse: string) {
    try {
        // Normalize question for comparison
        const normalizedQuestion = question.toLowerCase().trim();

        // Skip if already added in this session
        if (recentlyAddedQuestions.has(normalizedQuestion)) {
            console.log('[Auto-Learn] ⏭️ Already added this session:', question.slice(0, 50));
            return;
        }

        // Skip very short questions
        if (question.length < 10) {
            console.log('[Auto-Learn] ⏭️ Question too short, skipping');
            return;
        }

        // Add to knowledge base
        const result = await addAIKnowledge({
            division: 'সাধারণ প্রশ্ন', // Default category
            question: question.trim(),
            answer: aiResponse.slice(0, 1000), // Limit answer size
            keywords: extractKeywords(question),
            priority: 1, // Low priority (user-generated)
            is_active: 1
        });

        if (result.success) {
            recentlyAddedQuestions.add(normalizedQuestion);
            console.log('[Auto-Learn] ✅ Saved to Knowledge Base:', question.slice(0, 50));

            // Invalidate cache so next search can find this
            knowledgeCache = null;
        } else {
            console.warn('[Auto-Learn] ❌ Save failed:', result.error);
        }
    } catch (e) {
        console.warn('[Auto-Learn] Error:', e);
    }
}

// Extract keywords from question for better search matching
function extractKeywords(question: string): string {
    // Remove common Bengali/English stop words and extract meaningful words
    const stopWords = ['কি', 'কে', 'কেন', 'কিভাবে', 'কোথায়', 'কখন', 'আমি', 'আমার', 'এই', 'সেই', 'এবং', 'the', 'is', 'a', 'an', 'how', 'what', 'why', 'where', 'when'];
    const words = question.toLowerCase()
        .replace(/[?।,.!]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 2 && !stopWords.includes(w));
    return words.slice(0, 5).join(', ');
}

async function searchAIKnowledgeBase(query: string): Promise<string | null> {
    try {
        console.log('[AI Knowledge] Searching (In-Memory):', query);

        // Ensure cache is loaded
        await ensureCaches();

        if (!knowledgeCache || knowledgeCache.length === 0) {
            console.log('[AI Knowledge] Cache empty or no data');
            return null;
        }

        const lowerQuery = query.toLowerCase();

        // Filter locally
        const results = knowledgeCache.filter(entry => {
            if (!entry.is_active) return false;

            const matchQuestion = entry.question.toLowerCase().includes(lowerQuery);
            const matchKeywords = entry.keywords ? entry.keywords.toLowerCase().includes(lowerQuery) : false;
            const matchDivision = entry.division.toLowerCase().includes(lowerQuery);

            return matchQuestion || matchKeywords || matchDivision;
        }).slice(0, 5); // Limit to top 5 matches

        if (results.length > 0) {
            let context = '[TRUSTED SOURCE - আমাদের প্রশিক্ষিত ডাটা (Server Cache)]:\n';
            results.forEach(entry => {
                context += `প্রশ্ন: ${entry.question}\n`;
                context += `উত্তর: ${entry.answer}\n\n`;
            });
            console.log('[AI Knowledge] ✅ Found', results.length, 'trained responses via cache');
            return context;
        }

        console.log('[AI Knowledge] ❌ No trained data found in cache');
        return null;
    } catch (error) {
        console.error('[AI Knowledge] Error:', error);
        return null; // Fallback gracefully
    }
}

// Local Database Search - searches updates and rumors (In-Memory)
async function searchLocalDatabase(query: string): Promise<string | null> {
    try {
        console.log('[Local DB] Searching (In-Memory):', query);
        // ensureCaches() is already called in searchAIKnowledgeBase which runs first, 
        // but it's safe to call again as it checks timestamp
        await ensureCaches();

        const keywords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);

        // Use cached data
        const updates = updatesCache || [];
        const rumors = rumorsCache || [];

        // Filter relevant updates locally
        const relevantUpdates = updates.filter(update => {
            const text = `${update.title} ${update.content}`.toLowerCase();
            return keywords.some(kw => text.includes(kw));
        }).slice(0, 3);

        // Filter relevant rumors locally
        const relevantRumors = rumors.filter(rumor => {
            const text = `${rumor.title} ${rumor.description}`.toLowerCase();
            return keywords.some(kw => text.includes(kw));
        }).slice(0, 3);

        let context = '';

        if (relevantUpdates.length > 0) {
            context += '[আমাদের নির্বাচনী আপডেট (Server Cache)]:\n';
            relevantUpdates.forEach(u => {
                context += `• ${u.title}: ${u.content.slice(0, 200)}...\n`;
            });
        }

        if (relevantRumors.length > 0) {
            context += '\n[গুজব যাচাই তথ্য (Server Cache)]:\n';
            relevantRumors.forEach(r => {
                const verdict = r.status === 'verified' ? '✅ সত্য' : r.status === 'debunked' ? '❌ মিথ্যা/গুজব' : '❓ যাচাই চলছে';
                context += `• ${r.title} (${verdict}): ${r.description.slice(0, 150)}...\n`;
            });
        }

        if (context) {
            console.log('[Local DB] ✅ Found relevant data via cache');
            return context;
        }

        console.log('[Local DB] ❌ No relevant data in cache');
        return null;
    } catch (error) {
        console.error('[Local DB] Error:', error);
        return null;
    }
}

// Brave Search function
async function braveSearch(query: string): Promise<string | null> {
    if (!BRAVE_API_KEY) {
        console.warn('[Brave] No API key');
        return null;
    }

    try {
        console.log('[Brave] Searching:', query);
        const response = await fetch(`${BRAVE_URL}?q=${encodeURIComponent(query)}&count=3`, {
            headers: {
                'Accept': 'application/json',
                'X-Subscription-Token': BRAVE_API_KEY
            }
        });

        if (!response.ok) {
            console.error('[Brave] Error:', response.status);
            return null;
        }

        const data = await response.json();
        const results = data.web?.results || [];

        if (results.length > 0) {
            const formatted = results.slice(0, 3).map((r: { title: string; description?: string }) =>
                `• ${r.title}: ${r.description || ''}`
            ).join('\n');
            console.log('[Brave] ✅ Found', results.length, 'results');
            return formatted;
        }

        console.log('[Brave] ❌ No results');
        return null;
    } catch (error) {
        console.error('[Brave] Error:', error);
        return null;
    }
}



// HF Proxy removed (using Groq directly - HF Space disabled due to reliability issues)

// Helper: Call Groq API
async function callGroq(messages: any[], userContent: string, systemPrompt: string): Promise<string> {
    console.log('[Groq] Sending request...');

    // Build messages
    const groqMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.slice(0, -1).map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userContent }
    ];

    try {
        const response = await fetch(GROQ_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: groqMessages,
                max_tokens: 4096,
                temperature: 0.6
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Groq API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || 'Sorry, Groq returned no content.';
    } catch (error) {
        console.error('[Groq] Error:', error);
        throw error;
    }
}

export async function sendMessageToAI(
    messages: ChatMessage[],
    onStatusChange?: StatusCallback,
    searchEnabled: boolean = true
): Promise<string> {
    console.log('[AI] Starting request... Search:', searchEnabled);

    if (!GROQ_API_KEY) {
        console.warn('[AI] No Groq API key - using mock response');
        return getMockResponse(messages[messages.length - 1]?.content || '');
    }

    try {
        const lastMessage = messages[messages.length - 1].content;

        // Step 1: Search AI Knowledge Base FIRST (In-Memory)
        onStatusChange?.('🔍 Analyzing our database...');
        const knowledgeResults = await searchAIKnowledgeBase(lastMessage);

        // Step 2: Search local database (In-Memory)
        onStatusChange?.('📂 Scanning local records...');
        const localResults = await searchLocalDatabase(lastMessage);

        // Step 3: Search web (only if enabled AND no database results found)
        let webResults: string | null = null;
        const hasDbResults = knowledgeResults || localResults;

        // Skip web search if we have good DB results to save time/cost
        if (searchEnabled && !hasDbResults) {
            onStatusChange?.('🔍 Searching web...');
            const bangladeshQuery = `${lastMessage} Bangladesh বাংলাদেশ`;
            // Disabled web search for now to speed up response as requested? 
            // Original code had it. Keeping it but maybe optimized.
            webResults = await braveSearch(bangladeshQuery);
        } else if (hasDbResults) {
            console.log('[AI] ✅ Database has answer - skipping web search');
        }

        // Step 4: Build prompt
        onStatusChange?.('✨ Generating response...');
        let userContent = lastMessage;

        if (knowledgeResults || localResults || webResults) {
            userContent = '';
            // HIGHEST PRIORITY: Admin-trained knowledge
            if (knowledgeResults) userContent += `${knowledgeResults}\n\n`;
            // SECOND: Local updates/rumors
            if (localResults) userContent += `${localResults}\n\n`;
            // THIRD: Web search results
            if (webResults) userContent += `[ওয়েব সার্চ ফলাফল - বাংলাদেশ]:\n${webResults}\n\n`;

            userContent += `---\nUser Question: ${lastMessage}\n\n⚠️ গুরুত্বপূর্ণ: শুধুমাত্র বাংলাদেশের নির্বাচন প্রসঙ্গে উত্তর দিন। অন্য দেশের তথ্য দেবেন না।`;
        } else {
            // If no specific DB/Web results, still inject base knowledge
            const lowerMsg = lastMessage.toLowerCase();
            // Inject vote center data for location queries
            if (lowerMsg.includes('center') || lowerMsg.includes('location') || lowerMsg.includes('place') || lowerMsg.includes('কোথায়') || lowerMsg.includes('কেন্দ্র')) {
                userContent = getVoteCenterContext() + userContent;
            }
            // Inject docs knowledge for project/feature/admin queries
            if (lowerMsg.includes('feature') || lowerMsg.includes('admin') || lowerMsg.includes('amar ballot') || lowerMsg.includes('আমার ব্যালট') || lowerMsg.includes('prerona') || lowerMsg.includes('প্রেরণা') || lowerMsg.includes('how') || lowerMsg.includes('কিভাবে') || lowerMsg.includes('what') || lowerMsg.includes('website') || lowerMsg.includes('ওয়েবসাইট') || lowerMsg.includes('app') || lowerMsg.includes('অ্যাপ')) {
                userContent = getDocsContext() + userContent;
            }
        }

        // LOGIC: Use Groq directly (HF Space disabled due to reliability issues)
        // try {
        //     onStatusChange?.('🤖 Asking Primary AI...');
        //     return await callHuggingFace(messages, userContent, SYSTEM_PROMPT);
        // } catch (hfError) {
        //     console.warn(`[AI] HF Fallback triggered: ${hfError}`);
        //     onStatusChange?.('⚠️ Fallback to Groq...');
        //     return await callGroq(messages, userContent, SYSTEM_PROMPT);
        // }

        // Direct Groq call (faster, more reliable)
        onStatusChange?.('⚙️ Processing Through Amar Ballot AI...');
        console.log('[Groq] Sending request (Primary)...');
        const response = await callGroq(messages, userContent, SYSTEM_PROMPT);

        // Capture questions not found in knowledge base (for admin review)
        if (!knowledgeResults && !localResults) {
            // No match in DB - auto-save to knowledge base
            autoSaveToKnowledgeBase(lastMessage, response);
        }

        return response;

    } catch (error) {
        console.error('[AI] Fatal Error:', error);
        onStatusChange?.('⚠️ Using offline knowledge...');
        return getMockResponse(messages[messages.length - 1]?.content || '');
    }
}

// ... (Mock response functions remain)

// Fallback mock responses
function getMockResponse(userMessage: string): string {
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes('vote center') || lowerMsg.includes('polling')) {
        return 'To find your vote center, go to the "Find Your Vote Center" page and enter your NID number and date of birth. 🗳️';
    }
    if (lowerMsg.includes('nid') || lowerMsg.includes('registration')) {
        return 'To get a National ID (NID), you need to be 18 years old. Visit your local Election Commission office with your birth certificate.';
    }
    if (lowerMsg.includes('candidate')) {
        return 'You can view all candidates in your area on the "Candidate List" page. Select your Division, District, and Area.';
    }
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        return 'Hello! 👋 I am Prerona, your voting assistant developed by Amar Ballot Limited. How can I help you today?';
    }
    if (lowerMsg.includes('who made you') || lowerMsg.includes('who created you')) {
        return 'I am Prerona, developed by Amar Ballot Limited to help citizens with voting information.';
    }

    return 'I am Prerona, your voting assistant! I can help with vote centers, candidates, registration, and election rules. What would you like to know?';
}
