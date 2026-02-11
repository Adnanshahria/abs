export const translations = {
    en: {
        nav: {
            home: "Home",
            voteCenter: "Vote Center",
            candidates: "Public Survey 2026",
            login: "Login",
            signup: "Sign Up",
            map: "Navigation Map"
        },
        home: {
            seo: {
                title: "Home",
                desc: "Your vote, your right."
            },
            readyToVote: "Ready to Vote!",
            smartAvatar: {
                bubble: "Hello! 👋",
                hello: "Hello,",
                name: "I'm Prerona",
                helper: "I will help you to become",
                role: "a responsible voter",
                chat: "Chat With Me"
            },
            quickLinks: {
                updates: "Election Updates",
                center: "Your Vote Center",
                notice: "Notice",
                candidateList: "Public Survey 2026",
                rumor: "Rumor Check",
                tutorials: "Video Tutorials",
                badge: "Get Civic Hero Badge"
            }
        },
        eligibility: {
            title: "Check Eligibility",
            headerMain: "My Vote",
            headerSub: "My Future...",
            question: "Are you a",
            voter: "voter",
            checklist: {
                nid: "I have my NID",
                polling: "I know my polling center",
                steps: "I understand voting steps",
                rights: "I know my voting rights",
                rules: "I am aware of election-day rules"
            },
            resultBtn: "Result",
            modal: {
                congrats: "🎉 Congratulations",
                suggestions: "💡 Suggestions",
                success: "🎖️ You are now a responsible citizen!",
                noNid: {
                    title: "No NID Card?",
                    desc: "Apply for NID at Election Commission website.",
                    btn: "Apply Now"
                },
                noCenter: {
                    title: "Don't know Vote Center?",
                    desc: "Find your nearest polling center.",
                    btn: "Find Center"
                },
                noSteps: {
                    title: "Unsure how to vote?",
                    desc: "Watch our video tutorials to learn.",
                    btn: "Watch Videos"
                },
                civic: {
                    title: "Learn Civic Duties",
                    desc: "Check Civic Badge section for rights & rules.",
                    btn: "Learn More"
                }
            }
        },
        emergency: {
            title: "Emergency Contacts",
            EC: "Election Commission",
            Police: "Nearby Police",
            Ambulance: "Ambulance Service"
        },
        map: {
            title: "Navigation Map"
        },
        contact: {
            title: "Contact Us",
            subtitle: "We're here to help you exercise your right to vote.",
            form: {
                title: "Send us a Message",
                name: "Your Name",
                placeholderName: "Enter your full name",
                email: "Email Address",
                placeholderEmail: "e.g. adnan@example.com",
                subject: "Subject",
                placeholderSubject: "How can we help?",
                message: "Message",
                placeholderMessage: "Write your message here...",
                send: "Send Message",
                sending: "Sending...",
                success: "Message sent successfully! We will get back to you soon.",
                error: "Failed to send message. Please try again."
            },
            info: {
                emailTitle: "Email Us",
                callTitle: "Call Us",
                visitTitle: "Visit Us",
                address: "Nirbachon Bhaban,\nAgargaon, Dhaka-1207",
                hours: "Mon-Fri from 9am to 5pm."
            }
        },
        electionUpdates: {
            title: "Election Updates",
            sort: {
                label: "Sort By",
                newest: "Newest",
                oldest: "Oldest"
            },
            loading: "Loading updates...",
            empty: "No updates published yet.",
            share: "Share",
            linkCopied: "Link copied to clipboard!",
            readMin: "min read",
            views: "views",
            source: "View Source / Fact Check",
            comments: {
                title: "Comments",
                placeholder: "Share your opinion...",
                submit: "Submit",
                loading: "Loading comments...",
                empty: "No comments yet.",
                loginReq: "Please login to comment."
            }
        },
        auth: {
            loginTitle: "Welcome Back",
            signupTitle: "Create Account",
            loginSubtitle: "Login to access your voting dashboard",
            signupSubtitle: "Sign up to become a responsible voter",
            tabs: {
                login: "Login",
                signup: "Sign Up"
            },
            form: {
                name: "Full Name",
                email: "Email Address",
                phone: "Phone Number (Optional)",
                password: "Password",
                confirmPassword: "Confirm Password",
                forgot: "Forgot Password?",
                loginBtn: "Login",
                signupBtn: "Create Account"
            },
            messages: {
                missing: { title: "Missing Information", msg: "Please fill in all required fields." },
                loginFail: { title: "Login Failed", msg: "Please check your credentials." },
                passwordMismatch: { title: "Password Mismatch", msg: "Passwords do not match!" },
                nameReq: { title: "Name Required", msg: "Please enter your full name." },
                regSuccess: { title: "Registration Successful", msg: "Welcome to Amar Ballot! Please login to continue." },
                regFail: { title: "Registration Failed", msg: "Something went wrong. Please try again." }
            }
        },
        voterGuide: {
            title: "How to Vote",
            steps: [
                { title: "Check Voter List", desc: "Ensure your name is on the voter list for your constituency." },
                { title: "Bring Valid ID", desc: "Carry your National ID (NID) card or Smart Card to the polling station." },
                { title: "Collect Ballot Paper", desc: "Verification officers will check your ID and issue a ballot paper." },
                { title: "Cast Your Vote", desc: "Go to the secret booth, stamp your choice, and drop it in the ballot box." }
            ],
            readyTitle: "Ready to Vote?",
            readyDesc: "Find your nearest polling station now.",
            findBtn: "Find Vote Center"
        },

        rumorPage: {
            title: "Rumor Verification",
            searchPlaceholder: "Search...",
            sort: {
                newest: "Newest",
                oldest: "Oldest"
            },
            status: {
                verified: "Verified",
                fake: "Fake"
            },
            actions: {
                share: "Share",
                source: "View Source",
                comment: "Comment...",
                moreComments: "+{count} more comments",
                viewSource: "View Source / Fact Check",
                copied: "Link copied!"
            },
            loading: "Loading rumors...",
            notFound: "No rumors found."
        },
        nidVerification: {
            title: "Verify Identity",
            subtitle: "Enter NID and select your Native Seat to enable voting.",
            form: {
                nidLabel: "NID Number",
                nidPlaceholder: "e.g. 1956...",
                skipNid: "I don't want to share my NID Number",
                dobLabel: "Date of Birth",
                seatHeader: "Select Your Native Seat",
                division: "Division",
                selectDivision: "Select Division...",
                district: "District",
                selectDistrict: "Select District...",
                area: "Constituency (Seat)",
                selectArea: "Select Seat...",
                permanentWarning: "* This will be your PERMANENT voting seat.",
                verifyBtn: "Verify & Set Native Seat",
                verifying: "Verifying...",
                back: "Back to Dashboard"
            },
            messages: {
                authReq: { title: "Authentication Required", msg: "You must be logged in to verify." },
                missing: { title: "Missing Information", msg: "Please fill in all details including your specific seat." },
                success: { title: "Verification Successful!", msg: "Welcome voter of {area}! You can now access full features." },
                fail: { title: "Verification Failed", msg: "Could not verify your details. Please try again." }
            }
        },

        faq: {
            title: "Frequently Asked Questions",
            questions: [
                { q: "Who is eligible to vote?", a: "Any Bangladeshi citizen who is at least 18 years old and registered in the voter list is eligible to vote." },
                { q: "What documents do I need to bring?", a: "You must bring your National ID (NID) card. In some cases, the Smart Card or a slip provided by the Election Commission is also accepted." },
                { q: "Can I vote from a different location?", a: "No, you must vote at the specific polling center assigned to your registered address." },
                { q: "How do I find my polling center?", a: "You can use the 'Find Vote Center' feature on this website by entering your NID number and date of birth." },
                { q: "What if I lost my NID card?", a: "You should contact the nearest Election Commission office immediately to obtain a duplicate or provisional document for voting." }
            ]
        },
        rules: {
            title: "Election Code of Conduct",
            voterTitle: "For Voters",
            candidateTitle: "For Candidates",
            penaltyTitle: "Penalties for Violations",
            penaltyDesc: "Violating election laws can result in fines, imprisonment, or disqualification. Please report any suspicious activity immediately.",
            voterRules: [
                "Maintain peace and order at the polling station.",
                "Do not carry mobile phones inside the voting booth.",
                "Respect the privacy of other voters.",
                "Follow instructions from election officials."
            ],
            candidateRules: [
                "Campaigning must stop 48 hours before voting begins.",
                "No hate speech or incitement to violence.",
                "Wall writing and excessive noise pollution are prohibited.",
                "Bribery or intimidation of voters is a criminal offense."
            ]
        },
        privacy: {
            title: "Privacy Policy",
            updated: "Last updated: January 2026",
            sections: [
                { title: "1. Information We Collect", content: "We collect information you provide directly to us when you use our services, such as when you search for your voter information or contact us. This may include your NID number and date of birth." },
                { title: "2. How We Use Your Information", content: "We use the information solely to facilitate your access to voter data. We do not store your personal search history or share it with third parties." },
                { title: "3. Data Security", content: "We implement appropriate security measures to protect your data. However, no method of transmission over the Internet is 100% secure." }
            ]
        },
        terms: {
            title: "Terms of Service",
            intro: "Please read these terms carefully before using Amar Ballot.",
            sections: [
                { title: "1. Acceptance of Terms", content: "By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations." },
                { title: "2. Use License", content: "This website is for informational purposes only. You may not use the data for any commercial purpose or attempt to reverse engineer any software contained on the site." },
                { title: "3. Disclaimer", content: "The materials on Amar Ballot are provided on an 'as is' basis. We make no warranties, expressed or implied, regarding the accuracy or reliability of the data." }
            ]
        },
        civicBadge: {
            welcome: "Welcome",
            subtitle: "Your hub for civic engagement, learning, and rewards.",
            tabs: {
                dashboard: "Civic Hero",
                rights: "Voter Rights",
                responsibilities: "Responsibilities",
                nid: "Get NID",
                rules: "Voter Rules"
            },
            hero: {
                superPower: "Your Super Power is to Share Knowledge.",
                enlighten: "Enlighten others. Earn badges. Build a better democracy.",
                referralLabel: "Your Referral Code",
                copy: "Copy",
                levels: {
                    educator: "Civic Educator",
                    responsible: "Responsible Voter",
                    superHero: "Civic Super Hero",
                    refs: "Referrals"
                }
            },
            rights: {
                title: "Voter Rights",
                items: [
                    { title: "Right to Vote Freely", desc: "No one can force you to vote a certain way. You make your own choice." },
                    { title: "Right to Secrecy", desc: "Your vote is private. No one should know who you voted for." },
                    { title: "Right to Information", desc: "You have the right to know about candidates and election issues." },
                    { title: "Accessibility (PWD)", desc: "Polling stations must provide support for persons with disabilities." }
                ]
            },
            responsibilities: {
                title: "Voter Responsibilities",
                items: [
                    { title: "Verify Registration", desc: "Ensure you are registered and eligible to vote." },
                    { title: "Follow the Law", desc: "Comply with all election rules and conduct." },
                    { title: "Avoid Influence", desc: "Vote based on your own views, not external pressure." },
                    { title: "Respect Privacy", desc: "Do not ask others who they voted for." }
                ]
            },
            nid: {
                title: "How to Get a NID",
                steps: [
                    { title: "Online Pre-Registration", desc: "Visit NID website, fill form, submit documents." },
                    { title: "Visit Election Office", desc: "Go to designated center with application copy." },
                    { title: "Biometric Collection", desc: "Provide fingerprints, photo, and signature." },
                    { title: "Verification", desc: "Authorities verify your data and documents." },
                    { title: "Receive NID", desc: "Collect your Smart NID card or download copy." }
                ],
                btn: "Visit NID Website"
            },
            rules: {
                title: "Rules for a Voter",
                items: [
                    { title: "Be Eligible", desc: "Must be a citizen and 18+ years old." },
                    { title: "One Person, One Vote", desc: "Voting more than once is a crime." },
                    { title: "No Campaigning", desc: "No political activity inside polling centers." },
                    { title: "Bring ID", desc: "Carry your NID or voter slip." }
                ]
            },
            quiz: {
                title: "Citizen's Duty?",
                desc: "Answer correctly to earn your daily badge.",
                question: "Which of the following is a citizen's duty?",
                options: ["Pay Taxes", "Ignore Election", "Spread Misinformation", "Avoid Service"],
                success: "Correct! You are a dutiful citizen.",
                failure: "Try again! Think about what helps the nation."
            },
            stats: {
                impact: "Your Impact",
                badges: "Badges Earned",
                referrals: "Referrals",
                verified: "NID Verified",
                leaderboard: "View Leaderboard"
            }
        },
        videoTutorials: {
            title: "VIDEO TUTORIALS",
            subtitle: "Watch tutorials and messages regarding the election and referendum.",
            videos: [
                "The Key to the Country is in Your Hands",
                "How to Cast Your Vote",
                "Message from Chief Advisor Prof. Muhammad Yunus",
                "Election Song for Sylhet Division",
                "Election Song for Rajshahi Division",
                "What is a Referendum and Why? (In 3 Minutes)",
                "Election Song for Chittagong Division",
                "Building the Bangladesh of Martyrs' Dreams",
                "July & Journalism"
            ]
        },
        reportIncident: {
            title: "Report an Incident",
            desc: "Use this form to report code of conduct violations, violence, or voting irregularities. Your identity will remain confidential.",
            form: {
                type: {
                    label: "Incident Type",
                    placeholder: "Select Type...",
                    options: [
                        "Violence / Harassment",
                        "Vote Buying / Bribery",
                        "Fake News / Misinformation",
                        "Polling Station Irregularity"
                    ]
                },
                location: {
                    label: "Location",
                    placeholder: "E.g., Dhanmondi Boys School Center"
                },
                description: {
                    label: "Description",
                    placeholder: "Describe what happened..."
                },
                evidence: {
                    label: "Evidence (Optional)"
                },
                submit: "Submit Report",
                submitting: "Submitting...",
                success: "Report submitted successfully. Thank you for your vigilance."
            }
        },
        statusPage: {
            title: "Result",
            steps: {
                gettingStarted: { title: "Getting Started", desc: "Just started? Learn the basics" },
                notRegistered: { title: "Not Registered", desc: "Not registered, apply for NID" },
                partiallyReady: { title: "Partially Ready", desc: "More to do! Complete steps" },
                almostReady: { title: "Almost Ready", desc: "Just a little left! Check missing info" },
                readyToVote: { title: "Ready to Vote", desc: "You're ready, go vote!" }
            }
        },
        coursePage: {
            title: "Voter Education Course",
            desc: "Complete this free mini-course to become a certified 'Civic Hero'. Learn about your rights and the voting process.",
            modules: [
                {
                    title: "Module 1: Understanding Democracy",
                    desc: "Learn the basics of democratic rights and why your vote matters.",
                    duration: "10 mins",
                    lessons: ["What is Democracy?", "Rights & Responsibilities", "The Power of One Vote"]
                },
                {
                    title: "Module 2: How to Register",
                    desc: "Step-by-step guide to becoming a registered voter in Bangladesh.",
                    duration: "15 mins",
                    lessons: ["Eligibility Check", "Required Documents", "Online Registration Process"]
                },
                {
                    title: "Module 3: Election Day Process",
                    desc: "Everything you need to know about casting your ballot correctly.",
                    duration: "12 mins",
                    lessons: ["Finding Your Center", "Ballot Marking Rules", "Do's and Don'ts"]
                }
            ],
            cta: {
                title: "Ready to test your knowledge?",
                desc: "Take the final quiz after completing all modules to earn your digital Civic Hero Badge!",
                btn: "Start Final Quiz"
            }
        },
        aboutUs: {
            title: "About Amar Ballot",
            desc: "Empowering citizens with information to make every vote count. We are building a smarter, more transparent democratic process for Bangladesh.",
            features: {
                mission: { title: "Our Mission", desc: "To bridge the gap between voters and information, ensuring every citizen has easy access to candidate details, voting centers, and election procedures." },
                vision: { title: "Community First", desc: "We believe in the power of an informed community. Amar Ballot is designed to be accessible, unbiased, and user-friendly for all ages." },
                trust: { title: "Trusted Data", desc: "We verify all information against official sources to combat misinformation and provide you with data you can trust during election season." }
            },
            story: {
                title: "Why We Started",
                desc: "Voting shouldn't be complicated. We noticed that many citizens, especially first-time voters, struggle to find their polling centers or know who is running in their constituency. Amar Ballot was born from a desire to simplify this journey and encourage active civic participation.",
                alt: "Team Illustration"
            }
        },
        candidateList: {
            title: "Public Survey 2026",
            subtitle: "Live Election Public Survey Results",
            totalVotes: "Total Votes",
            download: "Download Result Card",
            reviews: {
                title: "Voter Reviews",
                sort: "Sort By",
                newest: "Newest First",
                oldest: "Oldest First",
                allParties: "All Parties",
                headers: {
                    voter: "Voter",
                    seat: "Seat",
                    party: "Supporting Party",
                    review: "Opinion / Comment",
                    time: "Time"
                },
                empty: "No reviews match your filters.",
                noVotes: "No votes cast in this election yet."
            },
            filters: {
                division: "All Divisions",
                district: "All Districts",
                area: "All Seats",
                reset: "Reset Filters"
            },
            resultTitles: {
                area: "Result: {area} (Seat)",
                district: "Result: {district} (District)",
                division: "Result: {division} (Division)",
                national: "National Public Survey Result"
            }
        },
        dashboard: {
            greetings: {
                morning: "Good Morning",
                afternoon: "Good Afternoon",
                evening: "Good Evening"
            },
            logout: "Sign Out",
            activeVoter: "Active Voter",
            nidCard: "National Identity Card",
            biometricVerified: "Biometric Verified",
            profile: {
                nid: "NID Number",
                dob: "Date of Birth",
                district: "District",
                area: "Voter Area"
            },
            nextElection: "Next Election In",
            timeUnits: {
                days: "Days",
                hours: "Hours",
                mins: "Mins"
            },
            electionName: "Parliamentary General Election",
            electionDate: "Scheduled for February 12, 2026",
            eligibility: "Voting Eligibility",
            passed: "Passed",
            voteNow: {
                title: "Cast Your Vote",
                desc: "Express your opinion for the National Election 2026. Your vote is crucial.",
                btn: "Vote Now"
            },
            voted: {
                title: "Vote Received",
                desc: "Thank you! You have successfully cast your vote. Click below to view results.",
                btn: "View Results"
            },
            quickActions: {
                title: "Quick Actions",
                voteCenter: {
                    title: "Vote Center",
                    desc: "Locate your center"
                },
                candidates: {
                    title: "Candidates",
                    desc: "Know who to vote"
                },
                howToVote: {
                    title: "How to Vote",
                    desc: "Video tutorials"
                },
                news: {
                    title: "News",
                    desc: "Latest announcements"
                }
            }
        },
        services: {
            title: "Our Services",
            subtitle: "Everything you need to be a confident and responsible voter.",
            items: {
                locator: {
                    title: "Vote Center Locator",
                    desc: "Find your designated polling station instantly by entering your NID or voter details."
                },
                candidates: {
                    title: "Candidate Information",
                    desc: "View detailed profiles of all candidates in your area, including their background."
                },
                education: {
                    title: "Voter Education",
                    desc: "Access video tutorials and guides on how to vote, required documents, and rules."
                },
                rumor: {
                    title: "Rumor Check",
                    desc: "Verify viral news and claims regarding the election. Separate fact from fiction."
                },
                sample: {
                    title: "Sample Ballot",
                    desc: "Practice voting with a digital sample ballot customized for your constituency."
                },
                assistant: {
                    title: "Digital Assistant",
                    desc: "Our AI assistant 'Prerona' is available 24/7 to answer your queries."
                }
            },
            cta: {
                title: "Need personalized help?",
                btn: "Chat with Prerona"
            }
        },
        admin: {
            nav: {
                dashboard: "Dashboard",
                users: "Users",
                candidates: "Candidates",
                centers: "Vote Centers",
                updates: "Updates",
                content: "Content",
                reports: "Reports",
                rumors: "Rumor Check",
                trainAI: "Train AI",
                logout: "Sign Out",
                menu: "Menu"
            },
            title: "Dashboard Overview",
            welcome: "Welcome back",
            fixSchema: "Fix DB Schema",
            cards: {
                users: "Total Users",
                candidates: "Total Candidates",
                centers: "Vote Centers",
                rumors: "Rumor Control",
                updates: "Election Updates",
                incidents: "Incident Reports"
            },
            cardSubtitles: {
                manageNews: "Manage News",
                factChecks: "Fact Checks",
                safety: "Safety Reports"
            },
            aiCache: {
                title: "AI Knowledge Cache",
                subtitle: "Updates, Rumors, and Trained AI Data",
                forceRefresh: "Force Refresh",
                setupCache: "Setup Cache",
                addKnowledge: "Add Knowledge",
                refreshSuccess: "✅ Cache refreshed! New data loaded from database.",
                setupSuccess: "✅ Cache setup complete! AI is ready with latest data."
            },
            centers: {
                title: "Manage Vote Centers",
                subtitle: "Add, edit, or remove polling stations",
                add: "Add Center",
                search: "Search centers by name or area...",
                table: {
                    name: "Center Name",
                    location: "Location (Constituency)",
                    capacity: "Capacity",
                    coordinates: "Coordinates",
                    actions: "Actions",
                    loading: "Loading centers...",
                    empty: "No vote centers found."
                },
                form: {
                    addTitle: "Add Vote Center",
                    editTitle: "Edit Vote Center",
                    nameEn: "Center Name (English)",
                    nameBn: "Center Name (Bangla)",
                    addressEn: "Address (English)",
                    addressBn: "Address (Bangla)",
                    capacity: "Capacity (Voters)",
                    lat: "Latitude",
                    lng: "Longitude",
                    division: "Division",
                    district: "District",
                    area: "Constituency (Area)",
                    selectDivision: "Select Division",
                    selectDistrict: "Select District",
                    selectSeat: "Select Seat",
                    cancel: "Cancel",
                    save: "Save Center",
                    update: "Update Center"
                },
                alerts: {
                    deleteConfirm: "Are you sure you want to delete this vote center?",
                    fail: "Failed to save vote center"
                }
            },
            users: {
                title: "Manage Users",
                subtitle: "View and manage registered voters",
                total: "Total Users",
                search: "Search by name, email, or NID...",
                table: {
                    status: "Status",
                    details: "User Details",
                    nid: "NID Info",
                    contact: "Contact",
                    actions: "Actions",
                    loading: "Loading users...",
                    empty: "No users found.",
                    verified: "Verified",
                    unverified: "Unverified",
                    notProvided: "Not provided"
                },
                alerts: {
                    deleteConfirm: "Are you sure you want to delete this user? This action cannot be undone."
                }
            },
            candidates: {
                title: "Manage Candidates",
                subtitle: "Add, edit, or remove election candidates",
                add: "Add Candidate",
                search: "Search candidates by name, party, or area...",
                table: {
                    valid: "Valid",
                    name: "Name / Party",
                    area: "Constituency",
                    symbol: "Symbol",
                    actions: "Actions",
                    loading: "Loading candidates...",
                    empty: "No candidates found."
                },
                form: {
                    addTitle: "Add New Candidate",
                    editTitle: "Edit Candidate",
                    nameEn: "Full Name (English)",
                    nameBn: "Full Name (Bangla)",
                    party: "Party Name",
                    partyBn: "Party Name (Bangla)",
                    symbol: "Symbol",
                    age: "Age",
                    education: "Education",
                    image: "Image URL",
                    alliance: "Alliance",
                    manifesto: "Manifesto",
                    division: "Division",
                    district: "District",
                    area: "Constituency (Area)",
                    selectDivision: "Select Division",
                    selectDistrict: "Select District",
                    selectSeat: "Select Seat",
                    cancel: "Cancel",
                    save: "Save Candidate",
                    update: "Update Candidate"
                },
                alerts: {
                    deleteConfirm: "Are you sure you want to delete this candidate?",
                    fail: "Failed to save candidate"
                }
            },
            updates: {
                title: "Election Updates",
                subtitle: "Post news and announcements",
                add: "Post Update",
                loading: "Loading updates...",
                empty: "No updates posted yet.",
                form: {
                    addTitle: "Post New Update",
                    editTitle: "Edit Update",
                    title: "Title",
                    author: "Author Name",
                    tags: "Tags (comma separated)",
                    readTime: "Read Time (mins)",
                    sourceUrl: "Source URL",
                    image: "Attach Image",
                    content: "Details",
                    save: "Post Update",
                    update: "Update Post",
                    cancel: "Cancel"
                }
            },
            rumors: {
                title: "Rumor Verification",
                subtitle: "Manage fact-checking database",
                add: "Add Check",
                search: "Search rumors...",
                loading: "Loading rumors...",
                empty: "No rumors found.",
                status: {
                    fake: "Fake / Rumor",
                    verified: "Truth / Verified",
                    pending: "Pending"
                },
                filter: {
                    newest: "Newest",
                    oldest: "Oldest"
                },
                table: {
                    verified: "Verified",
                    fake: "Fake / Rumor",
                    pending: "Pending",
                    source: "View Source"
                },
                toggle: {
                    more: "Read More",
                    less: "Show Less"
                },
                alerts: {
                    deleteConfirm: "Are you sure you want to delete this rumor?",
                    fail: "Failed to save rumor"
                },
                form: {
                    addTitle: "Add Fact Check",
                    editTitle: "Edit Fact Check",
                    title: "Rumor/Topic Title",
                    verdict: "Verdict",
                    explanation: "Explanation",
                    source: "Source URL (Optional)",
                    sourceUrl: "Source URL",
                    image: "Evidence Image (Optional)",
                    save: "Save Record",
                    saveResponse: "Save Record",
                    paste: "Paste image (Ctrl+V)",
                    upload: "or upload below"
                }
            },
            incidents: {
                title: "Incident Reports",
                loading: "Loading incidents...",
                empty: "No incidents reported yet.",
                resolve: "Mark as Resolved",
                delete: "Delete Report"
            },
            trainAI: {
                title: "Train AI",
                subtitle: "Teach AI to answer your way",
                buttons: {
                    add: "New",
                    import: "JSON",
                    duplicates: "Duplicates",
                    save: "Save",
                    saving: "Saving..."
                },
                stats: {
                    total: "Total Questions",
                    active: "Active",
                    inactive: "Inactive",
                    divisions: "Categories",
                    autoLearn: "Auto-learn"
                },
                filter: {
                    all: "All Categories",
                    only: "Only"
                },
                search: "Search questions or answers...",
                empty: {
                    title: "No Knowledge Found",
                    subtitle: "Add some questions to train the AI."
                },
                table: {
                    question: "Question",
                    answer: "Answer"
                },
                import: {
                    title: "Import JSON",
                    upload: "Upload JSON File",
                    or: "OR",
                    paste: "Paste JSON Text",
                    sample: "View Sample Format",
                    useSample: "Use Sample",
                    importing: "Importing...",
                    importAction: "Import Data",
                    success: "Import Successful",
                    error: "Import Failed",
                    imported: "Imported",
                    failed: "Failed",
                    errorDetails: "Error Details",
                    close: "Close"
                },
                form: {
                    addTitle: "Add New Question",
                    editTitle: "Edit Question",
                    division: "Category",
                    question: "Question",
                    questionPlaceholder: "e.g. How do I vote?",
                    answer: "Answer",
                    answerPlaceholder: "e.g. You can vote by...",
                    keywords: "Keywords (Optional)",
                    keywordsHelp: "Comma separated keywords for better matching",
                    priority: "Priority",
                    priorityHelp: "Higher number means higher priority (0-100)",
                    save: "Save",
                    update: "Update",
                    cancel: "Cancel"
                },
                alerts: {
                    required: "Please fill in all required fields",
                    deleteConfirm: "Are you sure you want to delete this?",
                    duplicateConfirm: "Duplicates will be removed. Only highest priority copy will be kept. Are you sure?"
                }
            },
            content: {
                title: "Page Content",
                subtitle: "Manage website content across different pages",
                sections: "Sections",
                updated: "Updated",
                items: "items",
                never: "Never",
                branding: { title: "Branding", desc: "Logo and Favicon" },
                about: { title: "About Page", desc: "Mission, Vision, Story" },
                contact: { title: "Contact Page", desc: "Emails, Phone, Address" },
                services: { title: "Services Page", desc: "6 Service Items" },
                citizen: { title: "Good Citizen Message", desc: "Inspiring Message" },
                tips: {
                    title: "Quick Tips",
                    list: [
                        "Click any section to edit its content",
                        "All changes are auto-saved as you type",
                        "Content supports both English and Bengali",
                        "Changes appear on the live site immediately"
                    ]
                }
            }
        },
        common: {
            loading: "Loading...",
            saved: "Saved successfully",
            error: "An error occurred",
            submit: "Submit",
            cancel: "Cancel",
            edit: "Edit",
            delete: "Delete",
            view: "View"
        }
    },
    bn: {
        nav: {
            home: "হোম",
            voteCenter: "ভোট কেন্দ্র",
            candidates: "জনমত জরিপ ২০২৬",
            login: "লগ ইন",
            signup: "নিবন্ধন",
            map: "নেভিগেশন ম্যাপ"
        },
        home: {
            seo: {
                title: "হোম",
                desc: "আপনার ভোট, আপনার অধিকার।"
            },
            readyToVote: "ভোট দিতে প্রস্তুত!",
            smartAvatar: {
                bubble: "হ্যালো! 👋",
                hello: "হ্যালো,",
                name: "আমি প্রেরণা",
                helper: "আমি আপনাকে সাহায্য করবো",
                role: "একজন দায়িত্বশীল ভোটার হতে",
                chat: "আমার সাথে কথা বলুন"
            },
            quickLinks: {
                updates: "নির্বাচন আপডেট",
                center: "আপনার ভোট কেন্দ্র",
                notice: "নোটিশ",
                candidateList: "জনমত জরিপ ২০২৬",
                rumor: "গুজব যাচাই",
                tutorials: "ভিডিও টিউটোরিয়াল",
                badge: "সচেতন নাগরিক ব্যাজ"
            }
        },
        eligibility: {
            title: "যোগ্যতা যাচাই করুন",
            headerMain: "আমার ভোট",
            headerSub: "আমার ভবিষ্যৎ...",
            question: "আপনি কি একজন",
            voter: "ভোটার",
            checklist: {
                nid: "আমার এনআইডি আছে",
                polling: "আমি আমার ভোট কেন্দ্র জানি",
                steps: "আমি ভোট প্রদানের ধাপগুলো জানি",
                rights: "আমি আমার ভোটের অধিকার জানি",
                rules: "আমি নির্বাচনের নিয়মাবলী সম্পর্কে সচেতন"
            },
            resultBtn: "ফলাফল",
            modal: {
                congrats: "🎉 অভিনন্দন",
                suggestions: "💡 পরামর্শ",
                success: "🎖️ আপনি এখন দায়িত্বশীল নাগরিক!",
                noNid: {
                    title: "এনআইডি কার্ড নেই?",
                    desc: "নতুন এনআইডি আবেদনের জন্য নির্বাচন কমিশনের ওয়েবসাইটে যান।",
                    btn: "আবেদন করুন"
                },
                noCenter: {
                    title: "ভোট কেন্দ্র জানেন না?",
                    desc: "আপনার নিকটস্থ ভোট কেন্দ্র খুঁজে বের করুন।",
                    btn: "কেন্দ্র খুঁজুন"
                },
                noSteps: {
                    title: "ভোট প্রদানের নিয়ম জানেন না?",
                    desc: "আমাদের ভিডিও টিউটোরিয়াল দেখে জেনে নিন।",
                    btn: "ভিডিও দেখুন"
                },
                civic: {
                    title: "নাগরিক দায়িত্ব সম্পর্কে জানুন",
                    desc: "নাগরিক ব্যাজ সেকশনে আপনার অধিকার ও দায়িত্ব জানুন।",
                    btn: "দায়িত্ব জানুন"
                }
            }
        },
        emergency: {
            title: "জরুরী যোগাযোগ",
            EC: "নির্বাচন কমিশন",
            Police: "নিকটস্থ পুলিশ",
            Ambulance: "অ্যাম্বুলেন্স সার্ভিস"
        },
        map: {
            title: "নেভিগেশন ম্যাপ"
        },
        contact: {
            title: "যোগাযোগ করুন",
            subtitle: "আপনার ভোটাধিকার প্রয়োগে সাহায্য করতে আমরা এখানে আছি।",
            form: {
                title: "আমাদের বার্তা পাঠান",
                name: "আপনার নাম",
                placeholderName: "আপনার পুরো নাম লিখুন",
                email: "ইমেইল ঠিকানা",
                placeholderEmail: "যেমন: adnan@example.com",
                subject: "বিষয়",
                placeholderSubject: "কিভাবে আমরা সাহায্য করতে পারি?",
                message: "বার্তা",
                placeholderMessage: "আপনার বার্তা এখানে লিখুন...",
                send: "বার্তা পাঠান",
                sending: "পাঠানো হচ্ছে...",
                success: "বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
                error: "বার্তা পাঠাতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
            },
            info: {
                emailTitle: "ইমেইল করুন",
                callTitle: "কল করুন",
                visitTitle: "অফিসে আসুন",
                address: "নির্বাচন ভবন,\nআগারগাঁও, ঢাকা-১২০৭",
                hours: "সোম-শুক্র সকাল ৯টা থেকে বিকাল ৫টা"
            }
        },
        electionUpdates: {
            title: "নির্বাচনী আপডেট",
            sort: {
                label: "সাজান",
                newest: "সর্বশেষ",
                oldest: "পুরাতন"
            },
            loading: "আপডেট লোড হচ্ছে...",
            empty: "কোনো আপডেট প্রকাশিত হয়নি।",
            share: "শেয়ার করুন",
            linkCopied: "লিংক কপি হয়েছে!",
            readMin: "মিনিট পড়ুন",
            views: "বার দেখা হয়েছে",
            source: "সোর্স / ফ্যাক্ট চেক দেখুন",
            comments: {
                title: "মন্তব্য",
                placeholder: "আপনার মতামত জানান...",
                submit: "পাঠান",
                loading: "মন্তব্য লোড হচ্ছে...",
                empty: "এখনো কোনো মন্তব্য নেই।",
                loginReq: "মন্তব্য করতে লগ ইন করুন।"
            }
        },
        auth: {
            loginTitle: "স্বাগতম",
            signupTitle: "অ্যাকাউন্ট তৈরি করুন",
            loginSubtitle: "আপনার ভোটিং ড্যাশবোর্ড অ্যাক্সেস করতে লগ ইন করুন",
            signupSubtitle: "একজন দায়িত্বশীল ভোটার হতে সাইন আপ করুন",
            tabs: {
                login: "লগ ইন",
                signup: "সাইন আপ"
            },
            form: {
                name: "পুরো নাম",
                email: "ইমেইল ঠিকানা",
                phone: "ফোন নম্বর (ঐচ্ছিক)",
                password: "পাসওয়ার্ড",
                confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
                forgot: "পাসওয়ার্ড ভুলে গেছেন?",
                loginBtn: "লগ ইন",
                signupBtn: "অ্যাকাউন্ট তৈরি করুন"
            },
            messages: {
                missing: { title: "তথ্য অনুপস্থিত", msg: "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।" },
                loginFail: { title: "লগইন ব্যর্থ হয়েছে", msg: "অনুগ্রহ করে আপনার তথ্য যাচাই করুন।" },
                passwordMismatch: { title: "পাসওয়ার্ড মিলছে না", msg: "পাসওয়ার্ড দুটি একই হতে হবে!" },
                nameReq: { title: "নাম প্রয়োজন", msg: "অনুগ্রহ করে আপনার পুরো নাম লিখুন।" },
                regSuccess: { title: "নিবন্ধন সফল", msg: "অমর ব্যালটে স্বাগতম! অনুগ্রহ করে লগ ইন করুন।" },
                regFail: { title: "নিবন্ধন ব্যর্থ", msg: "কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" }
            }
        },
        voterGuide: {
            title: "কিভাবে ভোট দেবেন",
            steps: [
                { title: "ভোটার তালিকা যাচাই", desc: "আপনার এলাকার ভোটার তালিকায় আপনার নাম আছে কিনা নিশ্চিত করুন।" },
                { title: "বৈধ পরিচয়পত্র আনুন", desc: "ভোটকেন্দ্রে আপনার জাতীয় পরিচয়পত্র (NID) বা স্মার্ট কার্ড সাথে আনুন।" },
                { title: "ব্যালট পেপার সংগ্রহ করুন", desc: "কর্মকর্তারা আপনার পরিচয় যাচাই করবেন এবং ব্যালট পেপার প্রদান করবেন।" },
                { title: "আপনার ভোট দিন", desc: "গোপন কক্ষে যান, আপনার পছন্দে সিল দিন এবং ব্যালট বক্সে ফেলুন।" }
            ],
            readyTitle: "ভোট দিতে প্রস্তুত?",
            readyDesc: "এখনই আপনার নিকটস্থ ভোটকেন্দ্র খুঁজুন।",
            findBtn: "ভোট কেন্দ্র খুঁজুন"
        },

        rumorPage: {
            title: "গুজব যাচাই",
            searchPlaceholder: "অনুসন্ধান...",
            sort: {
                newest: "সর্বশেষ",
                oldest: "পুরাতন"
            },
            status: {
                verified: "সঠিক",
                fake: "গুজব"
            },
            actions: {
                share: "শেয়ার করুন",
                source: "সোর্স দেখুন",
                comment: "মন্তব্য করুন...",
                moreComments: "+{count} আরো মন্তব্য",
                viewSource: "সোর্স / ফ্যাক্ট চেক দেখুন",
                copied: "লিংক কপি হয়েছে!"
            },
            loading: "গুজব লোড হচ্ছে...",
            notFound: "কোনো গুজব পাওয়া যায়নি।"
        },
        nidVerification: {
            title: "পরিচয় যাচাইকরণ",
            subtitle: "ভোট দেওয়ার জন্য আপনার এনআইডি ও নিজ আসন নির্বাচন করুন।",
            form: {
                nidLabel: "জাতীয় পরিচয়পত্র নম্বর",
                nidPlaceholder: "যেমন: ১৯৫৬...",
                skipNid: "আমি আমার এনআইডি নম্বর শেয়ার করতে চাই না",
                dobLabel: "জন্ম তারিখ",
                seatHeader: "আপনার ভোটের এলাকা নির্বাচন করুন",
                division: "বিভাগ",
                selectDivision: "বিভাগ নির্বাচন করুন...",
                district: "জেলা",
                selectDistrict: "জেলা নির্বাচন করুন...",
                area: "আসন (Constituency)",
                selectArea: "আসন নির্বাচন করুন...",
                permanentWarning: "* এটি আপনার স্থায়ী ভোটের আসন হিসেবে গণ্য হবে।",
                verifyBtn: "যাচাই করুন ও জমা দিন",
                verifying: "যাচাই করা হচ্ছে...",
                back: "ড্যাশবোর্ডে ফিরে যান"
            },
            messages: {
                authReq: { title: "লগইন প্রয়োজন", msg: "যাচাই করার জন্য আপনাকে অবশ্যই লগ ইন করতে হবে।" },
                missing: { title: "তথ্য অনুপস্থিত", msg: "অনুগ্রহ করে আপনার নির্দিষ্ট আসন সহ সমস্ত বিবরণ পূরণ করুন।" },
                success: { title: "যাচাইকরণ সফল!", msg: "{area}-এর ভোটার আপনাকে স্বাগতম! আপনি এখন সম্পূর্ণ ফিচার ব্যবহার করতে পারবেন।" },
                fail: { title: "যাচাইকরণ ব্যর্থ", msg: "আপনার বিবরণ যাচাই করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।" }
            }
        },

        faq: {
            title: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
            questions: [
                { q: "কারা ভোট দেওয়ার যোগ্য?", a: "যেকোনো বাংলাদেশি নাগরিক যার বয়স অন্তত ১৮ বছর এবং ভোটার তালিকায় নিবন্ধিত।" },
                { q: "সাথে কি কি নথি আনতে হবে?", a: "আপনাকে অবশ্যই জাতীয় পরিচয়পত্র (NID) আনতে হবে। কিছু ক্ষেত্রে স্মার্ট কার্ড বা নির্বাচন কমিশনের স্লিপও গ্রহণ করা হয়।" },
                { q: "আমি কি অন্য কোনো জায়গা থেকে ভোট দিতে পারি?", a: "না, আপনাকে অবশ্যই আপনার নিবন্ধিত ঠিকানার নির্দিষ্ট ভোটকেন্দ্রেই ভোট দিতে হবে।" },
                { q: "আমি আমার ভোটকেন্দ্র কিভাবে খুঁজে পাব?", a: "আপনি এই ওয়েবসাইটের 'ভোট কেন্দ্র খুঁজুন' অপশন ব্যবহার করে এনআইডি নম্বর এবং জন্ম তারিখ দিয়ে এটি জানতে পারবেন।" },
                { q: "আমার এনআইডি কার্ড হারিয়ে গেলে কি করব?", a: "ভোট দেওয়ার জন্য ডুপ্লিকেট বা সাময়িক নথির জন্য অবিলম্বে নিকটস্থ নির্বাচন কমিশন অফিসে যোগাযোগ করুন।" }
            ]
        },
        rules: {
            title: "নির্বাচনী আচরণবিধি",
            voterTitle: "ভোটারদের জন্য",
            candidateTitle: "প্রার্থীদের জন্য",
            penaltyTitle: "লংঘনের শাস্তি",
            penaltyDesc: "নির্বাচনী আইন লঙ্ঘন করলে জরিমানা, কারাদণ্ড বা প্রার্থিতা বাতিল হতে পারে। সন্দেহজনক কিছু দেখলে অবিলম্বে জানান।",
            voterRules: [
                "ভোটকেন্দ্রে শান্তি ও শৃঙ্খলা বজায় রাখুন।",
                "ভোটকক্ষে মোবাইল ফোন বহন করবেন না।",
                "অন্য ভোটারদের গোপনীয়তা শ্রদ্ধা করুন।",
                "নির্বাচন কর্মকর্তাদের নির্দেশনা মেনে চলুন।"
            ],
            candidateRules: [
                "ভোটগ্রহণের ৪৮ ঘণ্টা আগে প্রচার প্রচারণা বন্ধ করতে হবে।",
                "কোনো বিদ্বেষমূলক বক্তব্য বা সহিংসতায় উসকানি দেওয়া যাবে না।",
                "দেয়াল লিখন এবং অতিরিক্ত শব্দ দূষণ নিষিদ্ধ।",
                "ভোটারদের ঘুষ দেওয়া বা ভয় দেখানো ফৌজদারি অপরাধ।"
            ]
        },
        privacy: {
            title: "গোপনীয়তা নীতি",
            updated: "সর্বশেষ আপডেট: জানুয়ারি ২০২৬",
            sections: [
                { title: "১. আমরা যে তথ্য সংগ্রহ করি", content: "আপনি যখন আমাদের পরিষেবাগুলি ব্যবহার করেন, যেমন ভোটার তথ্য অনুসন্ধান বা আমাদের সাথে যোগাযোগ করার সময় আপনি সরাসরি যে তথ্য প্রদান করেন তা আমরা সংগ্রহ করি। এতে আপনার এনআইডি নম্বর এবং জন্ম তারিখ অন্তর্ভুক্ত থাকতে পারে।" },
                { title: "২. আমরা কীভাবে আপনার তথ্য ব্যবহার করি", content: "আমরা তথ্যটি শুধুমাত্র আপনার ভোটার ডেটা অ্যাক্সেস সহজতর করার জন্য ব্যবহার করি। আমরা আপনার ব্যক্তিগত অনুসন্ধানের ইতিহাস সংরক্ষণ করি না বা তৃতীয় পক্ষের সাথে শেয়ার করি না।" },
                { title: "৩. ডেটা নিরাপত্তা", content: "আমরা আপনার ডেটা সুরক্ষার জন্য উপযুক্ত নিরাপত্তা ব্যবস্থা গ্রহণ করি। তবে, ইন্টারনেটের মাধ্যমে কোনো ট্রান্সমিশন পদ্ধতিই ১০০% নিরাপদ নয়।" }
            ]
        },
        terms: {
            title: "ব্যবহারের শর্তাবলী",
            intro: "অমর ব্যালট ব্যবহার করার আগে অনুগ্রহ করে এই শর্তাবলী মনোযোগ সহকারে পড়ুন।",
            sections: [
                { title: "১. শর্তাবলী গ্রহণ", content: "এই ওয়েবসাইটটি অ্যাক্সেস করার মাধ্যমে, আপনি এই পরিষেবার শর্তাবলী এবং সমস্ত প্রযোজ্য আইন ও প্রবিধান দ্বারা আবদ্ধ হতে সম্মত হন।" },
                { title: "২. ব্যবহারের লাইসেন্স", content: "এই ওয়েবসাইটটি শুধুমাত্র তথ্যমূলক উদ্দেশ্যে। আপনি কোনো বাণিজ্যিক উদ্দেশ্যে ডেটা ব্যবহার করতে পারবেন না বা সাইটে থাকা কোনো সফটওয়্যার রিভার্স ইঞ্জিনিয়ারিং করার চেষ্টা করতে পারবেন না।" },
                { title: "৩. দাবিত্যাগ", content: "অমর ব্যালটের উপকরণগুলি 'যেমন আছে' ভিত্তিতে প্রদান করা হয়। আমরা ডেটার নির্ভুলতা বা নির্ভরযোগ্যতা সম্পর্কে কোনো প্রকাশ্য বা গোপন ওয়ারেন্টি প্রদান করি না।" }
            ]
        },
        civicBadge: {
            welcome: "স্বাগতম",
            subtitle: "নাগরিক সম্পৃক্ততা, শিক্ষা এবং পুরস্কারের জন্য আপনার কেন্দ্র।",
            tabs: {
                dashboard: "সচেতন নাগরিক",
                rights: "ভোটারের অধিকার",
                responsibilities: "দায়িত্বসমূহ",
                nid: "এনআইডি পান",
                rules: "নির্বাচনী নিয়ম"
            },
            hero: {
                superPower: "আপনার সুপার পাওয়ার হলো জ্ঞান শেয়ার করা।",
                enlighten: "অন্যদের সচেতন করুন। ব্যাজ অর্জন করুন। একটি উন্নত গণতন্ত্র গড়ুন।",
                referralLabel: "আপনার রেফারেল কোড",
                copy: "কপি করুন",
                levels: {
                    educator: "সিভিক এডুকেটর",
                    responsible: "দায়িত্বশীল ভোটার",
                    superHero: "সিভিক সুপার হিরো",
                    refs: "রেফারেল"
                }
            },
            rights: {
                title: "ভোটারের অধিকার",
                items: [
                    { title: "স্বাধীনভাবে ভোট দেওয়ার অধিকার", desc: "কেউ আপনাকে নির্দিষ্টভাবে ভোট দিতে বাধ্য করতে পারে না। আপনি আপনার নিজের পছন্দ করবেন।" },
                    { title: "গোপনীয়তার অধিকার", desc: "আপনার ভোট গোপন। আপনি কাকে ভোট দিয়েছেন তা কারো জানা উচিত নয়।" },
                    { title: "তথ্যের অধিকার", desc: "প্রার্থী এবং নির্বাচনী বিষয় সম্পর্কে জানার অধিকার আপনার আছে।" },
                    { title: "অ্যাক্সেসযোগ্যতা (PWD)", desc: "ভোটকেন্দ্রে প্রতিবন্ধী ব্যক্তিদের জন্য সহায়তার ব্যবস্থা থাকতে হবে।" }
                ]
            },
            responsibilities: {
                title: "ভোটারের দায়িত্ব",
                items: [
                    { title: "নিবন্ধন যাচাই করুন", desc: "নিশ্চিত করুন যে আপনি নিবন্ধিত এবং ভোট দেওয়ার যোগ্য।" },
                    { title: "আইন মেনে চলুন", desc: "নির্বাচনের সকল নিয়ম ও আচরণবিধি মেনে চলুন।" },
                    { title: "প্রভাব এড়িয়ে চলুন", desc: "বাহ্যিক চাপে নয়, নিজের মতামতের ভিত্তিতে ভোট দিন।" },
                    { title: "গোপনীয়তা শ্রদ্ধা করুন", desc: "অন্যদের জিজ্ঞাসা করবেন না তারা কাকে ভোট দিয়েছে।" }
                ]
            },
            nid: {
                title: "কিভাবে এনআইডি পাবেন",
                steps: [
                    { title: "অনলাইন প্রাক-নিবন্ধন", desc: "এনআইডি ওয়েবসাইট ভিজিট করুন, ফর্ম পূরণ করুন, নথি জমা দিন।" },
                    { title: "নির্বাচন অফিস ভিজিট", desc: "আবেদনের কপি নিয়ে নির্ধারিত কেন্দ্রে যান।" },
                    { title: "বায়োমেট্রিক সংগ্রহ", desc: "আঙ্গুলের ছাপ, ছবি এবং স্বাক্ষর প্রদান করুন।" },
                    { title: "যাচাইকরণ", desc: "কর্তৃপক্ষ আপনার তথ্য এবং নথি যাচাই করবে।" },
                    { title: "এনআইডি গ্রহণ", desc: "আপনার স্মার্ট এনআইডি কার্ড সংগ্রহ করুন বা কপি ডাউনলোড করুন।" }
                ],
                btn: "এনআইডি ওয়েবসাইট ভিজিট"
            },
            rules: {
                title: "ভোটারের জন্য নিয়মাবলী",
                items: [
                    { title: "যোগ্য হতে হবে", desc: "অবশ্যই নাগরিক এবং ১৮+ বছর বয়সী হতে হবে।" },
                    { title: "এক ব্যক্তি, এক ভোট", desc: "একাধিকবার ভোট দেওয়া অপরাধ।" },
                    { title: "প্রচারণা নিষেধ", desc: "ভোটকেন্দ্রের ভেতরে কোনো রাজনৈতিক কার্যকলাপ চলবে না।" },
                    { title: "আইডি আনুন", desc: "আপনার এনআইডি বা ভোটার স্লিপ সাথে রাখুন।" }
                ]
            },
            quiz: {
                title: "নাগরিক দায়িত্ব?",
                desc: "দৈনিক ব্যাজ পেতে সঠিক উত্তর দিন।",
                question: "নিচের কোনটি একজন নাগরিকের দায়িত্ব?",
                options: ["কর প্রদান", "নির্বাচন উপেক্ষা করা", "গুজব ছড়ানো", "সেবা এড়িয়ে চলা"],
                success: "সঠিক! আপনি একজন দায়িত্বশীল নাগরিক।",
                failure: "আবার চেষ্টা করুন! দেশের জন্য কোনটি ভালো তা ভাবুন।"
            },
            stats: {
                impact: "আপনার প্রভাব",
                badges: "অর্জিত ব্যাজ",
                referrals: "রেফারেল",
                verified: "এনআইডি যাচাইকৃত",
                leaderboard: "লিডারবোর্ড দেখুন"
            }
        },
        videoTutorials: {
            title: "ভিডিও টিউটোরিয়াল",
            subtitle: "নির্বাচন ও গণভোট সম্পর্কিত টিউটোরিয়াল এবং বার্তা দেখুন",
            videos: [
                "দেশের চাবি আপনার হাতে",
                "যেভাবে ভোট দিবেন",
                "গণভোটে হ্যাঁ সিল দেয়ার আহ্বান জানিয়ে মাননীয় প্রধান উপদেষ্টা প্রফেসর মুহাম্মদ ইউনূসের বার্তা",
                "আগামী সংসদ নির্বাচন এবং গণভোট উপলক্ষে সিলেট বিভাগের জন্য নির্মিত গান",
                "আগামী সংসদ নির্বাচন এবং গণভোট উপলক্ষে রাজশাহী বিভাগের জন্য নির্মিত গান",
                "মাত্র তিন মিনিটে জেনে নিন গণভোট কী এবং কেন",
                "সংসদ নির্বাচন এবং গণভোট উপলক্ষে চট্টগ্রাম বিভাগের জন্য নির্মিত গান",
                "শহিদদের স্বপ্নের বাংলাদেশ গড়ে তোলাই আজ আমাদের নৈতিক দায়িত্ব",
                "July & Journalism"
            ]
        },
        reportIncident: {
            title: "অভিযোগ জানান",
            desc: "নির্বাচনী আচরণবিধি লঙ্ঘন, সহিংসতা বা অনিয়মের অভিযোগ জানাতে এই ফর্মটি ব্যবহার করুন। আপনার পরিচয় গোপন রাখা হবে।",
            form: {
                type: {
                    label: "ঘটনার ধরন",
                    placeholder: "ধরন নির্বাচন করুন...",
                    options: [
                        "সহিংসতা / হয়রানি",
                        "ভোট কেনাবেচা / ঘুষ",
                        "ভুয়া খবর / গুজব",
                        "ভোটকেন্দ্রে অনিয়ম"
                    ]
                },
                location: {
                    label: "স্থান",
                    placeholder: "যেমন: ধানমন্ডি বয়েজ স্কুল কেন্দ্র"
                },
                description: {
                    label: "বিবরণ",
                    placeholder: "কি ঘটেছে বিস্তারিত লিখুন...",
                },
                evidence: {
                    label: "প্রমাণ (ঐচ্ছিক)"
                },
                submit: "অভিযোগ জমা দিন",
                submitting: "জমা দেওয়া হচ্ছে...",
                success: "অভিযোগ সফলভাবে জমা দেওয়া হয়েছে। আপনার সতর্কতার জন্য ধন্যবাদ।"
            }
        },
        statusPage: {
            title: "ফলাফল",
            steps: {
                gettingStarted: { title: "শুরু করা হচ্ছে", desc: "মাত্র শুরু করেছেন? বেসিক জানুন" },
                notRegistered: { title: "নিবন্ধিত নন", desc: "নিবন্ধিত নন, এনআইডি-র জন্য আবেদন করুন" },
                partiallyReady: { title: "আংশিক প্রস্তুত", desc: "আরও বাকি আছে! ধাপগুলি সম্পন্ন করুন" },
                almostReady: { title: "প্রায় প্রস্তুত", desc: "সামান্য বাকি! তথ্যের ঘাটতি দেখুন" },
                readyToVote: { title: "ভোটের জন্য প্রস্তুত", desc: "আপনি প্রস্তুত, ভোট দিন!" }
            }
        },
        coursePage: {
            title: "ভোটার শিক্ষা কোর্স",
            desc: "একজন 'সিভিক হিরো' হতে এই ফ্রি মিনি-কোর্সটি সম্পন্ন করুন। আপনার অধিকার এবং ভোট প্রক্রিয়া সম্পর্কে জানুন।",
            modules: [
                {
                    title: "মডিউল ১: গণতন্ত্র বোঝা",
                    desc: "গণতান্ত্রিক অধিকার এবং আপনার ভোটের গুরুত্ব সম্পর্কে জানুন।",
                    duration: "১০ মিনিট",
                    lessons: ["গণতন্ত্র কী?", "অধিকার ও দায়িত্ব", "একটি ভোটের শক্তি"]
                },
                {
                    title: "মডিউল ২: কিভাবে নিবন্ধন করবেন",
                    desc: "বাংলাদেশে নিবন্ধিত ভোটার হওয়ার ধাপে ধাপে নির্দেশিকা।",
                    duration: "১৫ মিনিট",
                    lessons: ["যোগ্যতা যাচাই", "প্রয়োজনীয় কাগজপত্র", "অনলাইন নিবন্ধন প্রক্রিয়া"]
                },
                {
                    title: "মডিউল ৩: নির্বাচনের দিনের প্রক্রিয়া",
                    desc: "সঠিকভাবে ভোট দেওয়ার জন্য প্রয়োজনীয় সবকিছু জানুন।",
                    duration: "১২ মিনিট",
                    lessons: ["আপনার কেন্দ্র খোঁজা", "ব্যালট মার্কিং নিয়ম", "করণীয় এবং বর্জনীয়"]
                }
            ],
            cta: {
                title: "আপনার জ্ঞান যাচাই করতে প্রস্তুত?",
                desc: "আপনার ডিজিটাল সিভিক হিরো ব্যাজ পেতে সব মডিউল শেষ করে কুইজ দিন!",
                btn: "কুইজ শুরু করুন"
            }
        },
        aboutUs: {
            title: "অমর ব্যালট সম্পর্কে",
            desc: "প্রতিটি ভোট নিশ্চিত করতে নাগরিকদের তথ্যে ক্ষমতায়ন। আমরা বাংলাদেশের জন্য একটি স্মার্ট, আরও স্বচ্ছ গণতান্ত্রিক প্রক্রিয়া গড়ছি।",
            features: {
                mission: { title: "আমাদের লক্ষ্য", desc: "ভোটার এবং তথ্যের মধ্যে দূরত্ব ঘোচানো, নিশ্চিত করা যে প্রতিটি নাগরিক প্রার্থী, ভোটকেন্দ্র এবং নির্বাচনী প্রক্রিয়া সহজে জানতে পারে।" },
                vision: { title: "কমিউনিটি সবার আগে", desc: "আমরা একটি সচেতন কমিউনিটির শক্তিতে বিশ্বাস করি। অমর ব্যালট সব বয়সের মানুষের জন্য সহজ, নিরপেক্ষ এবং ব্যবহারকারী-বান্ধব করার জন্য ডিজাইন করা হয়েছে।" },
                trust: { title: "বিশ্বস্ত তথ্য", desc: "আমরা বিভ্রান্তি রোধ করতে অফিসিয়াল উৎসের বিপরীতে সমস্ত তথ্য যাচাই করি এবং নির্বাচনের সময় আপনাকে বিশ্বস্ত তথ্য প্রদান করি।" }
            },
            story: {
                title: "কেন আমরা শুরু করেছি",
                desc: "ভোট দেওয়া জটিল হওয়া উচিত নয়। আমরা লক্ষ্য করেছি যে অনেক নাগরিক, বিশেষ করে নতুন ভোটাররা, তাদের ভোটকেন্দ্র খুঁজে পেতে বা তাদের এলাকায় কে প্রার্থী তা জানতে সমস্যায় পড়েন। অমর ব্যালট ছিল এই যাত্রা সহজ করতে এবং সক্রিয় নাগরিক অংশগ্রহণে উৎসাহিত করতে।",
                alt: "দলের চিত্র"
            }
        },
        candidateList: {
            title: "জনমত জরিপ ২০২৬",
            subtitle: "লাইভ নির্বাচনের জনমত জরিপ ফলাফল",
            totalVotes: "সর্বমোট ভোট",
            download: "ফলাফল কার্ড ডাউনলোড",
            reviews: {
                title: "ভোটারদের মতামত",
                sort: "ফলাফল সাজান",
                newest: "নতুন প্রথমে",
                oldest: "পুরাতন প্রথমে",
                allParties: "সকল দল",
                headers: {
                    voter: "ভোটার",
                    seat: "আসন",
                    party: "সমর্থিত দল",
                    review: "মতামত / মন্তব্য",
                    time: "সময়"
                },
                empty: "আপনার ফিল্টারের সাথে কোন মতামত মিলেনি।",
                noVotes: "এই নির্বাচনে এখনও কোন ভোট পড়েনি।"
            },
            filters: {
                division: "সকল বিভাগ",
                district: "সকল জেলা",
                area: "সকল আসন",
                reset: "রিসেট ফিল্টার"
            },
            resultTitles: {
                area: "ফলাফল: {area} (আসন)",
                district: "ফলাফল: {district} (জেলা)",
                division: "ফলাফল: {division} (বিভাগ)",
                national: "জাতীয় জনমত জরিপ ফলাফল"
            }
        },
        dashboard: {
            greetings: {
                morning: "শুভ সকাল",
                afternoon: "শুভ বিকেল",
                evening: "শুভ সন্ধ্যা"
            },
            logout: "লগ আউট",
            activeVoter: "সক্রিয় ভোটার",
            nidCard: "জাতীয় পরিচয়পত্র",
            biometricVerified: "বায়োমেট্রিক যাচাইকৃত",
            profile: {
                nid: "এনআইডি নম্বর",
                dob: "জন্ম তারিখ",
                district: "জেলা",
                area: "ভোটার এলাকা"
            },
            nextElection: "পরবর্তী নির্বাচন",
            timeUnits: {
                days: "দিন",
                hours: "ঘণ্টা",
                mins: "মিনিট"
            },
            electionName: "জাতীয় সংসদ নির্বাচন",
            electionDate: "১২ ফেব্রুয়ারি ২০২৬ তারিখে অনুষ্ঠিত হবে",
            eligibility: "ভোটের যোগ্যতা",
            passed: "উত্তীর্ণ",
            voteNow: {
                title: "জরিপে আপনার ভোট দিন",
                desc: "২০২৬ সালের জাতীয় নির্বাচনে আপনার মতামত জানান। আপনার ভোট অত্যন্ত গুরুত্বপূর্ণ।",
                btn: "ভোট দিন"
            },
            voted: {
                title: "আপনার ভোট গ্রহণ করা হয়েছে",
                desc: "ধন্যবাদ! আপনি সফলভাবে আপনার ভোট প্রদান করেছেন। ফলাফল দেখতে নিচের বাটনে ক্লিক করুন।",
                btn: "ফলাফল দেখুন"
            },
            quickActions: {
                title: "দ্রুত সেবা",
                voteCenter: {
                    title: "ভোট কেন্দ্র",
                    desc: "আপনার কেন্দ্র খুঁজুন"
                },
                candidates: {
                    title: "প্রার্থীগণ",
                    desc: "কাকে ভোট দেবেন জানুন"
                },
                howToVote: {
                    title: "কিভাবে ভোট দেবেন",
                    desc: "ভিডিও টিউটোরিয়াল"
                },
                news: {
                    title: "খবর",
                    desc: "সর্বশেষ ঘোষণা"
                }
            }
        },
        services: {
            title: "আমাদের সেবাসমূহ",
            subtitle: "একজন আত্মবিশ্বাসী এবং দায়িত্বশীল ভোটার হতে আপনার যা কিছু প্রয়োজন।",
            items: {
                locator: {
                    title: "ভোট কেন্দ্র অনুসন্ধান",
                    desc: "আপনার এনআইডি বা ভোটার তথ্য দিয়ে অবিলম্বে আপনার নির্ধারিত ভোটকেন্দ্র খুঁজুন।"
                },
                candidates: {
                    title: "প্রার্থীর তথ্য",
                    desc: "আপনার এলাকার সকল প্রার্থীর বিস্তারিত প্রোফাইল, তাদের পটভূমি এবং ইশতেহার দেখুন।"
                },
                education: {
                    title: "ভোটার শিক্ষা",
                    desc: "কিভাবে ভোট দেবেন, প্রয়োজনীয় নথিপত্র এবং নিয়মাবলী সম্পর্কে ভিডিও এবং গাইড দেখুন।"
                },
                rumor: {
                    title: "গুজব যাচাই",
                    desc: "নির্বাচন সংক্রান্ত ভাইরাল খবর এবং দাবি যাচাই করুন। আমরা সত্য ও মিথ্যার পার্থক্য করতে সাহায্য করি।"
                },
                sample: {
                    title: "নমুনা ব্যালট",
                    desc: "ভোটের দিন ভুল এড়াতে আপনার নির্বাচনী এলাকার জন্য ডিজিটাল নমুনা ব্যালট দিয়ে অনুশীলন করুন।"
                },
                assistant: {
                    title: "ডিজিটাল সহকারী",
                    desc: "নির্বাচন ও যোগ্যতা নিয়ে আপনার প্রশ্নের উত্তর দিতে আমাদের এআই 'প্রেরণা' ২৪/৭ আছে।"
                }
            },
            cta: {
                title: "ব্যক্তিগত সাহায্য প্রয়োজন?",
                btn: "প্রেরণার সাথে কথা বলুন"
            }
        },
        admin: {
            nav: {
                dashboard: "ড্যাশবোর্ড",
                users: "ব্যবহারকারী",
                candidates: "প্রার্থী",
                centers: "ভোট কেন্দ্র",
                updates: "আপডেট",
                content: "কনটেন্ট",
                reports: "রিপোর্ট",
                rumors: "গুজব যাচাই",
                trainAI: "এআই প্রশিক্ষণ",
                logout: "সাইন আউট",
                menu: "মেনু"
            },
            title: "ড্যাশবোর্ড ওভারভিউ",
            welcome: "স্বাগতম",
            fixSchema: "স্কিমা ঠিক করুন",
            cards: {
                users: "মোট ব্যবহারকারী",
                candidates: "মোট প্রার্থী",
                centers: "ভোট কেন্দ্র",
                rumors: "গুজব নিয়ন্ত্রণ",
                updates: "নির্বাচন আপডেট",
                incidents: "ঘটনা রিপোর্ট"
            },
            cardSubtitles: {
                manageNews: "খবর পরিচালনা",
                factChecks: "ফ্যাক্ট চেক",
                safety: "নিরাপত্তা রিপোর্ট"
            },
            aiCache: {
                title: "এআই নলেজ ক্যাশ",
                subtitle: "আপডেট, গুজব এবং এআই ডাটা",
                forceRefresh: "রিফ্রেশ করুন",
                setupCache: "ক্যাশ সেটআপ",
                addKnowledge: "তথ্য যোগ করুন",
                refreshSuccess: "✅ ক্যাশ রিফ্রেশ হয়েছে! ডাটাবেস থেকে নতুন তথ্য লোড করা হয়েছে।",
                setupSuccess: "✅ ক্যাশ সেটআপ সম্পন্ন! এআই এখন কাজ করতে প্রস্তুত।"
            },
            centers: {
                title: "ভোট কেন্দ্র ব্যবস্থাপনা",
                subtitle: "ভোট কেন্দ্র যোগ, সম্পাদনা বা অপসারণ করুন",
                add: "কেন্দ্র যোগ করুন",
                search: "নাম বা এলাকা দিয়ে খুঁজুন...",
                table: {
                    name: "কেন্দ্রের নাম",
                    location: "অবস্থান (আসন)",
                    capacity: "ধারণক্ষমতা",
                    coordinates: "স্থানাঙ্ক",
                    actions: "পদক্ষেপ",
                    loading: "লোড হচ্ছে...",
                    empty: "কোনো ভোট কেন্দ্র পাওয়া যায়নি।"
                },
                form: {
                    addTitle: "ভোট কেন্দ্র যোগ করুন",
                    editTitle: "ভোট কেন্দ্র সম্পাদনা",
                    nameEn: "কেন্দ্রের নাম (ইংরেজি)",
                    nameBn: "কেন্দ্রের নাম (বাংলা)",
                    addressEn: "ঠিকানা (ইংরেজি)",
                    addressBn: "ঠিকানা (বাংলা)",
                    capacity: "ধারণক্ষমতা (ভোটার)",
                    lat: "অক্ষাংশ",
                    lng: "দ্রাঘিমাংশ",
                    division: "বিভাগ",
                    district: "জেলা",
                    area: "নির্বাচনী এলাকা (আসন)",
                    selectDivision: "বিভাগ নির্বাচন করুন",
                    selectDistrict: "জেলা নির্বাচন করুন",
                    selectSeat: "আসন নির্বাচন করুন",
                    cancel: "বাতিল",
                    save: "সংরক্ষণ করুন",
                    update: "আপডেট করুন"
                },
                alerts: {
                    deleteConfirm: "আপনি কি নিশ্চিত যে আপনি এই ভোট কেন্দ্রটি মুছে ফেলতে চান?",
                    fail: "ভোট কেন্দ্র সংরক্ষণ করতে ব্যর্থ হয়েছে"
                }
            },
            users: {
                title: "ব্যবহারকারী ব্যবস্থাপনা",
                subtitle: "নিবন্ধিত ভোটারদের তালিকা দেখুন ও পরিচালনা করুন",
                total: "মোট ব্যবহারকারী",
                search: "নাম, ইমেইল বা এনআইডি দিয়ে খুঁজুন...",
                table: {
                    status: "অবস্থা",
                    details: "ব্যবহারকারীর বিবরণ",
                    nid: "এনআইডি তথ্য",
                    contact: "যোগাযোগ",
                    actions: "পদক্ষেপ",
                    loading: "ব্যবহারকারী লোড হচ্ছে...",
                    empty: "কোনো ব্যবহারকারী পাওয়া যায়নি।",
                    verified: "যাচাইকৃত",
                    unverified: "অযাচাইকৃত",
                    notProvided: "দেওয়া হয়নি"
                },
                alerts: {
                    deleteConfirm: "আপনি কি নিশ্চিত যে আপনি এই ব্যবহারকারীকে মুছে ফেলতে চান? এটি ফিরিয়ে আনা যাবে না।"
                }
            },
            candidates: {
                title: "প্রার্থী ব্যবস্থাপনা",
                subtitle: "নির্বাচনী প্রার্থীদের যোগ, সম্পাদনা বা অপসারণ করুন",
                add: "প্রার্থী যোগ করুন",
                search: "নাম, দল বা এলাকা দিয়ে খুঁজুন...",
                table: {
                    valid: "বৈধ",
                    name: "নাম / দল",
                    area: "নির্বাচনী এলাকা",
                    symbol: "প্রতীক",
                    actions: "পদক্ষেপ",
                    loading: "প্রার্থী লোড হচ্ছে...",
                    empty: "কোনো প্রার্থী পাওয়া যায়নি।"
                },
                form: {
                    addTitle: "নতুন প্রার্থী যোগ করুন",
                    editTitle: "প্রার্থী সম্পাদনা",
                    nameEn: "পুরো নাম (ইংরেজি)",
                    nameBn: "পুরো নাম (বাংলা)",
                    party: "দলের নাম",
                    partyBn: "দলের নাম (বাংলা)",
                    symbol: "প্রতীক",
                    age: "বয়স",
                    education: "শিক্ষাগত যোগ্যতা",
                    image: "ছবির লিংক",
                    alliance: "জোট",
                    manifesto: "ইশতেহার",
                    division: "বিভাগ",
                    district: "জেলা",
                    area: "নির্বাচনী এলাকা (আসন)",
                    selectDivision: "বিভাগ নির্বাচন করুন",
                    selectDistrict: "জেলা নির্বাচন করুন",
                    selectSeat: "আসন নির্বাচন করুন",
                    cancel: "বাতিল",
                    save: "প্রার্থী সংরক্ষণ",
                    update: "প্রার্থী আপডেট"
                },
                alerts: {
                    deleteConfirm: "আপনি কি নিশ্চিত যে আপনি এই প্রার্থীকে মুছে ফেলতে চান?",
                    fail: "প্রার্থী সংরক্ষণ করতে ব্যর্থ হয়েছে"
                }
            },
            updates: {
                title: "নির্বাচনী আপডেট",
                subtitle: "খবর এবং ঘোষণা পোস্ট করুন",
                add: "আপডেট পোস্ট করুন",
                loading: "আপডেট লোড হচ্ছে...",
                empty: "কোনো আপডেট পোস্ট করা হয়নি।",
                form: {
                    addTitle: "নতুন আপডেট পোস্ট করুন",
                    editTitle: "আপডেট সম্পাদনা",
                    title: "শিরোনাম",
                    author: "লেখকের নাম",
                    tags: "ট্যাগ (কমা দিয়ে আলাদা করুন)",
                    readTime: "পড়ার সময় (মিনিট)",
                    sourceUrl: "সোর্স লিংক",
                    image: "ছবি সংযুক্ত করুন",
                    content: "বিস্তারিত",
                    save: "পোস্ট করুন",
                    update: "আপডেট করুন",
                    cancel: "বাতিল"
                }
            },
            rumors: {
                title: "গুজব যাচাইকরণ",
                subtitle: "ফ্যাক্ট-চেকিং ডাটাবেস পরিচালনা করুন",
                add: "যাচাই যোগ করুন",
                search: "গুজব খুঁজুন...",
                loading: "গুজব লোড হচ্ছে...",
                empty: "কোনো গুজব পাওয়া যায়নি।",
                status: {
                    fake: "মিথ্যা / গুজব",
                    verified: "সত্য / যাচাইকৃত",
                    pending: "অমীমাংসিত"
                },
                filter: {
                    newest: "নতুন",
                    oldest: "পুরাতন"
                },
                table: {
                    verified: "যাচাইকৃত",
                    fake: "মিথ্যা / গুজব",
                    pending: "অমীমাংসিত",
                    source: "সোর্স দেখুন"
                },
                toggle: {
                    more: "আরও পড়ুন",
                    less: "সংক্ষেপে দেখুন"
                },
                alerts: {
                    deleteConfirm: "আপনি কি এই গুজবটি মুছতে চান?",
                    fail: "গুজব সংরক্ষণ ব্যর্থ হয়েছে"
                },
                form: {
                    addTitle: "ফ্যাক্ট চেক যোগ করুন",
                    editTitle: "ফ্যাক্ট চেক সম্পাদনা",
                    title: "গুজব/বিষয় শিরোনাম",
                    verdict: "রায়",
                    explanation: "ব্যাখ্যা",
                    source: "সোর্স লিংক (ঐচ্ছিক)",
                    sourceUrl: "সোর্স লিংক",
                    image: "প্রমাণ ছবি (ঐচ্ছিক)",
                    save: "রেকর্ড সংরক্ষণ",
                    saveResponse: "রেকর্ড সংরক্ষণ",
                    paste: "ছবি পেস্ট করুন (Ctrl+V)",
                    upload: "অথবা নিচে আপলোড করুন"
                }
            },
            incidents: {
                title: "ঘটনা রিপোর্ট",
                loading: "রিপোর্ট লোড হচ্ছে...",
                empty: "কোনো ঘটনা রিপোর্ট করা হয়নি।",
                resolve: "সমাধান হিসেবে চিহ্নিত করুন",
                delete: "রিপোর্ট মুছুন"
            },
            trainAI: {
                title: "এআই প্রশিক্ষণ",
                subtitle: "এআই-কে আপনার মতো উত্তর দিতে শেখান",
                buttons: {
                    add: "নতুন",
                    import: "JSON",
                    duplicates: "ডুপ্লিকেট",
                    save: "সংরক্ষণ",
                    saving: "সংরক্ষণ হচ্ছে..."
                },
                stats: {
                    total: "মোট প্রশ্ন",
                    active: "সক্রিম",
                    inactive: "নিষ্ক্রিয়",
                    divisions: "বিভাগ",
                    autoLearn: "অটো-লার্ন"
                },
                filter: {
                    all: "সকল বিভাগ",
                    only: "মাত্র"
                },
                search: "প্রশ্ন বা উত্তর খুঁজুন...",
                empty: {
                    title: "কোনো তথ্য পাওয়া যায়নি",
                    subtitle: "এআই প্রশিক্ষণের জন্য কিছু প্রশ্ন যোগ করুন।"
                },
                table: {
                    question: "প্রশ্ন",
                    answer: "উত্তর"
                },
                import: {
                    title: "JSON ইম্পোর্ট",
                    upload: "JSON ফাইল আপলোড করুন",
                    or: "অথবা",
                    paste: "JSON টেক্সট পেস্ট করুন",
                    sample: "নমুনা ফরম্যাট দেখুন",
                    useSample: "নমুনা ব্যবহার করুন",
                    importing: "ইম্পোর্ট হচ্ছে...",
                    importAction: "ডাটা ইম্পোর্ট করুন",
                    success: "ইম্পোর্ট সফল",
                    error: "ইম্পোর্ট ব্যর্থ",
                    imported: "ইম্পোর্ট করা হয়েছে",
                    failed: "ব্যর্থ হয়েছে",
                    errorDetails: "ত্রুটির বিবরণ",
                    close: "বন্ধ করুন"
                },
                form: {
                    addTitle: "নতুন প্রশ্ন যোগ করুন",
                    editTitle: "প্রশ্ন সম্পাদনা",
                    division: "বিভাগ",
                    question: "প্রশ্ন",
                    questionPlaceholder: "যেমন: আমি কিভাবে ভোট দিব?",
                    answer: "উত্তর",
                    answerPlaceholder: "যেমন: আপনি ভোট দিতে পারেন...",
                    keywords: "কীওয়ার্ড (ঐচ্ছিক)",
                    keywordsHelp: "ভালো ম্যাচিংয়ের জন্য কমা দিয়ে আলাদা করা কীওয়ার্ড",
                    priority: "অগ্রাধিকার",
                    priorityHelp: "বেশি নম্বর মানে বেশি অগ্রাধিকার (০-১০০)",
                    save: "সংরক্ষণ",
                    update: "আপডেট",
                    cancel: "বাতিল"
                },
                alerts: {
                    required: "অনুগ্রহ করে সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন",
                    deleteConfirm: "আপনি কি নিশ্চিত মুছে ফেলতে চান?",
                    duplicateConfirm: "ডুপ্লিকেট মুছে ফেলা হবে। শুধুমাত্র সর্বোচ্চ অগ্রাধিকারের কপি রাখা হবে। আপনি কি নিশ্চিত?"
                }
            },
            content: {
                title: "পেইজ কনটেন্ট",
                subtitle: "বিভিন্ন পাতার কনটেন্ট পরিচালনা করুন",
                sections: "সেকশন",
                updated: "আপডেট করা হয়েছে",
                items: "টি আইটেম",
                never: "কখনও না",
                branding: { title: "ব্র্যান্ডিং", desc: "লোগো এবং ফ্যাভিকন" },
                about: { title: "আমাদের সম্পর্কে", desc: "লক্ষ্য, ভিশন, গল্প" },
                contact: { title: "যোগাযোগ", desc: "ইমেইল, ফোন, ঠিকানা" },
                services: { title: "সেবাসমূহ", desc: "৬টি সেবা আইটেম" },
                citizen: { title: "সুনাগরিক বার্তা", desc: "অনুপ্রেরণামূলক বার্তা" },
                tips: {
                    title: "দ্রুত পরামর্শ",
                    list: [
                        "কনটেন্ট সম্পাদনা করতে যে কোনো সেকশনে ক্লিক করুন",
                        "লেখার সাথে সাথে পরিবর্তন স্বয়ংক্রিয়ভাবে সংরক্ষিত হয়",
                        "কনটেন্ট ইংরেজি এবং বাংলা উভয় সমর্থন করে",
                        "পরিবর্তনগুলি অবিলম্বে লাইভ সাইটে দেখা যায়"
                    ]
                }
            }
        },
        common: {
            loading: "লোড হচ্ছে...",
            saved: "সফলভাবে সংরক্ষিত হয়েছে",
            error: "একটি ত্রুটি ঘটেছে",
            submit: "জমা দিন",
            cancel: "বাতিল",
            edit: "সম্পাদনা",
            delete: "মুছন",
            view: "দেখুন"
        }
    }
};
