import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pxpptalixswgbajiyubz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4cHB0YWxpeHN3Z2Jhaml5dWJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NDQ2NDUsImV4cCI6MjA4MDIyMDY0NX0.3HZrkf4MKfEqXi91f7QJVP0QRqGeQ_wZtNFT20oddsU'

export const supabase = createClient(supabaseUrl, supabaseKey)