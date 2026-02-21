import { useEffect } from 'react';

// Type for the fb/fbq function
declare global {
    interface Window {
        fbq: any;
        _fbq: any;
    }
}

// Default Pixel ID for MedHause
export const DEFAULT_PIXEL_ID = '844985545161151';
const SUPABASE_FUNCTION_URL = 'https://pxpptalixswgbajiyubz.supabase.co/functions/v1/meta-capi';
const TEST_EVENT_CODE = ''; // Set to empty for production

// Helper to get cookie value
const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

// Helper to generate unique Event ID
const generateEventId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

interface MetaPixelProps {
    pixelId?: string;
}

export const MetaPixel = ({ pixelId = DEFAULT_PIXEL_ID }: MetaPixelProps) => {
    useEffect(() => {
        // We only initialize if it's the first one or a different one
        // Note: multiple fbq('init') calls are supported by Meta to track to different pixels

        if (!window.fbq) {
            let n;
            n = window.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!window._fbq) window._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];

            const t = document.createElement('script');
            t.async = !0;
            t.src = 'https://connect.facebook.net/en_US/fbevents.js';

            const s = document.getElementsByTagName('script')[0];
            if (s && s.parentNode) {
                s.parentNode.insertBefore(t, s);
            }
        }

        // Init the specific Pixel
        window.fbq('init', pixelId);

        // Track initial page view specifically for this pixel to avoid global double-counting
        window.fbq('trackSingle', pixelId, 'PageView', {}, { eventID: generateEventId() });
    }, [pixelId]);

    return (
        <noscript>
            <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt="Meta Pixel"
            />
        </noscript>
    );
};

// Helper to track page views manually (call this on route/view changes)
export const trackPageView = (pixelId: string = DEFAULT_PIXEL_ID) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackSingle', pixelId, 'PageView');
    }
};

// Track custom events manually
export const trackEvent = async (
    eventName: string,
    data: Record<string, any> = {},
    userData: Record<string, any> = {},
    pixelId: string = DEFAULT_PIXEL_ID
) => {
    if (typeof window !== 'undefined' && window.fbq) {
        const eventId = generateEventId();

        // 1. Browser Tracking (Pixel)
        // trackSingle specific pixel to avoid cross-firing if multiple are present
        window.fbq('trackSingle', pixelId, eventName, data, { eventID: eventId });

        // 2. Server-Side Tracking (CAPI)
        try {
            const fbp = getCookie('_fbp');
            const fbc = getCookie('_fbc');

            await fetch(SUPABASE_FUNCTION_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pixelId: pixelId,
                    eventName,
                    eventData: data,
                    eventId,
                    eventSourceUrl: window.location.href,
                    testEventCode: TEST_EVENT_CODE,
                    userData: {
                        fbp,
                        fbc,
                        userAgent: navigator.userAgent,
                        email: userData.email,
                        phone: userData.phone,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        city: userData.city,
                        state: userData.state,
                        country: userData.country
                    }
                })
            });
            console.log(`[Meta CAPI] Sent ${eventName} to server for pixel ${pixelId}.`);
        } catch (error) {
            console.error('[Meta CAPI] Validation failed:', error);
        }
    } else {
        console.warn('Meta Pixel not initialized via script yet.');
    }
};
