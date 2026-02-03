import { useEffect } from 'react';

// Type for the fb/fbq function
declare global {
    interface Window {
        fbq: any;
        _fbq: any;
    }
}

// TODO: Replace with actual Pixel ID from user or environment variable
const PIXEL_ID = '844985545161151'; // Updated with real ID
const SUPABASE_FUNCTION_URL = 'https://pxpptalixswgbajiyubz.supabase.co/functions/v1/meta-capi'; // Replace with your project details if different
const TEST_EVENT_CODE = ''; // Optional: Add code from "Test Events" tab in Meta (e.g., 'TEST12345')

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

export const MetaPixel = () => {
    useEffect(() => {
        // Check if Pixel is already initialized to avoid duplicate scripts
        if (window.fbq) return;

        let n;
        n = window.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!window._fbq) window._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];

        // Create script element
        const t = document.createElement('script');
        t.async = !0;
        t.src = 'https://connect.facebook.net/en_US/fbevents.js';

        // Insert script
        const s = document.getElementsByTagName('script')[0];
        if (s && s.parentNode) {
            s.parentNode.insertBefore(t, s);
        }

        // Init Pixel
        window.fbq('init', PIXEL_ID);

        // Track initial page view
        window.fbq('track', 'PageView');
    }, []);

    return (
        <noscript>
            <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                alt="Meta Pixel"
            />
        </noscript>
    );
};

// Helper to track page views manually (call this on route/view changes)
export const trackPageView = () => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
    }
};

// Track custom events manually
export const trackEvent = async (eventName: string, data: Record<string, any> = {}, userData: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
        const eventId = generateEventId();

        // 1. Browser Tracking (Pixel)
        window.fbq('track', eventName, data, { eventID: eventId });

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
                    pixelId: PIXEL_ID,
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
            console.log(`[Meta CAPI] Sent ${eventName} to server.`);
        } catch (error) {
            console.error('[Meta CAPI] Validation failed:', error);
        }
    } else {
        console.warn('Meta Pixel not initialized via script yet.');
    }
};
