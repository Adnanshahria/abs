


interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export default function SEO({
    title = 'Amar Ballot',
    description = 'Empowering every voter with the right information.',
    image = '/og-image.png',
    url = 'https://amarballot.com'
}: SEOProps) {
    // In a real app, you might want localized defaults
    const siteTitle = title === 'Amar Ballot' ? title : `${title} | Amar Ballot`;

    return (
        <>
            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={description} />
            {/* Note: React 19 doesn't fully support <html lang> injection this way yet, usually handled by index.html or SSR */}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </>
    );
}
