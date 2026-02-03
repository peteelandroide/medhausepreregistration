// Follows Deno usage
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const CORSEHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper: Hash data using SHA-256
async function hashData(data: string | undefined): Promise<string | undefined> {
    if (!data) return undefined;
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: CORSEHeaders })
    }

    try {
        const { pixelId, eventName, eventData, eventId, eventSourceUrl, userData, testEventCode } = await req.json()
        const accessToken = Deno.env.get('META_ACCESS_TOKEN')

        if (!accessToken) {
            throw new Error('Missing META_ACCESS_TOKEN')
        }

        // Get Client IP
        const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('cf-connecting-ip') || '0.0.0.0';

        // Hash PII Data
        const hashedEmail = await hashData(userData?.email);
        const hashedPhone = await hashData(userData?.phone);
        const hashedFirstName = await hashData(userData?.firstName);
        const hashedLastName = await hashData(userData?.lastName);
        const hashedCity = await hashData(userData?.city);
        const hashedState = await hashData(userData?.state);
        const hashedZip = await hashData(userData?.zip);
        const hashedCountry = await hashData(userData?.country); // Should be 2-letter ISO (e.g., 'co')

        // Current timestamp in seconds
        const currentTimestamp = Math.floor(Date.now() / 1000)

        const payload: any = {
            data: [
                {
                    event_name: eventName,
                    event_time: currentTimestamp,
                    event_id: eventId,
                    event_source_url: eventSourceUrl,
                    action_source: "website",
                    user_data: {
                        client_ip_address: clientIp,
                        client_user_agent: userData?.userAgent,
                        fbc: userData?.fbc,
                        fbp: userData?.fbp,
                        em: hashedEmail ? [hashedEmail] : undefined,
                        ph: hashedPhone ? [hashedPhone] : undefined,
                        fn: hashedFirstName ? [hashedFirstName] : undefined,
                        ln: hashedLastName ? [hashedLastName] : undefined,
                        ct: hashedCity ? [hashedCity] : undefined,
                        st: hashedState ? [hashedState] : undefined,
                        zp: hashedZip ? [hashedZip] : undefined,
                        country: hashedCountry ? [hashedCountry] : undefined
                    },
                    custom_data: eventData,
                },
            ]
        }

        // Add test_event_code if provided
        if (testEventCode) {
            payload.test_event_code = testEventCode;
        }

        console.log(`Sending ${eventName} to Meta CAPI...`)

        const response = await fetch(
            `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }
        )

        const result = await response.json()
        console.log('Meta CAPI Response:', result)

        return new Response(JSON.stringify(result), {
            headers: { ...CORSEHeaders, 'Content-Type': 'application/json' },
            status: response.status,
        })

    } catch (error) {
        console.error('Error processing CAPI event:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...CORSEHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
