-- Create the spin_history table
CREATE TABLE public.spin_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ip_address TEXT NOT NULL,
    device_info TEXT, -- User Agent
    prize TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.spin_history ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone (anon) to insert their spin result
-- We will handle duplicate checks via application logic (and potentially edge functions later)
CREATE POLICY "Enable insert for everyone" 
ON public.spin_history 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Policy: Allow anyone to read (optional, mostly for debugging or showing recent winners)
-- Or restrict this if you don't want public history
CREATE POLICY "Enable select for everyone" 
ON public.spin_history 
FOR SELECT 
TO anon 
USING (true);

-- Optional: Create an index on ip_address for faster lookup when checking duplicates
CREATE INDEX idx_spin_history_ip_address ON public.spin_history(ip_address);
