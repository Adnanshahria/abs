export interface VoteCenterData {
    id: number;
    name: string;
    name_bn: string;
    address: string;
    address_bn: string;
    areas: string[]; // List of areas/villages
    total_voters: number;
    type: 'male' | 'female' | 'combined';
}

export const VOTE_CENTERS: VoteCenterData[] = [
    {
        id: 1,
        name: "Lalbagh Adarsha Sarkari Primary School",
        name_bn: "লালবাগ আদর্শ সরকারি প্রাথমিক বিদ্যালয়",
        address: "Lalbagh, Dinajpur",
        address_bn: "লালবাগ, দিনাজপুর",
        areas: [
            "এনায়েতপুর-২৮০",
            "গোবরাপাড়া-৬৩৮",
            "গোলাপবাগ-৬৪৯",
            "হাজী বেচাপাড়া-২৫৬",
            "লালবাগ-১৭২৭"
        ],
        total_voters: 3550,
        type: 'male'
    },
    {
        id: 2,
        name: "Wazifa Samad Balika High School",
        name_bn: "ওয়াজিফা সামাদ বালিকা উচ্চ বিদ্যালয়",
        address: "Lalbagh, Dinajpur",
        address_bn: "লালবাগ, দিনাজপুর",
        areas: [
            "রামনগর-৪১৪২"
        ],
        total_voters: 4142,
        type: 'female'
    },
    {
        id: 3,
        name: "Lalbagh Kohinoor Sarkari Primary School (Ground Floor)",
        name_bn: "লালবাগ কহিনুর সরকারি প্রাথমিক বিদ্যালয় (নীচ তলা)",
        address: "Lalbagh, Dinajpur",
        address_bn: "লালবাগ, দিনাজপুর",
        areas: [
            "রামনগর-৪৬১৪"
        ],
        total_voters: 4615,
        type: 'female'
    },
    {
        id: 4,
        name: "Lalbagh Kohinoor Sarkari Primary School (2nd Floor)",
        name_bn: "লালবাগ কহিনুর সরকারি প্রাথমিক বিদ্যালয় (২য় তলা)",
        address: "Lalbagh, Dinajpur",
        address_bn: "লালবাগ, দিনাজপুর",
        areas: [
            "এনায়েতপুর-৩১১",
            "গোবরাপাড়া-৬৪৬",
            "গোলাপবাগ-৭৪৬",
            "হাজী বেচাপাড়া-২৯৪",
            "লালবাগ-১৮৭২"
        ],
        total_voters: 3869,
        type: 'female'
    },
    {
        id: 5,
        name: "Adarsha College (Kazi Nazrul Islam Bhaban)",
        name_bn: "আদর্শ কলেজ (কাজী নজরুল ইসলাম ভবন)",
        address: "Ghasipara, Dinajpur",
        address_bn: "ঘাসিপাড়া, দিনাজপুর",
        areas: [
            "ঘাসিপাড়া (২নং ওয়ার্ড অংশ)-১৪৩১",
            "পাটুয়াপাড়া-১৩১৯",
            "মির্জাপুর-৩২১"
        ],
        total_voters: 3071,
        type: 'male'
    },
    {
        id: 6,
        name: "Adarsha College (ICT Bhaban)",
        name_bn: "আদর্শ কলেজ (আইসিটি ভবন)",
        address: "Ghasipara, Dinajpur",
        address_bn: "ঘাসিপাড়া, দিনাজপুর",
        areas: [
            "ঘাসিপাড়া (২নং ওয়ার্ড অংশ)-১৬৩১",
            "পাটুয়াপাড়া-১৫৬৩",
            "মুদিপাড়া-৪০৮"
        ],
        total_voters: 3602,
        type: 'female'
    },
    {
        id: 7,
        name: "Shikkha Doptor Songlogno Sarkari Primary School (3-Storey)",
        name_bn: "শিক্ষা দপ্তর সংলগ্ন সরকারি প্রাথমিক বিদ্যালয় (তিনতলা ভবন)",
        address: "Ghasipara, Dinajpur",
        address_bn: "ঘাসিপাড়া, দিনাজপুর",
        areas: [
            "চাউলিয়াপট্টি-১৯৮৫",
            "কাঞ্চন কলোনী-৯০৮",
            "পাক পাহাড়পুর-৩৬১"
        ],
        total_voters: 3254,
        type: 'male'
    },
    {
        id: 8,
        name: "Shikkha Doptor Songlogno Sarkari Primary School (1-Storey)",
        name_bn: "শিক্ষা দপ্তর সংলগ্ন সরকারি প্রাথমিক বিদ্যালয় (একতলা ভবন ও টিনশেড)",
        address: "Ghasipara, Dinajpur",
        address_bn: "ঘাসিপাড়া, দিনাজপুর",
        areas: [
            "চাউলিয়াপট্টি-২১৯৭",
            "কাঞ্চন কলোনী-৯৪৯",
            "পাক পাহাড়পুর-৩৮২"
        ],
        total_voters: 3528,
        type: 'female'
    },
    {
        id: 9,
        name: "Dinajpur Academy (East Part)",
        name_bn: "দিনাজপুর একাডেমি (পূর্বাংশ)",
        address: "Munshipara, Dinajpur",
        address_bn: "মুন্সিপাড়া, দিনাজপুর",
        areas: [
            "উত্তর মুন্সিপাড়া-৮৪৪",
            "খালপাড়া-৩৪০",
            "ঠনঠনিয়াপাড়া-১৪১",
            "তালপুকুর-১৯৯",
            "দক্ষিণ মুন্সিপাড়া-৭২৮",
            "নিমীতলা-১০৩"
        ],
        total_voters: 2355,
        type: 'male'
    },
    {
        id: 10,
        name: "Dinajpur Academy (West Part)",
        name_bn: "দিনাজপুর একাডেমি (পশ্চিমাংশ)",
        address: "Munshipara, Dinajpur",
        address_bn: "মুন্সিপাড়া, দিনাজপুর",
        areas: [
            "উত্তর মুন্সিপাড়া-৯১৯",
            "খালপাড়া-৩৭৪",
            "ঠনঠনিয়াপাড়া-১৫৪",
            "তালপুকুর-২২৫",
            "দক্ষিণ মুন্সিপাড়া-৬৯১",
            "নিমীতলা-১২৭"
        ],
        total_voters: 2490,
        type: 'female'
    },
    {
        id: 11,
        name: "Dinajpur Govt. Girls High School",
        name_bn: "দিনাজপুর সরকারি বালিকা উচ্চ বিদ্যালয়",
        address: "Ganeshtola, Dinajpur",
        address_bn: "গণেশতলা, দিনাজপুর",
        areas: [
            "গণেশতলা-১৩৮২",
            "ঘাসিপাড়া (৩নং ওয়ার্ড অংশ)-১০১৬",
            "চক বাজার-৬২৩",
            "জেল কারাগার-১৫৬",
            "বাসুনিয়াপট্টি-৩০৩",
            "মালদহপট্টি-৩৫২"
        ],
        total_voters: 3832,
        type: 'combined'
    },
    {
        id: 12,
        name: "Dinajpur Govt. College (South Part)",
        name_bn: "দিনাজপুর সরকারি কলেজ (দক্ষিণাংশ)",
        address: "Suihari, Dinajpur",
        address_bn: "সুইহারী, দিনাজপুর",
        areas: [
            "উত্তর গোসাইপুর-১২৪১",
            "নয়নপুর-৩৮৪",
            "মির্জাপুর-১৮৮২"
        ],
        total_voters: 3507,
        type: 'female'
    },
    {
        id: 13,
        name: "Dinajpur Govt. College (North Part)",
        name_bn: "দিনাজপুর সরকারি কলেজ (উত্তরাংশ)",
        address: "Suihari, Dinajpur",
        address_bn: "সুইহারী, দিনাজপুর",
        areas: [
            "উত্তর গোসাইপুর-১১৬৮",
            "নয়নপুর-৪০৫",
            "মির্জাপুর-১৭০১"
        ],
        total_voters: 3274,
        type: 'male'
    },
    {
        id: 14,
        name: "Chehelgazi Shikkha Niketon School & College (South Part)",
        name_bn: "চেহেলগাজী শিক্ষা নিকেতন স্কুল এন্ড কলেজ (দক্ষিণাংশ)",
        address: "Suihari, Dinajpur",
        address_bn: "সুইহারী, দিনাজপুর",
        areas: [
            "সুইহারী-২৭০৬"
        ],
        total_voters: 2706,
        type: 'female'
    },
    {
        id: 15,
        name: "Chehelgazi Shikkha Niketon School & College (North Part)",
        name_bn: "চেহেলগাজী শিক্ষা নিকেতন স্কুল এন্ড কলেজ (উত্তরাংশ)",
        address: "Suihari, Dinajpur",
        address_bn: "সুইহারী, দিনাজপুর",
        areas: [
            "সুইহারী-২৫১৫"
        ],
        total_voters: 2515,
        type: 'male'
    },
    {
        id: 16,
        name: "Crescent Kindergarten Girls High School (East Part)",
        name_bn: "ক্রিসেন্ট কিন্ডার গার্টেন বালিকা উচ্চ বিদ্যালয় (পূর্বাংশ)",
        address: "Kalitola, Dinajpur",
        address_bn: "কালিতলা, দিনাজপুর",
        areas: [
            "কালিতলা-১২৮৮",
            "সর্দারপাড়া-৫৫৪",
            "ক্ষত্রিয়পাড়া-৪৭৩"
        ],
        total_voters: 2315,
        type: 'male'
    },
    {
        id: 17,
        name: "Crescent Kindergarten Girls High School (West Part)",
        name_bn: "ক্রিসেন্ট কিন্ডার গার্টেন বালিকা উচ্চ বিদ্যালয় (পশ্চিমাংশ)",
        address: "Kalitola, Dinajpur",
        address_bn: "কালিতলা, দিনাজপুর",
        areas: [
            "গুড়গোলা-১৭২২",
            "গরুহাটি-১৪৫",
            "চুড়িপট্টি-১৭৫",
            "শাঁখারিপট্টি-১৪৫"
        ],
        total_voters: 2187,
        type: 'male'
    },
    {
        id: 18,
        name: "Saradeshwari Girls High School (East Part)",
        name_bn: "সারদেশ্বরী বালিকা উচ্চ বিদ্যালয় (পূর্বাংশ)",
        address: "Kalitola, Dinajpur",
        address_bn: "কালিতলা, দিনাজপুর",
        areas: [
            "কালিতলা-১৪৫২",
            "সর্দারপাড়া-৫৮০",
            "ক্ষত্রিয়পাড়া-৫৯২"
        ],
        total_voters: 2624,
        type: 'female'
    },
    {
        id: 19,
        name: "Saradeshwari Girls High School (West Part)",
        name_bn: "সারদেশ্বরী বালিকা উচ্চ বিদ্যালয় (পশ্চিমাংশ)",
        address: "Kalitola, Dinajpur",
        address_bn: "কালিতলা, দিনাজপুর",
        areas: [
            "গুড়গোলা-১৯৫০",
            "গরুহাটি-১৬৮",
            "চুড়িপট্টি-১৮৫",
            "শাঁখারিপট্টি-১৯১"
        ],
        total_voters: 2494,
        type: 'female'
    },
    {
        id: 20,
        name: "Fakirpara Forkania Hafezia Madrasa",
        name_bn: "ফকিরপাড়া ফোরকানিয়া হাফেজিয়া মাদ্রাসা",
        address: "Fakirpara, Dinajpur",
        address_bn: "ফকিরপাড়া, দিনাজপুর",
        areas: [
            "নতুনপাড়া-৭৫৩",
            "ফকিরপাড়া-১২৬৩",
            "বড় বন্দর-১৩৭৫"
        ],
        total_voters: 3391,
        type: 'male'
    },
    {
        id: 21,
        name: "Barobandar Sarkari Primary School",
        name_bn: "বড়বন্দর সরকারি প্রাথমিক বিদ্যালয়",
        address: "Barobandar, Dinajpur",
        address_bn: "বড়বন্দর, দিনাজপুর",
        areas: [
            "নতুনপাড়া-৮৩৬",
            "ফকিরপাড়া-১৩৯১",
            "বড় বন্দর-১৪৮১"
        ],
        total_voters: 3708,
        type: 'female'
    },
    {
        id: 22,
        name: "Dinajpur Jubilee High School (North Part)",
        name_bn: "দিনাজপুর জুবিলী উচ্চ বিদ্যালয় (উত্তরাংশ)",
        address: "Rajbati, Dinajpur",
        address_bn: "রাজবাটি, দিনাজপুর",
        areas: [
            "উড়াওপাড়া-২২৩",
            "কালিয়াগঞ্জ-৩০০",
            "গুঞ্জাবাড়ী-৬১০",
            "মাতাসাগর-৭৮",
            "রাজবাড়ী কৃষি ফার্ম-৭",
            "রাজবাটী-২৫৭৯"
        ],
        total_voters: 3797,
        type: 'male'
    },
    {
        id: 23,
        name: "Dinajpur Jubilee High School (West Part)",
        name_bn: "দিনাজপুর জুবিলী উচ্চ বিদ্যালয় (পশ্চিমাংশ)",
        address: "Rajbati, Dinajpur",
        address_bn: "রাজবাটি, দিনাজপুর",
        areas: [
            "উড়াওপাড়া-২৪০",
            "কালিয়াগঞ্জ-২৯৪",
            "গুঞ্জাবাড়ী-৬০২",
            "মাতাসাগর-৮০",
            "রাজবাড়ী কৃষি ফার্ম-১২",
            "রাজবাটী-২৭১০"
        ],
        total_voters: 3938,
        type: 'female'
    },
    {
        id: 24,
        name: "Maharaja Girijanath High School (Old Building)",
        name_bn: "মহারাজা গিরিজানাথ উচ্চ বিদ্যালয় (পুরাতন ভবন)",
        address: "Uttar Balubari, Dinajpur",
        address_bn: "উত্তর বালুবাড়ী, দিনাজপুর",
        areas: [
            "উত্তর বালুবাড়ী-৩৬৪৪"
        ],
        total_voters: 3644,
        type: 'male'
    },
    {
        id: 25,
        name: "Maharaja Girijanath High School (New Building)",
        name_bn: "মহারাজা গিরিজানাথ উচ্চ বিদ্যালয় (নতুন ভবন)",
        address: "Uttar Balubari, Dinajpur",
        address_bn: "উত্তর বালুবাড়ী, দিনাজপুর",
        areas: [
            "কুমারপাড়া-৬৯৬",
            "শেখপুরা (৭নং ওয়ার্ড অংশ)-২১৮৮"
        ],
        total_voters: 2884,
        type: 'combined'
    },
    {
        id: 26,
        name: "Uttar Balubari Sarkari Primary School",
        name_bn: "উত্তর বালুবাড়ী সরকারি প্রাথমিক বিদ্যালয়",
        address: "Uttar Balubari, Dinajpur",
        address_bn: "উত্তর বালুবাড়ী, দিনাজপুর",
        areas: [
            "উত্তর বালুবাড়ী-৪০২৯"
        ],
        total_voters: 4029,
        type: 'female'
    },
    {
        id: 27,
        name: "Collegiate Girls High School (West Part)",
        name_bn: "কলেজিয়েট গার্লস হাই স্কুল এন্ড কলেজ (পশ্চিমাংশ)",
        address: "Nimnagar, Balubari, Dinajpur",
        address_bn: "নিমনগর, বালুবাড়ী, দিনাজপুর",
        areas: [
            "দক্ষিণ বালুবাড়ী-২২৬০"
        ],
        total_voters: 2260,
        type: 'male'
    },
    {
        id: 28,
        name: "Collegiate Girls High School (South Part)",
        name_bn: "কলেজিয়েট গার্লস হাই স্কুল এন্ড কলেজ (দক্ষিণাংশ)",
        address: "Nimnagar, Balubari, Dinajpur",
        address_bn: "নিমনগর, বালুবাড়ী, দিনাজপুর",
        areas: [
            "নিমনগর বালুবাড়ী-১২৪৩",
            "নিমনগর শেখপুরা-৮৩৮",
            "শেখপুরা (৮নং ওয়ার্ড অংশ)-৩৪৪"
        ],
        total_voters: 2425,
        type: 'male'
    },
    {
        id: 29,
        name: "Dinajpur Govt. Mohila College (East Part)",
        name_bn: "দিনাজপুর সরকারি মহিলা কলেজ (পূর্বাংশ)",
        address: "Nimnagar, Balubari, Dinajpur",
        address_bn: "নিমনগর, বালুবাড়ী, দিনাজপুর",
        areas: [
            "দক্ষিণ বালুবাড়ী-২৬১৮"
        ],
        total_voters: 2618,
        type: 'female'
    },
    {
        id: 30,
        name: "Dinajpur Govt. Mohila College (West Part)",
        name_bn: "দিনাজপুর সরকারি মহিলা কলেজ (পশ্চিমাংশ)",
        address: "Nimnagar, Balubari, Dinajpur",
        address_bn: "নিমনগর, বালুবাড়ী, দিনাজপুর",
        areas: [
            "নিমনগর বালুবাড়ী-১৩৭০",
            "নিমনগর শেখপুরা-১০০৭",
            "শেখপুরা (৮নং ওয়ার্ড অংশ)-৩৫৫"
        ],
        total_voters: 2732,
        type: 'female'
    },
    {
        id: 31,
        name: "Tofijuddin Memorial High School (North Part)",
        name_bn: "তফিজউদ্দিন মেমোরিয়াল হাই স্কুল (উত্তরাংশ)",
        address: "Upashahar, Dinajpur",
        address_bn: "উপশহর, দিনাজপুর",
        areas: [
            "উপশহর-১-২৯৯",
            "উপশহর-২-৭০৮",
            "উপশহর-৩-৫৯৯",
            "উপশহর-৫-১১৯০",
            "উপশহর-৬/এ-৮৬৯"
        ],
        total_voters: 3665,
        type: 'male'
    },
    {
        id: 32,
        name: "Tofijuddin Memorial High School (South Part)",
        name_bn: "তফিজউদ্দিন মেমোরিয়াল হাই স্কুল (দক্ষিণাংশ)",
        address: "Upashahar, Dinajpur",
        address_bn: "উপশহর, দিনাজপুর",
        areas: [
            "উপশহর-৭-৫৯০",
            "উপশহর-৮-৪১৯",
            "উপশহর-৯-৬২১",
            "উপশহর-১০-২৪৭",
            "খোদ মাধবপুর (মিস্ত্রীপাড়া)-৪৪১",
            "নিমনগর শেখপুরা (৯নং ওয়ার্ড অংশ)-৪৯৯",
            "শেখপুরা-৭৩"
        ],
        total_voters: 3548,
        type: 'male'
    },
    {
        id: 33,
        name: "Upashahar Sarkari Primary School (East Part)",
        name_bn: "উপ-শহর সরকারি প্রাথমিক বিদ্যালয় (পূর্বাংশ)",
        address: "Upashahar, Dinajpur",
        address_bn: "উপশহর, দিনাজপুর",
        areas: [
            "উপশহর-১-২৯০",
            "উপশহর-২-৭৭১",
            "উপশহর-৩-৬৪৩",
            "উপশহর-৫-১৩২০",
            "উপশহর-৬/এ-৯৬২"
        ],
        total_voters: 3986,
        type: 'female'
    },
    {
        id: 34,
        name: "Upashahar Sarkari Primary School (West Part)",
        name_bn: "উপ-শহর সরকারি প্রাথমিক বিদ্যালয় (পশ্চিমাংশ)",
        address: "Upashahar, Dinajpur",
        address_bn: "উপশহর, দিনাজপুর",
        areas: [
            "উপশহর-৭-৬২৫",
            "উপশহর-৮-৪৪০",
            "উপশহর-৯-৬৯৬",
            "উপশহর-১০-২৫৪",
            "খোদ মাধবপুর (মিস্ত্রীপাড়া)-৪৭৮",
            "নিমনগর শেখপুরা (৯নং ওয়ার্ড অংশ)-৫৮১",
            "শেখপুরা-৮৫০"
        ],
        total_voters: 3924,
        type: 'female'
    },
    {
        id: 35,
        name: "Police Line Sarkari Primary School",
        name_bn: "পুলিশলাইন সরকারি প্রাথমিক বিদ্যালয়",
        address: "Eidgah Bosti, Dinajpur",
        address_bn: "ঈদগাহবস্তি, দিনাজপুর",
        areas: [
            "উত্তর ফরিদপুর-৬১০",
            "উপশহর-৪-৩৭৭",
            "উপশহর-৬-৫৩৫",
            "মহাজনপাড়া (উপশহর-৭/এ)-৭৬৮"
        ],
        total_voters: 2290,
        type: 'male'
    },
    {
        id: 36,
        name: "Police Line High School",
        name_bn: "পুলিশলাইন উচ্চ বিদ্যালয়",
        address: "Eidgah Bosti, Dinajpur",
        address_bn: "ঈদগাহবস্তি, দিনাজপুর",
        areas: [
            "উত্তর ফরিদপুর-৭০৫",
            "উপশহর-৪-৪১৯",
            "উপশহর-৬-৫৮৩",
            "মহাজনপাড়া (উপশহর-৭/এ)-৮২৯"
        ],
        total_voters: 2536,
        type: 'female'
    },
    {
        id: 37,
        name: "Dakshin Baluadanga Sarkari Primary School",
        name_bn: "দক্ষিণ বালুয়াডাঙ্গা সরকারি প্রাথমিক বিদ্যালয়",
        address: "Baluadanga, Dinajpur",
        address_bn: "বালুয়াডাঙ্গা, দিনাজপুর",
        areas: [
            "পাহাড়পুর-৭৮৫",
            "বালুয়াডাঙ্গা নতুনপাড়া-১৯৬৭"
        ],
        total_voters: 2752,
        type: 'male'
    },
    {
        id: 38,
        name: "Paschim Baluadanga Sarkari Primary School",
        name_bn: "পশ্চিম বালুয়াডাঙ্গা সরকারি প্রাথমিক বিদ্যালয়",
        address: "Baluadanga, Dinajpur",
        address_bn: "বালুয়াডাঙ্গা, দিনাজপুর",
        areas: [
            "বালুয়াডাঙ্গা-২০৯৫",
            "বাহাদুর বাজার-৭৩৫"
        ],
        total_voters: 2830,
        type: 'male'
    },
    {
        id: 39,
        name: "Iqbal High School (Double Shift) (East Part)",
        name_bn: "ইকবাল হাই স্কুল (ডাবল শিফট) (পূর্বাংশ)",
        address: "Bahadur Bazar, Dinajpur",
        address_bn: "বাহাদুর বাজার, দিনাজপুর",
        areas: [
            "পাহাড়পুর-৮৬৯",
            "বালুয়াডাঙ্গা নতুনপাড়া-২০৭৩"
        ],
        total_voters: 2942,
        type: 'female'
    },
    {
        id: 40,
        name: "Iqbal High School (Double Shift) (West Part)",
        name_bn: "ইকবাল হাই স্কুল (ডাবল শিফট) (পশ্চিমাংশ)",
        address: "Bahadur Bazar, Dinajpur",
        address_bn: "বাহাদুর বাজার, দিনাজপুর",
        areas: [
            "বালুয়াডাঙ্গা-২৩৮৬",
            "বাহাদুর বাজার-৭৩৬"
        ],
        total_voters: 3122,
        type: 'female'
    },
    {
        id: 41,
        name: "Eidgah Sarkari Primary School",
        name_bn: "ঈদগাহ সরকারি প্রাথমিক বিদ্যালয়, ঈদগাহবস্তি",
        address: "Eidgah Bosti, Dinajpur",
        address_bn: "ঈদগাহবস্তি, দিনাজপুর",
        areas: [
            "ঈদগাহ বস্তি- ১১৭৬",
            "কাচারী বাজার-৪২",
            "পুলিশ লাইন- ১৩২",
            "ফুটানীপাড়া (ইসলামবাগ) - ১৭৬",
            "রেলকলোনী- ৩১৭"
        ],
        total_voters: 1843,
        type: 'male'
    },
    {
        id: 42,
        name: "Eidgah Balika High School",
        name_bn: "ঈদগাহ বালিকা উচ্চ বিদ্যালয়, ঈদগাহবস্তি",
        address: "Eidgah Bosti, Dinajpur",
        address_bn: "ঈদগাহবস্তি, দিনাজপুর",
        areas: [
            "ঈদগাহ বস্তি- ১৩৯৪",
            "কাচারী বাজার- ৩৮",
            "পুলিশ লাইন- ৪৬",
            "ফুটানীপাড়া (ইসলামবাগ)- ১৯১",
            "রেলকলোনী- ৩৩৯"
        ],
        total_voters: 2009,
        type: 'female'
    },
    {
        id: 43,
        name: "Kerry Memorial High School (New Building)",
        name_bn: "কেরী মেমোরিয়াল হাই স্কুল (নতুন ভবন), মিশনরোড",
        address: "Mission Road, Dinajpur",
        address_bn: "মিশনরোড, দিনাজপুর",
        areas: [
            "কুঠিবাড়ী- ১৫০",
            "চাতরা পাড়া- ৫৮৭",
            "জুলুম সাগর-৮০",
            "দপ্তরীপাড়া- ১৭৫",
            "মিশন রোড-৮৩৩",
            "মিশনরোড ওয়াপদা-৮৬",
            "মিশনরোড পাহাড়পুর- ১৭৪"
        ],
        total_voters: 2885,
        type: 'male'
    },
    {
        id: 44,
        name: "Kerry Memorial High School (Old Building)",
        name_bn: "কেরী মেমোরিয়াল হাই স্কুল (পুরাতন ভবন) মিশনরোড",
        address: "Mission Road, Dinajpur",
        address_bn: "মিশনরোড, দিনাজপুর",
        areas: [
            "কুঠিবাড়ী-৫৫",
            "চাতরা পাড়া-৬৩৩",
            "জুলুম সাগর-৮৪",
            "দপ্তরীপাড়া-১১৪২",
            "মিশন রোড-৯৫৬",
            "মিশনরোড ওয়াপদা-৮৩",
            "মিশনরোড পাহাড়পুর-১৮৫"
        ],
        total_voters: 3138,
        type: 'female'
    },
    {
        id: 45,
        name: "Textile Institute (North Part)",
        name_bn: "টেক্সটাইল ইনস্টিটিউট (উত্তরাংশ), দিনাজপুর পুলহাট",
        address: "Pulhat, Dinajpur",
        address_bn: "পুলহাট, দিনাজপুর",
        areas: [
            "আউলিয়াপুর- ১৫৭",
            "কসবা-১৮৪৩",
            "পুলহাট স্টাফ কোয়ার্টার-১৫২৬",
            "হামজাপুর-১১"
        ],
        total_voters: 3537,
        type: 'male'
    },
    {
        id: 46,
        name: "Textile Institute (South Part)",
        name_bn: "টেক্সটাইল ইনস্টিটিউট (দক্ষিণাংশ), দিনাজপুর পুলহাট",
        address: "Pulhat, Dinajpur",
        address_bn: "পুলহাট, দিনাজপুর",
        areas: [
            "আউলিয়াপুর-১৭১",
            "কসবা-২৪১২",
            "পুলহাট স্টাফ কোয়ার্টার-১৬৫৯",
            "হামজাপুর-৭"
        ],
        total_voters: 4249,
        type: 'female'
    },
    {
        id: 47,
        name: "Nashipur High School & College",
        name_bn: "নশিপুর হাই স্কুল এন্ড কলেজ, নশিপুর",
        address: "Chehelgazi, Dinajpur",
        address_bn: "চেহেলগাজী, দিনাজপুর",
        areas: [
            "একবারপুর- ৩২৬",
            "নশিপুর- ২৮২৯",
            "সালমাবাদ-৪৩"
        ],
        total_voters: 3198,
        type: 'combined'
    },
    {
        id: 48,
        name: "Kornai Sarkari Primary School (West Part)",
        name_bn: "কর্ণাই সরকারি প্রাথমিক বিদ্যালয় (পশ্চিমাংশ), কর্ণাই",
        address: "Kornai, Chehelgazi, Dinajpur",
        address_bn: "কর্ণাই, চেহেলগাজী, দিনাজপুর",
        areas: [
            "কর্ণাই-২৪৪৯",
            "মহাদেবপুর-৭১৬"
        ],
        total_voters: 3165,
        type: 'male'
    },
    {
        id: 49,
        name: "Kornai Sarkari Primary School (North Part)",
        name_bn: "কর্ণাই সরকারি প্রাথমিক বিদ্যালয় (উত্তরাংশ), কর্ণাই",
        address: "Kornai, Chehelgazi, Dinajpur",
        address_bn: "কর্ণাই, চেহেলগাজী, দিনাজপুর",
        areas: [
            "কর্ণাই-২৩২২",
            "মহাদেবপুর-৬৭৫"
        ],
        total_voters: 2997,
        type: 'female'
    },
    {
        id: 50,
        name: "Subora Sarkari Primary School",
        name_bn: "সুবরা সরকারি প্রাথমিক বিদ্যালয়, সুবরা",
        address: "Subora, Chehelgazi, Dinajpur",
        address_bn: "সুবরা, চেহেলগাজী, দিনাজপুর",
        areas: [
            "উত্তর গোবিন্দপুর-২িমা৮৮",
            "পার উত্তর গোবিন্দপুর-২০৪",
            "সুবরা- ১৩১২"
        ],
        total_voters: 3704,
        type: 'combined'
    },
    {
        id: 51,
        name: "Boroil Sarkari Primary School",
        name_bn: "বড়ইল সরকারি প্রাথমিক বিদ্যালয়, বড়ইল",
        address: "Boroil, Chehelgazi, Dinajpur",
        address_bn: "বড়ইল, চেহেলগাজী, দিনাজপুর",
        areas: [
            "বড়ইল- ২৬৭৭",
            "উত্তর গোসাইপুর- ৩৪৪",
            "ধামাহার-২৯"
        ],
        total_voters: 3050,
        type: 'male'
    },
    {
        id: 52,
        name: "Uttar Goshaipur Adarsha High School",
        name_bn: "উত্তর গোশাইপুর আদর্শ উচ্চ বিদ্যালয়, উত্তর গোসাইপুর",
        address: "Uttar Goshaipur, Dinajpur",
        address_bn: "উত্তর গোসাইপুর, দিনাজপুর",
        areas: [
            "বড়ইল- ২৬৮২",
            "উত্তর গোসাইপুর- ৩৪৪",
            "ধামাহার- ৩৭"
        ],
        total_voters: 3063,
        type: 'female'
    },
    {
        id: 53,
        name: "Suihari Majhadanga Sarkari Primary School",
        name_bn: "সুইহারী মাঝাডাঙ্গা সরকারি প্রাথমিক বিদ্যালয়, মাঝাডাঙ্গা",
        address: "Majhadanga, Chehelgazi, Dinajpur",
        address_bn: "মাঝাডাঙ্গা, চেহেলগাজী, দিনাজপুর",
        areas: [
            "সুইহারী মাঝাডাঙ্গা-৩১০৬"
        ],
        total_voters: 3106,
        type: 'combined'
    },
    {
        id: 54,
        name: "Chandganj Alhaj Soyar Uddin Memorial Bi-Lateral High School & College",
        name_bn: "চাঁদগঞ্জ আলহাজ্ব সোয়ার উদ্দিন মেমোরিয়াল দ্বি-মুখী হাই স্কুল এন্ড কলেজ, মুজাহিদপুর",
        address: "Mujahidpur, Chehelgazi, Dinajpur",
        address_bn: "মুজাহিদপুর, চেহেলগাজী, দিনাজপুর",
        areas: [
            "উত্তর সাদীপুর-৪৪১",
            "উত্তর ভবানীপুর-৭৫৩",
            "নান্দইড়-৫৫৬",
            "মুজাহিদপুর-৮৩৭",
            "মোস্তফাবাদ-৪২৬",
            "মহাবলীপুর-৮১৮",
            "রুদ্রপুর -৭৭৯"
        ],
        total_voters: 4610,
        type: 'combined'
    },
    {
        id: 55,
        name: "Ramjibanpur Islamia Dakhil Madrasa (East Part)",
        name_bn: "রামজীবনপুর ইসলামিয়া দাখিল মাদ্রাসা, রামজীবনপুর",
        address: "Ramjibanpur, Chehelgazi, Dinajpur",
        address_bn: "রামজীবনপুর, চেহেলগাজী, দিনাজপুর",
        areas: [
            "উত্তর বংশীপুর-৭৫১",
            "কামালপুর-৫৬০",
            "পূর্ব শিবরামপুর-৭২৮",
            "রামজীবনপুর-৯১২"
        ],
        total_voters: 2951,
        type: 'combined'
    },
    {
        id: 56,
        name: "Chehelgazi Union Parishad Bhaban",
        name_bn: "চেহেলগাজী ইউনিয়ন পরিষদ ভবন, গোপালগঞ্জ হাট",
        address: "Gopalganj Hat, Chehelgazi, Dinajpur",
        address_bn: "গোপালগঞ্জ হাট, চেহেলগাজী, দিনাজপুর",
        areas: [
            "পশ্চিম শিবরামপুর-২৯৮৬",
            "শেখহাটি- ১১৪৫"
        ],
        total_voters: 4131,
        type: 'combined'
    },
    {
        id: 57,
        name: "Chehelgazi Sarkari Primary School (West Part)",
        name_bn: "চেহেলগাজী সরকারি প্রাথমিক বিদ্যালয়, পশ্চিম শিবরামপুর",
        address: "Paschim Shibrampur, Chehelgazi, Dinajpur",
        address_bn: "পশ্চিম শিবরামপুর, চেহেলগাজী, দিনাজপুর",
        areas: [
            "কিসমত ভূইপাড়া -৫৬৯",
            "দিনাজপুর-২৯৪",
            "নয়নপুর -১০৬৪",
            "বেলাই-৩৫৭",
            "ভূইপাড়া-৬০৫"
        ],
        total_voters: 2889,
        type: 'combined'
    },
    {
        id: 58,
        name: "Phulban Fazil (Snatok) Madrasa",
        name_bn: "ফুলবন ফাজিল (স্নাতক) মাদ্রাসা, রামডুবি মোড়",
        address: "Ramdubi Mor, Sundarban, Dinajpur",
        address_bn: "রামডুবি মোড়, সুন্দরবন, দিনাজপুর",
        areas: [
            "সুন্দরবন-১- ২৫৪৪"
        ],
        total_voters: 2544,
        type: 'combined'
    },
    {
        id: 59,
        name: "Sundarban Sarkari Primary School",
        name_bn: "সুন্দরবন সরকারি প্রাথমিক বিদ্যালয়, সুন্দরবন",
        address: "Sundarban, Dinajpur",
        address_bn: "সুন্দরবন, দিনাজপুর",
        areas: [
            "সুন্দরবন-২-২৬৪২"
        ],
        total_voters: 2642,
        type: 'combined'
    },
    {
        id: 60,
        name: "Boikonthopur Hargao Sarkari Primary School",
        name_bn: "বৈকন্ঠপুর হাড়গাঁও সরকারি প্রাথমিক বিদ্যালয়, সুন্দরপুর",
        address: "Sundarpur, Sundarban, Dinajpur",
        address_bn: "সুন্দরপুর, সুন্দরবন, দিনাজপুর",
        areas: [
            "সুন্দরবন-৩-৩৫০৯"
        ],
        total_voters: 3509,
        type: 'combined'
    },
    {
        id: 61,
        name: "Sadarpur Bi-Lateral High School",
        name_bn: "সদরপুর দ্বি-মুখী উচ্চ বিদ্যালয়, সদরপুর",
        address: "Sadarpur, Sundarban, Dinajpur",
        address_bn: "সদরপুর, সুন্দরবন, দিনাজপুর",
        areas: [
            "সদরপুর-২৭৩২",
            "হারগাঁও-৫৪২"
        ],
        total_voters: 3274,
        type: 'combined'
    },
    {
        id: 62,
        name: "Khosalpur Sarkari Primary School",
        name_bn: "খোসালপুর সরকারি প্রাথমিক বিদ্যালয়, খোসালপুর",
        address: "Khosalpur, Sundarban, Dinajpur",
        address_bn: "খোসালপুর, সুন্দরবন, দিনাজপুর",
        areas: [
            "আমইর-১১৫৯",
            "খোসালপুর-২৭৫৯",
            "গোদাগাড়ী-২২৫"
        ],
        total_voters: 4143,
        type: 'combined'
    },
    {
        id: 63,
        name: "Shivpur Darbarpur Sarkari Primary School",
        name_bn: "শিবপুর দরবারপুর সরকারি প্রাথমিক বিদ্যালয়, শিবপুর",
        address: "Shivpur, Sundarban, Dinajpur",
        address_bn: "শিবপুর, সুন্দরবন, দিনাজপুর",
        areas: [
            "উত্তর শিবপুর-১৯৮৮",
            "দরবারপুর -২০৪৯"
        ],
        total_voters: 4037,
        type: 'combined'
    },
    {
        id: 64,
        name: "Birgaon Sarkari Primary School",
        name_bn: "বীরগাঁও সরকারি প্রাথমিক বিদ্যালয়, বীরগাঁও",
        address: "Birgaon, Dinajpur",
        address_bn: "বীরগাঁও, দিনাজপুর",
        areas: [
            "তরজীনি -৪১",
            "ফুলবন-৫৭৫",
            "বীরগাঁও-১০১৩",
            "বার বীরগাঁও-১৮৩"
        ],
        total_voters: 1812,
        type: 'combined'
    },
    {
        id: 65,
        name: "Kalikapur Sarkari Primary School",
        name_bn: "কালিকাপুর সরকারি প্রাথমিক বিদ্যালয়, কালিকাপুর",
        address: "Kalikapur, Dinajpur",
        address_bn: "কালিকাপুর, দিনাজপুর",
        areas: [
            "কালিকাপুর (৮নংওয়ার্ড অংশ)-২৩৮৬"
        ],
        total_voters: 2386,
        type: 'combined'
    },
    {
        id: 66,
        name: "Belbari Sarkari Primary School",
        name_bn: "বেলবাড়ী সরকারি প্রাথমিক বিদ্যালয়, বেলবাড়ী",
        address: "Belbari, Dinajpur",
        address_bn: "বেলবাড়ী, দিনাজপুর",
        areas: [
            "বেলবাড়ী-৭০৮",
            "কালিকাপুর (৯নং ওয়ার্ড অংশ)- ২০২৩"
        ],
        total_voters: 2736,
        type: 'combined'
    },
    {
        id: 67,
        name: "Raniganj Eahiya Hossain High School (New Building)",
        name_bn: "রাণীগঞ্জ এহিয়া হোসেন হাই স্কুল এন্ড কলেজ (নতুন ভবন), রাণীগঞ্জ",
        address: "Raniganj, Dinajpur",
        address_bn: "রাণীগঞ্জ, দিনাজপুর",
        areas: [
            "আরাজি ফাজিলপুর -২০৩",
            "উত্তর মহারাজপুর-১১৩",
            "ফাজিলপুর -৪৫৭",
            "বিন্দুর সাই-১৩৫",
            "রাণীগঞ্জ বাজার -৪৯২",
            "রায়পুর-১৫৯",
            "উত্তর মহেশপুর-৯৬৪",
            "গুদিপাড়া-১২২",
            "শুড়িবেলতেড়-৪০১",
            "পূর্ব রাণীগঞ্জ-৩২৩"
        ],
        total_voters: 3369,
        type: 'male'
    },
    {
        id: 68,
        name: "Raniganj Eahiya Hossain High School (Old Building)",
        name_bn: "রাণীগঞ্জ এহিয়া হোসেন হাই স্কুল এন্ড কলেজ (পুরাতন ভবন), রাণীগঞ্জ",
        address: "Raniganj, Dinajpur",
        address_bn: "রাণীগঞ্জ, দিনাজপুর",
        areas: [
            "আরাজি ফাজিলপুর -২১৪",
            "উত্তর মহারাজপুর-১২১",
            "ফাজিলপুর -৪৬৭",
            "বিন্দুর সাই-১২২",
            "রাণীগঞ্জ বাজার -৪৮৮",
            "রায়পুর-১৯৪",
            "উত্তর মহেশপুর-১০০৯",
            "গুদিপাড়া-১৪৯",
            "শুড়িবেলতেড়-৪১৮",
            "পূর্ব রাণীগঞ্জ-৩২০"
        ],
        total_voters: 3502,
        type: 'female'
    },
    {
        id: 69,
        name: "Ranipur Sarkari Primary School",
        name_bn: "রাণীপুর সরকারি প্রাথমিক বিদ্যালয়, রাণীপুর",
        address: "Ranipur, Dinajpur",
        address_bn: "রাণীপুর, দিনাজপুর",
        areas: [
            "উত্তর রাণীপুর -১৫৭৮",
            "দক্ষিণ রাণীপুর -২০৯৬"
        ],
        total_voters: 3674,
        type: 'combined'
    },
    {
        id: 70,
        name: "Paschim Maharajpur Sarkari Primary School",
        name_bn: "পশ্চিম মহারাজপুর সরকারি প্রাথমিক বিদ্যালয়, পশ্চিম মহারাজপুর",
        address: "Paschim Maharajpur, Dinajpur",
        address_bn: "পশ্চিম মহারাজপুর, দিনাজপুর",
        areas: [
            "পশ্চিম মহারাজপুর-২২২৭"
        ],
        total_voters: 2227,
        type: 'combined'
    },
    {
        id: 71,
        name: "Maharajpur Balapara Sarkari Primary School",
        name_bn: "মহারাজপুর বালাপা্ড়া সরকারি প্রাথমিক বিদ্যালয়, মহারাজপুর বালাপা্ড়া",
        address: "Maharajpur Balapara, Dinajpur",
        address_bn: "মহারাজপুর বালাপা্ড়া, দিনাজপুর",
        areas: [
            "পূর্ব মহারাজপুর-২২৮৮",
            "পারগাঁও-১১০৮",
            "পশুরামপুর- ২৮২"
        ],
        total_voters: 3708,
        type: 'combined'
    },
    {
        id: 72,
        name: "Khanpur Sarkari Primary School",
        name_bn: "ঝানঝিরা সরকারি প্রাথমিক বিদ্যালয়, ঝানঝিরা",
        address: "Khanpur, Dinajpur", // Based on OCR "Jhanjhira/Khanpur"? OCR says "Jhanjhira". Let's use name_bn
        address_bn: "ঝানঝিরা, দিনাজপুর",
        areas: [
            "ঘোষপুর- ৫৭৭",
            "ঝানঝিরা- ৩০০৫"
        ],
        total_voters: 3582,
        type: 'combined'
    },
    {
        id: 73,
        name: "Harirampur Sarkari Primary School",
        name_bn: "হরিরামপুর সরকারি প্রাথমিক বিদ্যালয়, হরিরামপুর",
        address: "Harirampur, Dinajpur",
        address_bn: "হরিরামপুর, দিনাজপুর",
        areas: [
            "উত্তর হরিরামপুর- ২১৩২",
            "পুরস্তমপুর- ৮৫৩"
        ],
        total_voters: 2985,
        type: 'combined'
    },
    {
        id: 74,
        name: "Purba Pargoan Prankumar High School",
        name_bn: "পূর্ব পারগাঁও প্রাণকুমার উচ্চ বিদ্যালয়, পূর্ব পারগাঁও",
        address: "Purba Pargoan, Dinajpur",
        address_bn: "পূর্ব পারগাঁও, দিনাজপুর",
        areas: [
            "উলটগাঁও-৫০২",
            "দূর্গাপুর-১৮১",
            "পূর্ব পারগাঁও-১৪৮১",
            "লক্ষীদহ-২৭৪"
        ],
        total_voters: 2438,
        type: 'combined'
    },
    {
        id: 75,
        name: "Bolteor Sarkari Primary School",
        name_bn: "বলতেড় সরকারি প্রাথমিক বিদ্যালয়, বলতেড়",
        address: "Bolteor, Shekhpura, Dinajpur",
        address_bn: "বলতেড়, শেখপুরা, দিনাজপুর",
        areas: [
            "খামারকান্তবাগ-৭৪২",
            "নুলাইবাড়ী-১০৩৪",
            "বলতেড়-৮৯৬",
            "রাজারামপুর-১৬৮৪"
        ],
        total_voters: 4356,
        type: 'combined'
    },
    {
        id: 76,
        name: "Rajarampur Sarkari Primary School",
        name_bn: "রাজারামপুর সরকারি প্রাথমিক বিদ্যালয়, রাজারামপুর",
        address: "Rajarampur, Shekhpura, Dinajpur",
        address_bn: "রাজারামপুর, শেখপুরা, দিনাজপুর",
        areas: [
            "নিশ্চিন্তপুর (২নং ওয়ার্ড অংশ)-৭৫২",
            "বিশ্বনাথপুর- ৮৩১",
            "ভাটপাড়া ২- ৯৯১",
            "উত্তর দেবীপুর- ৭৭৪"
        ],
        total_voters: 3348,
        type: 'combined'
    },
    {
        id: 77,
        name: "Raipur Sarkari Primary School",
        name_bn: "রায়পুর সরকারি প্রাথমিক বিদ্যালয়, উত্তর দেবীপুর",
        address: "Uttar Debipur, Shekhpura, Dinajpur",
        address_bn: "উত্তর দেবীপুর, শেখপুরা, দিনাজপুর",
        areas: [
            "নহনা- ১১৩৯",
            "নিশ্চিন্তপুর (৩নং ওয়ার্ড অংশ)- ১৫৮৭",
            "ভাটপাড়া (৩নং ওয়ার্ড অংশ)- ১১৯৮"
        ],
        total_voters: 3924,
        type: 'combined'
    },
    {
        id: 78,
        name: "Dighan Sarkari Primary School",
        name_bn: "দিঘন সরকারি প্রাথমিক বিদ্যালয়, দিঘন",
        address: "Dighan, Shekhpura, Dinajpur",
        address_bn: "দিঘন, শেখপুরা, দিনাজপুর",
        areas: [
            "দিঘন- ২৫০০",
            "পার দিঘন- ৬০৩"
        ],
        total_voters: 3103,
        type: 'combined'
    },
    {
        id: 79,
        name: "Purba Ramnagar Sarkari Primary School",
        name_bn: "পূর্ব রামনগর সরকারি প্রাথমিক বিদ্যালয়, পূর্ব রামনগর",
        address: "Purba Ramnagar, Shekhpura, Dinajpur",
        address_bn: "পূর্ব রামনগর, শেখপুরা, দিনাজপুর",
        areas: [
            "উত্তর গোপালপুর- ১৫৫০",
            "পূর্ব রামনগর- ১২৬২"
        ],
        total_voters: 2812,
        type: 'combined'
    },
    {
        id: 80,
        name: "Joydebpur Sarkari Primary School",
        name_bn: "জয়দেবপুর সরকারি প্রাথমিক বিদ্যালয়, জয়দেবপুর",
        address: "Joydebpur, Shekhpura, Dinajpur",
        address_bn: "জয়দেবপুর, শেখপুরা, দিনাজপুর",
        areas: [
            "উত্তর জয়দেবপুর-১৭৫১",
            "চক দেওতেড়-৬৩৫"
        ],
        total_voters: 2386,
        type: 'combined'
    },
    {
        id: 81,
        name: "Shivpur Sarkari Primary School",
        name_bn: "শিবপুর সরকারি প্রাথমিক বিদ্যালয়, শিবপুর",
        address: "Shivpur, Shekhpura, Dinajpur",
        address_bn: "শিবপুর, শেখপুরা, দিনাজপুর",
        areas: [
            "কিসমত মাধবপুর- ৭২৪",
            "দেওতেড়- ৬৩৫",
            "দক্ষিণ শিবপুর- ১২৭৬"
        ],
        total_voters: 2635,
        type: 'combined'
    },
    {
        id: 82,
        name: "Dakshin Nagar Sarkari Primary School",
        name_bn: "দক্ষিণ নগর সরকারি প্রাথমিক বিদ্যালয়, দক্ষিণ নগর",
        address: "Dakshin Nagar, Shekhpura, Dinajpur",
        address_bn: "দক্ষিণ নগর, শেখপুরা, দিনাজপুর",
        areas: [
            "দক্ষিণ নগর-১৮৭৪",
            "হোসেনপুর-১১২৯"
        ],
        total_voters: 3003,
        type: 'combined'
    },
    {
        id: 83,
        name: "Madhabpur Sarkari Primary School",
        name_bn: "মাধবপুর সরকারি প্রাথমিক বিদ্যালয়, মাধবপুর",
        address: "Madhabpur, Shekhpura, Dinajpur",
        address_bn: "মাধবপুর, শেখপুরা, দিনাজপুর",
        areas: [
            "ভাটিনা-১০৮৪",
            "মাধবপুর-১৯২৬"
        ],
        total_voters: 3010,
        type: 'combined'
    },
    {
        id: 84,
        name: "Kashipur Madhyamik Bidyalay",
        name_bn: "কাশীপুর মাধ্যমিক বিদ্যালয়, কাশীপুর",
        address: "Kashipur, Shashra, Dinajpur",
        address_bn: "কাশীপুর, শশরা, দিনাজপুর",
        areas: [
            "কিসমত মাধবপুর-৫৪৩",
            "খোদমাধবপুর- ৭৬৫",
            "চৌঘরিয়া-২২৫",
            "নিমতাড়া -৫৫২",
            "ভবাই নগর -১১০৪"
        ],
        total_voters: 3189,
        type: 'male'
    },
    {
        id: 85,
        name: "Kashipur Sarkari Primary School",
        name_bn: "কাশীপুর সরকারি প্রাথমিক বিদ্যালয়, কাশীপুর",
        address: "Kashipur, Shashra, Dinajpur",
        address_bn: "কাশীপুর, শশরা, দিনাজপুর",
        areas: [
            "কিসমত মাধবপুর-৫৭৯",
            "খোদমাধবপুর-৮১৬",
            "চৌঘরিয়া-২৩৯",
            "নিমতাড়া -৫৯৩",
            "ভবাই নগর -১০৫৩"
        ],
        total_voters: 3280,
        type: 'female'
    },
    {
        id: 86,
        name: "Mohotullapur Sarkari Primary School",
        name_bn: "মহতুল্লাপুর সরকারি প্রাথমিক বিদ্যালয়, মহতুল্লাপুর",
        address: "Mohotullapur, Shashra, Dinajpur",
        address_bn: "মহতুল্লাপুর, শশরা, দিনাজপুর",
        areas: [
            "মহতুল্লাপুর- ২৩৮৯"
        ],
        total_voters: 2389,
        type: 'combined'
    },
    {
        id: 87,
        name: "Darail Sarkari Primary School",
        name_bn: "দাড়াইল সরকারি প্রাথমিক বিদ্যালয়, দাড়াইল",
        address: "Darail, Shashra, Dinajpur",
        address_bn: "দাড়াইল, শশরা, দিনাজপুর",
        areas: [
            "দাড়াইল-২০৫৩"
        ],
        total_voters: 2053,
        type: 'combined'
    },
    {
        id: 88,
        name: "Porajpur Fasiladunga High School",
        name_bn: "পরজপুর ফাসিলা ডাঙ্গা উচ্চ বিদ্যালয়, পরজপুর",
        address: "Porajpur, Shashra, Dinajpur",
        address_bn: "পরজপুর, শশরা, দিনাজপুর",
        areas: [
            "পরজপুর-২৩৬০",
            "অর্জুনপুর-৫৪৮",
            "দক্ষিণ হরিরামপুর-৬৭৩"
        ],
        total_voters: 3581,
        type: 'combined'
    },
    {
        id: 89,
        name: "Shashra High School",
        name_bn: "শশরা উচ্চ বিদ্যালয়, শশরা",
        address: "Shashra, Dinajpur",
        address_bn: "শশরা, দিনাজপুর",
        areas: [
            "শশরা-২২৭৯",
            "চকমধু -৪৪৯",
            "শ্রী কণ্ঠপুর-৮৫৬"
        ],
        total_voters: 3584,
        type: 'combined'
    },
    {
        id: 90,
        name: "Umar Pail Sarkari Primary School",
        name_bn: "উমর পাইল সরকারি প্রাথমিক বিদ্যালয়, উমর পাইল",
        address: "Umar Pail, Shashra, Dinajpur",
        address_bn: "উমর পাইল, শশরা, দিনাজপুর",
        areas: [
            "কাউগাঁ -৮৭৪",
            "উমরপাইল-১৭৭২",
            "রাজাপুকুর-৮৯৩"
        ],
        total_voters: 3539,
        type: 'combined'
    }
];

// Strip voter count suffix from area names (e.g. "লালবাগ-১৭২৭" → "লালবাগ")
const cleanAreaName = (raw: string): string => {
    // Remove trailing "-<bengali digits>" or "- <bengali digits>" patterns
    return raw.replace(/[\s-]+[০-৯]+\s*$/, '').trim();
};

// Helper to get all unique CLEAN area names for the dropdown
export const getAllAreas = (): string[] => {
    const areas = new Set<string>();
    VOTE_CENTERS.forEach(center => {
        center.areas.forEach(area => areas.add(cleanAreaName(area)));
    });
    return Array.from(areas).sort();
};

// Find ALL centers that serve a given clean area name
export const getCentersByCleanArea = (cleanArea: string): VoteCenterData[] => {
    return VOTE_CENTERS.filter(center =>
        center.areas.some(raw => cleanAreaName(raw) === cleanArea)
    );
};

// Legacy single-center lookup (kept for compatibility)
export const getCenterByArea = (area: string) => {
    return VOTE_CENTERS.find(center => center.areas.includes(area));
};
