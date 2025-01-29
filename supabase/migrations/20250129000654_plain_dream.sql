/*
  # Add Update Timestamp Function
  
  1. New Functions
    - `update_updated_at_column()` - Trigger function to automatically update updated_at timestamps
  
  2. Description
    - Creates a reusable function for updating timestamp columns
    - Used by triggers to maintain updated_at columns
*/

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';