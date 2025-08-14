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

-- Create members table
CREATE TABLE IF NOT EXISTS members (
    id TEXT NOT NULL,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'member')),
    joined_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id, project_id)
);

-- Create invites table
CREATE TABLE IF NOT EXISTS invites (
    token TEXT PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    max_uses INT NOT NULL CHECK (max_uses > 0),
    uses INT NOT NULL DEFAULT 0 CHECK (uses >= 0),
    paused BOOLEAN NOT NULL,
    UNIQUE (project_id)
);

-- Create history table
CREATE TABLE IF NOT EXISTS history (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    performed_by TEXT NOT NULL,
    action_type TEXT NOT NULL CHECK (
        action_type IN (
            'joined_project',
            'left_project',
            'removed_from_project',
            'promoted_to_owner',
            'created_invite',
            'paused_invite',
            'unpaused_invite'
        )
    ),
    performed_on TEXT,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);