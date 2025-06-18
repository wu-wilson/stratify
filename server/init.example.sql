-- Create the database (run this separately if not already connected)
-- CREATE DATABASE stratify;

-- Switch to the database (psql: \c stratify)

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY CHECK (id > 0), 
    owner_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Unique constraint to prevent duplicate project names per owner
    CONSTRAINT uq_projects_owner_name UNIQUE (owner_id, name)
);