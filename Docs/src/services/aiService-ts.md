# File: src/services/aiService.ts

## Analysis
- **Type**: Service (AI Chat)
- **Purpose**: Handle AI chat interactions with Prerona assistant
- **Key Features**:
    - **Local Database Search**: Searches election updates and rumors first
    - **Web Search**: Uses Brave Search API for real-time web results
    - **Groq Integration**: Sends combined context to Llama 3.3 70B model
    - **Fallback**: Mock responses when API keys unavailable
- **Search Priority**:
    1. Local database (updates + rumors) - always runs
    2. Web search (Brave) - if enabled
    3. AI generation (Groq) - combines all context
- **Dependencies**: `api` (getUpdates, getRumors), Groq API, Brave API

## Data Flow
```
User Question → Local DB Search → Web Search → Groq AI → Response
```

## Identified Bugs / Issues
- No bugs found.
