-- Initialize database schema

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

CREATE TABLE IF NOT EXISTS onboardings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_onboardings_user_id ON onboardings(user_id);

CREATE TABLE IF NOT EXISTS race_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    race_type VARCHAR(50) NOT NULL,
    distance VARCHAR(100) NOT NULL,
    discipline VARCHAR(100),
    duration_weeks INTEGER NOT NULL,
    experience_level VARCHAR(50) NOT NULL,
    description TEXT,
    weekly_structure JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_race_plans_race_type ON race_plans(race_type);
CREATE INDEX idx_race_plans_distance ON race_plans(distance);
CREATE INDEX idx_race_plans_experience_level ON race_plans(experience_level);

CREATE TABLE IF NOT EXISTS training_enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    race_plan_id INTEGER NOT NULL REFERENCES race_plans(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    start_date DATE,
    target_race_date DATE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, race_plan_id, enrolled_at)
);

CREATE INDEX idx_training_enrollments_user_id ON training_enrollments(user_id);
CREATE INDEX idx_training_enrollments_race_plan_id ON training_enrollments(race_plan_id);
CREATE INDEX idx_training_enrollments_status ON training_enrollments(status);

-- Insert sample data
INSERT INTO users (email, password_hash, name) VALUES
    ('admin@example.com', '$2a$10$example_hash', 'Admin User'),
    ('user@example.com', '$2a$10$example_hash', 'Regular User')
ON CONFLICT (email) DO NOTHING;

-- Insert race plans
INSERT INTO race_plans (name, race_type, distance, discipline, duration_weeks, experience_level, description, weekly_structure) VALUES
    -- 5K Plans
    ('5K Beginner - 4 Weeks', 'running', '5K', 'running', 4, 'beginner', 'A 4-week plan for beginners looking to complete their first 5K.', '{"weeks": [{"week": 1, "description": "Easy running and walking"}, {"week": 2, "description": "Increase running intervals"}, {"week": 3, "description": "Build endurance"}, {"week": 4, "description": "Taper and race week"}]}'::jsonb),
    ('5K Intermediate - 6 Weeks', 'running', '5K', 'running', 6, 'intermediate', 'A 6-week plan for runners with a base looking to improve their 5K time.', '{"weeks": [{"week": 1, "description": "Base building"}, {"week": 2, "description": "Tempo work"}, {"week": 3, "description": "Speed development"}, {"week": 4, "description": "Peak training"}, {"week": 5, "description": "Speed work"}, {"week": 6, "description": "Taper and race"}]}'::jsonb),
    ('5K Advanced - 8 Weeks', 'running', '5K', 'running', 8, 'advanced', 'An 8-week intensive plan for experienced runners targeting a PR.', '{"weeks": [{"week": 1, "description": "Base phase"}, {"week": 2, "description": "Build phase"}, {"week": 3, "description": "Threshold work"}, {"week": 4, "description": "VO2 max intervals"}, {"week": 5, "description": "Speed work"}, {"week": 6, "description": "Race pace"}, {"week": 7, "description": "Peak week"}, {"week": 8, "description": "Taper and race"}]}'::jsonb),
    
    -- 10K Plans
    ('10K Beginner - 8 Weeks', 'running', '10K', 'running', 8, 'beginner', 'An 8-week plan for beginners preparing for their first 10K.', '{"weeks": [{"week": 1, "description": "Easy running base"}, {"week": 2, "description": "Build volume"}, {"week": 3, "description": "Increase distance"}, {"week": 4, "description": "Recovery week"}, {"week": 5, "description": "Long runs"}, {"week": 6, "description": "Endurance building"}, {"week": 7, "description": "Peak week"}, {"week": 8, "description": "Taper and race"}]}'::jsonb),
    ('10K Intermediate - 8 Weeks', 'running', '10K', 'running', 8, 'intermediate', 'An 8-week plan for improving 10K performance.', '{"weeks": [{"week": 1, "description": "Base building"}, {"week": 2, "description": "Tempo runs"}, {"week": 3, "description": "Threshold work"}, {"week": 4, "description": "Recovery week"}, {"week": 5, "description": "Speed intervals"}, {"week": 6, "description": "Long tempo"}, {"week": 7, "description": "Peak training"}, {"week": 8, "description": "Taper and race"}]}'::jsonb),
    ('10K Advanced - 10 Weeks', 'running', '10K', 'running', 10, 'advanced', 'A 10-week intensive training plan for competitive 10K racing.', '{"weeks": [{"week": 1, "description": "Base phase"}, {"week": 2, "description": "Build volume"}, {"week": 3, "description": "Lactate threshold"}, {"week": 4, "description": "VO2 max work"}, {"week": 5, "description": "Recovery week"}, {"week": 6, "description": "Speed endurance"}, {"week": 7, "description": "Race pace"}, {"week": 8, "description": "Peak week"}, {"week": 9, "description": "Sharpening"}, {"week": 10, "description": "Taper and race"}]}'::jsonb),
    
    -- Half Marathon Plans
    ('Half Marathon Beginner - 12 Weeks', 'running', 'Half Marathon', 'running', 12, 'beginner', 'A 12-week plan for first-time half marathoners.', '{"weeks": [{"week": 1, "description": "Base building"}, {"week": 2, "description": "Easy miles"}, {"week": 3, "description": "Long run introduction"}, {"week": 4, "description": "Recovery week"}, {"week": 5, "description": "Build endurance"}, {"week": 6, "description": "Increase distance"}, {"week": 7, "description": "Mid-distance work"}, {"week": 8, "description": "Recovery week"}, {"week": 9, "description": "Peak long run"}, {"week": 10, "description": "Maintain volume"}, {"week": 11, "description": "Taper begins"}, {"week": 12, "description": "Race week"}]}'::jsonb),
    ('Half Marathon Intermediate - 10 Weeks', 'running', 'Half Marathon', 'running', 10, 'intermediate', 'A 10-week plan for improving half marathon time.', '{"weeks": [{"week": 1, "description": "Base phase"}, {"week": 2, "description": "Tempo runs"}, {"week": 3, "description": "Build volume"}, {"week": 4, "description": "Threshold work"}, {"week": 5, "description": "Recovery week"}, {"week": 6, "description": "Long tempo runs"}, {"week": 7, "description": "Race pace work"}, {"week": 8, "description": "Peak training"}, {"week": 9, "description": "Taper"}, {"week": 10, "description": "Race week"}]}'::jsonb),
    ('Half Marathon Advanced - 12 Weeks', 'running', 'Half Marathon', 'running', 12, 'advanced', 'A 12-week competitive half marathon training plan.', '{"weeks": [{"week": 1, "description": "Base building"}, {"week": 2, "description": "Volume increase"}, {"week": 3, "description": "Tempo work"}, {"week": 4, "description": "Lactate threshold"}, {"week": 5, "description": "Recovery week"}, {"week": 6, "description": "VO2 max intervals"}, {"week": 7, "description": "Long tempo"}, {"week": 8, "description": "Peak volume"}, {"week": 9, "description": "Race pace runs"}, {"week": 10, "description": "Speed work"}, {"week": 11, "description": "Taper"}, {"week": 12, "description": "Race week"}]}'::jsonb),
    
    -- Marathon Plans
    ('Marathon Beginner - 16 Weeks', 'running', 'Marathon', 'running', 16, 'beginner', 'A 16-week plan for first-time marathoners.', '{"weeks": [{"week": 1, "description": "Base building"}, {"week": 2, "description": "Easy running"}, {"week": 3, "description": "Long run start"}, {"week": 4, "description": "Recovery week"}, {"week": 5, "description": "Build distance"}, {"week": 6, "description": "Increase volume"}, {"week": 7, "description": "Mid-distance focus"}, {"week": 8, "description": "Recovery week"}, {"week": 9, "description": "Long run progression"}, {"week": 10, "description": "Build endurance"}, {"week": 11, "description": "Peak long runs"}, {"week": 12, "description": "Recovery week"}, {"week": 13, "description": "Final build"}, {"week": 14, "description": "Last long run"}, {"week": 15, "description": "Taper"}, {"week": 16, "description": "Race week"}]}'::jsonb),
    ('Marathon Intermediate - 16 Weeks', 'running', 'Marathon', 'running', 16, 'intermediate', 'A 16-week plan for improving marathon performance.', '{"weeks": [{"week": 1, "description": "Base phase"}, {"week": 2, "description": "Volume building"}, {"week": 3, "description": "Tempo introduction"}, {"week": 4, "description": "Recovery week"}, {"week": 5, "description": "Long runs"}, {"week": 6, "description": "Threshold work"}, {"week": 7, "description": "Build phase"}, {"week": 8, "description": "Recovery week"}, {"week": 9, "description": "Marathon pace"}, {"week": 10, "description": "Peak long runs"}, {"week": 11, "description": "Race pace work"}, {"week": 12, "description": "Recovery week"}, {"week": 13, "description": "Final build"}, {"week": 14, "description": "Last long run"}, {"week": 15, "description": "Taper"}, {"week": 16, "description": "Race week"}]}'::jsonb),
    ('Marathon Advanced - 20 Weeks', 'running', 'Marathon', 'running', 20, 'advanced', 'A 20-week intensive marathon training plan.', '{"weeks": [{"week": 1, "description": "Base building"}, {"week": 2, "description": "Volume phase"}, {"week": 3, "description": "Easy miles"}, {"week": 4, "description": "Recovery week"}, {"week": 5, "description": "Build phase"}, {"week": 6, "description": "Tempo work"}, {"week": 7, "description": "Long runs"}, {"week": 8, "description": "Recovery week"}, {"week": 9, "description": "Threshold runs"}, {"week": 10, "description": "VO2 max work"}, {"week": 11, "description": "Peak volume"}, {"week": 12, "description": "Recovery week"}, {"week": 13, "description": "Marathon pace"}, {"week": 14, "description": "Long tempo"}, {"week": 15, "description": "Peak training"}, {"week": 16, "description": "Recovery week"}, {"week": 17, "description": "Race simulation"}, {"week": 18, "description": "Final long run"}, {"week": 19, "description": "Taper"}, {"week": 20, "description": "Race week"}]}'::jsonb),
    
    -- Sprint Triathlon Plans
    ('Sprint Triathlon Beginner - 8 Weeks', 'triathlon', 'Sprint', 'triathlon', 8, 'beginner', 'An 8-week plan for first-time sprint triathletes. Includes swim, bike, and run training.', '{"weeks": [{"week": 1, "description": "Base building all three sports"}, {"week": 2, "description": "Build endurance"}, {"week": 3, "description": "Increase volume"}, {"week": 4, "description": "Recovery week"}, {"week": 5, "description": "Brick workouts"}, {"week": 6, "description": "Race pace practice"}, {"week": 7, "description": "Peak week"}, {"week": 8, "description": "Taper and race"}]}'::jsonb),
    ('Sprint Triathlon Intermediate - 6 Weeks', 'triathlon', 'Sprint', 'triathlon', 6, 'intermediate', 'A 6-week plan for improving sprint triathlon performance.', '{"weeks": [{"week": 1, "description": "Base phase"}, {"week": 2, "description": "Tempo work"}, {"week": 3, "description": "Speed development"}, {"week": 4, "description": "Brick sessions"}, {"week": 5, "description": "Race pace"}, {"week": 6, "description": "Taper and race"}]}'::jsonb),
    
    -- Olympic Triathlon Plans
    ('Olympic Triathlon Beginner - 12 Weeks', 'triathlon', 'Olympic', 'triathlon', 12, 'beginner', 'A 12-week plan for first-time Olympic distance triathletes.', '{"weeks": [{"week": 1, "description": "Base building"}, {"week": 2, "description": "Volume increase"}, {"week": 3, "description": "Endurance focus"}, {"week": 4, "description": "Recovery week"}, {"week": 5, "description": "Build phase"}, {"week": 6, "description": "Long workouts"}, {"week": 7, "description": "Brick training"}, {"week": 8, "description": "Recovery week"}, {"week": 9, "description": "Peak training"}, {"week": 10, "description": "Race simulation"}, {"week": 11, "description": "Taper"}, {"week": 12, "description": "Race week"}]}'::jsonb),
    ('Olympic Triathlon Intermediate - 10 Weeks', 'triathlon', 'Olympic', 'triathlon', 10, 'intermediate', 'A 10-week plan for improving Olympic triathlon times.', '{"weeks": [{"week": 1, "description": "Base phase"}, {"week": 2, "description": "Build volume"}, {"week": 3, "description": "Tempo sessions"}, {"week": 4, "description": "Recovery week"}, {"week": 5, "description": "Threshold work"}, {"week": 6, "description": "Long bricks"}, {"week": 7, "description": "Race pace"}, {"week": 8, "description": "Peak week"}, {"week": 9, "description": "Taper"}, {"week": 10, "description": "Race week"}]}'::jsonb),
    
    -- Half Ironman Plans
    ('Half Ironman Intermediate - 16 Weeks', 'triathlon', 'Half Ironman', 'triathlon', 16, 'intermediate', 'A 16-week plan for Half Ironman/70.3 distance.', '{"weeks": [{"week": 1, "description": "Base building"}, {"week": 2, "description": "Volume phase"}, {"week": 3, "description": "Endurance building"}, {"week": 4, "description": "Recovery week"}, {"week": 5, "description": "Long sessions"}, {"week": 6, "description": "Build phase"}, {"week": 7, "description": "Tempo work"}, {"week": 8, "description": "Recovery week"}, {"week": 9, "description": "Long bricks"}, {"week": 10, "description": "Peak volume"}, {"week": 11, "description": "Race pace"}, {"week": 12, "description": "Recovery week"}, {"week": 13, "description": "Final build"}, {"week": 14, "description": "Race simulation"}, {"week": 15, "description": "Taper"}, {"week": 16, "description": "Race week"}]}'::jsonb),
    ('Half Ironman Advanced - 20 Weeks', 'triathlon', 'Half Ironman', 'triathlon', 20, 'advanced', 'A 20-week advanced plan for competitive Half Ironman racing.', '{"weeks": [{"week": 1, "description": "Base phase"}, {"week": 2, "description": "Volume building"}, {"week": 3, "description": "Endurance focus"}, {"week": 4, "description": "Recovery week"}, {"week": 5, "description": "Build volume"}, {"week": 6, "description": "Long sessions"}, {"week": 7, "description": "Tempo work"}, {"week": 8, "description": "Recovery week"}, {"week": 9, "description": "Threshold training"}, {"week": 10, "description": "Peak volume"}, {"week": 11, "description": "Long bricks"}, {"week": 12, "description": "Recovery week"}, {"week": 13, "description": "Race pace"}, {"week": 14, "description": "Speed work"}, {"week": 15, "description": "Final build"}, {"week": 16, "description": "Recovery week"}, {"week": 17, "description": "Race simulation"}, {"week": 18, "description": "Sharpening"}, {"week": 19, "description": "Taper"}, {"week": 20, "description": "Race week"}]}'::jsonb),
    
    -- Full Ironman Plans
    ('Full Ironman Advanced - 24 Weeks', 'triathlon', 'Ironman', 'triathlon', 24, 'advanced', 'A 24-week comprehensive plan for full Ironman distance.', '{"weeks": [{"week": 1, "description": "Base building"}, {"week": 2, "description": "Volume phase"}, {"week": 3, "description": "Endurance foundation"}, {"week": 4, "description": "Recovery week"}, {"week": 5, "description": "Build phase"}, {"week": 6, "description": "Long workouts"}, {"week": 7, "description": "Volume increase"}, {"week": 8, "description": "Recovery week"}, {"week": 9, "description": "Endurance focus"}, {"week": 10, "description": "Long sessions"}, {"week": 11, "description": "Build volume"}, {"week": 12, "description": "Recovery week"}, {"week": 13, "description": "Peak phase begins"}, {"week": 14, "description": "Long bricks"}, {"week": 15, "description": "Peak volume"}, {"week": 16, "description": "Recovery week"}, {"week": 17, "description": "Race pace work"}, {"week": 18, "description": "Long training"}, {"week": 19, "description": "Final build"}, {"week": 20, "description": "Recovery week"}, {"week": 21, "description": "Race simulation"}, {"week": 22, "description": "Final long session"}, {"week": 23, "description": "Taper"}, {"week": 24, "description": "Race week"}]}'::jsonb)
ON CONFLICT DO NOTHING;
