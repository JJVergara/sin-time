import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ijsqqaufyfatvvfozwcf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqc3FxYXVmeWZhdHZ2Zm96d2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyMjY0MDQsImV4cCI6MjAxNTgwMjQwNH0.XS_bNlQhS_w5iAOd8fkYAnB3cFSfQHlHGGwJfcZICHA'
export const supabase = createClient(supabaseUrl, supabaseKey)