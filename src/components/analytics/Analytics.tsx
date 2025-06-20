'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analyticsConfig } from '@/config/analytics';

declare global {
  interface Window {
    b2bAnalytics: any;
  }
}

interface AnalyticsProps {
  siteId?: string;
  analyticsUrl?: string;
}

export function Analytics({ 
  siteId = analyticsConfig.siteId,
  analyticsUrl = analyticsConfig.analyticsUrl
}: AnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Skip if analytics is disabled
    if (!analyticsConfig.enabled) {
      console.log('Analytics disabled');
      return;
    }
    
    console.log('Loading analytics from:', analyticsUrl);
    
    // Load analytics script
    const script = document.createElement('script');
    script.src = `${analyticsUrl}/tracker.min.js`;
    script.setAttribute('data-site', siteId);
    script.async = true;
    
    script.onload = () => {
      console.log('Analytics script loaded');
      
      // Track this as a tool/app usage
      if (window.b2bAnalytics) {
        window.b2bAnalytics.trackContent({
          id: 'font-previewer-app',
          title: 'Font Previewer Tool',
          category: 'design-tools',
          tags: ['typography', 'fonts', 'design'],
        });
      }
    };

    script.onerror = () => {
      console.error('Failed to load analytics script');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [siteId, analyticsUrl]);

  // Track route changes
  useEffect(() => {
    if (window.b2bAnalytics) {
      window.b2bAnalytics.track('pageview');
    }
  }, [pathname, searchParams]);

  return null;
}

// Custom hook for tracking font-specific events
export function useAnalytics() {
  const trackFontChange = (fontName: string, panel: string) => {
    if (analyticsConfig.enabled && window.b2bAnalytics) {
      window.b2bAnalytics.trackEvent('font_selected', {
        font_name: fontName,
        panel_id: panel,
        tool: 'font-previewer'
      });
    }
  };

  const trackFontComparison = (fonts: string[]) => {
    if (analyticsConfig.enabled && window.b2bAnalytics) {
      window.b2bAnalytics.trackEvent('fonts_compared', {
        fonts: fonts,
        font_count: fonts.length,
        tool: 'font-previewer'
      });
    }
  };

  const trackFeatureUsage = (feature: string, value: any) => {
    if (analyticsConfig.enabled && window.b2bAnalytics) {
      window.b2bAnalytics.trackEvent('feature_used', {
        feature: feature,
        value: value,
        tool: 'font-previewer'
      });
    }
  };

  const trackTextPreview = (textLength: number) => {
    if (analyticsConfig.enabled && window.b2bAnalytics) {
      window.b2bAnalytics.trackEvent('preview_text_changed', {
        text_length: textLength,
        tool: 'font-previewer'
      });
    }
  };

  return {
    trackFontChange,
    trackFontComparison,
    trackFeatureUsage,
    trackTextPreview
  };
}
