// Analytics Configuration
// Update these values to point to your analytics deployment

export const analyticsConfig = {
  // Your analytics server URL (where you deployed the analytics suite)
  analyticsUrl: process.env.NEXT_PUBLIC_ANALYTICS_URL || 'https://analytics.yourdomain.com',
  
  // Site ID for this website
  siteId: process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID || 'font-previewer',
  
  // Enable/disable analytics (useful for development)
  enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false',
};

// For local development, you might want to set these in .env.local:
// NEXT_PUBLIC_ANALYTICS_URL=http://localhost
// NEXT_PUBLIC_ANALYTICS_SITE_ID=font-previewer-dev
// NEXT_PUBLIC_ANALYTICS_ENABLED=false