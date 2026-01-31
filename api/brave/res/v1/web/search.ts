export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const count = searchParams.get('count') || '3';

    const BRAVE_API_KEY = process.env.VITE_BRAVE_API_KEY || '';

    if (!BRAVE_API_KEY) {
        return new Response(JSON.stringify({ error: 'Brave API key not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (!query) {
        return new Response(JSON.stringify({ error: 'Query parameter q is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const response = await fetch(
            `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${count}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'X-Subscription-Token': BRAVE_API_KEY
                }
            }
        );

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Brave API proxy error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch from Brave API' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
