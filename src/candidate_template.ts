// -----------------------------------------------------------------------------
// CANDIDATE DATA TEMPLATE
// -----------------------------------------------------------------------------
// Please fill out this list with your real candidate data.
// You can copy-paste the "candidate object" as many times as needed.
//
// FORMAT NOTES:
// 1. "alliance" MUST be one of: 'bnp_jot', 'jamaat_jot', 'bam_jot', 'independent'
// 2. "area" should match the constituency format (e.g., "Dhaka-10")
// 3. "symbol" can be an emoji (🦁) or text
// -----------------------------------------------------------------------------

export const CANDIDATE_DATA = [
    // --- Candidate 1 ---
    {
        // Basic Info
        name: "Candidate Name (English)",      // e.g. "Mirza Fakhrul"
        name_bn: "প্রার্থীর নাম (বাংলা)",       // e.g. "মির্জা ফখরুল"
        age: 60,                               // Number

        // Party & Alliance
        party: "Bangladesh Nationalist Party", // Full party name
        party_bn: "বাংলাদেশ জাতীয়তাবাদী দল",
        symbol: "🌾",                          // Ballot symbol
        alliance: "bnp_jot",                   // OPTIONS: 'bnp_jot' | 'jamaat_jot' | 'bam_jot' | 'independent'

        // Location
        division: "Rangpur",
        district: "Thakurgaon",
        area: "Thakurgaon-1",                  // Must match exactly with site areas

        // Details (Optional - you can leave these blank or generic)
        manifesto: "Restoring democracy and voting rights.",
        manifesto_bn: "গণতন্ত্র এবং ভোটাধিকার পুনরুদ্ধার।",
        education: "M.A. in Economics",
        experience: "political",               // OPTIONS: 'political' | 'business' | 'social' | 'academic'
        status: "clean",                       // OPTIONS: 'clean' | 'pending'
        image_url: "",                         // Leave empty if no image yet
    },

    // --- Candidate 2 ---
    {
        name: "Dr. Shafiqur Rahman",
        name_bn: "ডাঃ শফিকুর রহমান",
        age: 55,
        party: "Bangladesh Jamaat-e-Islami",
        party_bn: "বাংলাদেশ জামায়াতে ইসলামী",
        symbol: "⚖️",
        alliance: "jamaat_jot",
        division: "Dhaka",
        district: "Dhaka",
        area: "Dhaka-15",
        manifesto: "Justice and welfare state.",
        manifesto_bn: "ন্যায়বিচার ও কল্যাণ রাষ্ট্র।",
        education: "MBBS",
        experience: "political",
        status: "clean",
        image_url: "",
    },

    // ... Copy and paste here for more candidates ...
];
