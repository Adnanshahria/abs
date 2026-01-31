# Amar Ballot - Project Documentation

## Overview
**Amar Ballot** is a civic engagement web application designed to help citizens become informed and responsible voters in Bangladesh. The application features an AI assistant named "Prerona" who guides users through voting eligibility and provides quick access to election resources.

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 7.x
- **Styling**: TailwindCSS 4.x
- **Icons**: Lucide React

## Project Structure
```
amar-ballot-web/
├── src/
│   ├── components/
│   │   ├── Header.tsx       # Navigation with pill-shaped buttons
│   │   ├── EligibilityCard.tsx  # Voter eligibility checklist
│   │   ├── AssistantAvatar.tsx  # Prerona AI assistant
│   │   ├── QuickLinks.tsx   # Quick access to voting resources
│   │   └── Footer.tsx       # Emergency contacts bar
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # TailwindCSS imports
├── public/
├── package.json
└── vite.config.ts
```

## Features
1. **Header**: Sticky navigation with pill-shaped buttons, language toggle, notifications, and login
2. **Eligibility Checker**: Interactive checklist to verify voter readiness
3. **Prerona Assistant**: Virtual guide with helpful voting information
4. **Quick Links**: One-click access to Election Updates, Vote Centers, Courses, etc.
5. **Emergency Contacts**: Quick access to 999 and nearby police

## Running the Project
```bash
cd amar-ballot-web
npm install
npm run dev
```

## Design Notes
- Color palette: Green-based (#4CAF50, #22C55E) for civic/eco theme
- Rounded elements: `rounded-full` for buttons, `rounded-2xl` for cards
- Responsive: Mobile-first design with breakpoint at `md` (768px)
