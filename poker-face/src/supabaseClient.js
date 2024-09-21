// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://iwpklzabnrpfekgghopg.supabase.co'; // Replace with your Supabase project URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3cGtsemFibnJwZmVrZ2dob3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NTg1OTcsImV4cCI6MjA0MjUzNDU5N30.eflL00-ncY2iyCB0APZM5WLzGFdIhe_u-v9AnwknBiE'; // Replace with your Supabase anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);