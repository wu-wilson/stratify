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

-- Create statuses table
CREATE TABLE IF NOT EXISTS statuses (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    position INT NOT NULL,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Unique constraint to prevent duplicate status names per project
    CONSTRAINT uq_project_status_name UNIQUE (project_id, name)
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    status_id BIGINT NOT NULL REFERENCES statuses(id) ON DELETE CASCADE,
    created_by TEXT,
    assigned_to TEXT,
    title TEXT NOT NULL,
    description TEXT,
    position INT NOT NULL,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    created_by TEXT,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Unique constraint to prevent duplicate tags per project
    CONSTRAINT uq_project_tag_name UNIQUE (project_id, name)
);

-- Create taggings table
CREATE TABLE IF NOT EXISTS taggings (
    task_id BIGINT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, tag_id)
);

CREATE OR REPLACE FUNCTION nullify_member_tasks()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tasks
  SET created_by = NULL
  WHERE created_by = OLD.id AND project_id = OLD.project_id;

  UPDATE tasks
  SET assigned_to = NULL
  WHERE assigned_to = OLD.id AND project_id = OLD.project_id;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_nullify_member_tasks
AFTER DELETE ON members
FOR EACH ROW
EXECUTE FUNCTION nullify_member_tasks();

-- DROP TABLE taggings;
-- DROP TABLE tags;
-- DROP TABLE tasks;
-- DROP TABLE statuses;
-- DROP TABLE invites;
-- DROP TABLE history;
-- DROP TABLE members;
-- DROP TABLE projects;
-- DROP TRIGGER IF EXISTS trigger_nullify_member_tasks ON members;
-- DROP FUNCTION IF EXISTS nullify_member_tasks();