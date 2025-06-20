# Analytics Setup for Font Previewer

This guide explains how to integrate the B2B Analytics Suite with your Font Previewer website.

## Quick Setup

### 1. Deploy Analytics Suite

First, deploy the analytics suite on your server (see main analytics README):

```bash
cd /path/to/analytics-suite
sudo bash src/scripts/setup_analytics.sh analytics.yourdomain.com
```

### 2. Configure Analytics in Font Previewer

Create a `.env.local` file in your font-previewer directory:

```bash
# Analytics Configuration
NEXT_PUBLIC_ANALYTICS_URL=https://analytics.yourdomain.com
NEXT_PUBLIC_ANALYTICS_SITE_ID=font-previewer
NEXT_PUBLIC_ANALYTICS_ENABLED=true

# For development, you might want:
# NEXT_PUBLIC_ANALYTICS_URL=http://localhost
# NEXT_PUBLIC_ANALYTICS_ENABLED=false
```

### 3. What's Being Tracked

The integration automatically tracks:

- **Page Views**: Every page visit
- **Font Selection**: When users change fonts in any panel
- **Font Comparison**: Which fonts are being compared
- **Feature Usage**: 
  - Font size adjustments
  - Font weight changes
  - Letter spacing modifications
  - Color selections
  - Live preview activation
- **Text Preview**: When users change the preview text

### 4. View Analytics

Visit your analytics dashboard at:
```
https://analytics.yourdomain.com/dashboard/
```

Update the `SITE_ID` in the dashboard HTML to match your site ID ('font-previewer').

## Analytics Data Examples

### Font Selection Event
```json
{
  "event": "font_selected",
  "properties": {
    "font_name": "Montserrat",
    "panel_id": "panel-1",
    "tool": "font-previewer"
  }
}
```

### Feature Usage Event
```json
{
  "event": "feature_used",
  "properties": {
    "feature": "font_size",
    "value": 32,
    "tool": "font-previewer"
  }
}
```

## B2B Insights

Since this is a design tool, you can track:

1. **Company Usage**: Which companies (by domain) use your tool
2. **Design Preferences**: Most popular fonts by industry
3. **Feature Adoption**: Which features are used most
4. **User Journey**: How users explore different fonts

## Testing Analytics

1. Open your font previewer in development mode
2. Open browser console
3. Look for "Analytics loaded" message
4. Try changing fonts and features
5. Check your analytics dashboard after 5 minutes (processing delay)

## Troubleshooting

### Analytics Not Loading
- Check browser console for errors
- Verify CORS is enabled on analytics server
- Ensure analytics URL is correct in .env.local

### Events Not Appearing
- Wait 5 minutes for processing
- Check nginx logs: `tail -f /var/log/analytics/events.log`
- Verify site ID matches in dashboard

### Development Mode
To disable analytics during development:
```bash
NEXT_PUBLIC_ANALYTICS_ENABLED=false
```

## Custom Events

You can add more tracking by using the `useAnalytics` hook:

```typescript
import { useAnalytics } from '@/components/analytics/Analytics';

function MyComponent() {
  const { trackFeatureUsage } = useAnalytics();
  
  const handleCustomAction = () => {
    trackFeatureUsage('custom_feature', 'value');
  };
}
```

## Privacy & GDPR

The analytics system:
- Doesn't use cookies
- Doesn't track personal information
- Hashes IP addresses
- Is GDPR compliant

You may want to add a privacy notice to your site.

## Next Steps

1. Deploy analytics suite on your server
2. Update .env.local with your analytics URL
3. Deploy font-previewer
4. Monitor usage patterns
5. Use insights to improve the tool