-- LinguaConnect Database Schema
-- Run this in Supabase SQL Editor

-- ─── Enable pgcrypto ──────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── ENUMS ────────────────────────────────────────────────────────────────────
CREATE TYPE user_role AS ENUM ('student', 'tutor', 'admin');
CREATE TYPE language_code AS ENUM ('english', 'spanish');
CREATE TYPE level_code AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');
CREATE TYPE class_format AS ENUM ('one_on_one', 'group');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');
CREATE TYPE notification_type AS ENUM ('booking_confirmed', 'class_reminder', 'review_request', 'payment_received', 'general');
CREATE TYPE contact_status AS ENUM ('new', 'responded', 'closed');

-- ─── UPDATED_AT TRIGGER ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── 1. PROFILES ──────────────────────────────────────────────────────────────
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'student',
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  preferred_language TEXT NOT NULL DEFAULT 'en',
  phone TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- ─── 2. COURSES ───────────────────────────────────────────────────────────────
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID NOT NULL REFERENCES profiles(id),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  language language_code NOT NULL,
  level level_code NOT NULL,
  format class_format NOT NULL,
  max_students INT NOT NULL DEFAULT 1,
  duration_minutes INT NOT NULL DEFAULT 60,
  price_cents INT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_courses
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE INDEX idx_courses_tutor ON courses(tutor_id);
CREATE INDEX idx_courses_language ON courses(language) WHERE is_active = TRUE;

-- ─── 3. AVAILABILITY SLOTS ────────────────────────────────────────────────────
CREATE TABLE availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID NOT NULL REFERENCES profiles(id),
  course_id UUID REFERENCES courses(id),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  is_recurring BOOLEAN NOT NULL DEFAULT FALSE,
  recurrence_rule TEXT,
  is_booked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT end_after_start CHECK (end_time > start_time)
);

CREATE INDEX idx_slots_available ON availability_slots(tutor_id, start_time) WHERE is_booked = FALSE;

-- ─── 4. BOOKINGS ──────────────────────────────────────────────────────────────
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id),
  course_id UUID NOT NULL REFERENCES courses(id),
  slot_id UUID REFERENCES availability_slots(id),
  status booking_status NOT NULL DEFAULT 'pending',
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  amount_cents INT,
  currency TEXT DEFAULT 'usd',
  meeting_url TEXT,
  notes TEXT,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_bookings
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE INDEX idx_bookings_student ON bookings(student_id, status);
CREATE INDEX idx_bookings_course ON bookings(course_id, created_at DESC);

-- ─── 5. REVIEWS ───────────────────────────────────────────────────────────────
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id),
  student_id UUID NOT NULL REFERENCES profiles(id),
  course_id UUID NOT NULL REFERENCES courses(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_course ON reviews(course_id) WHERE is_visible = TRUE;

-- ─── 6. CONTACT SUBMISSIONS ───────────────────────────────────────────────────
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  language_interest TEXT,
  status contact_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 7. CLASS PACKAGES ────────────────────────────────────────────────────────
CREATE TABLE class_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  total_credits INT NOT NULL,
  price_cents INT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 8. STUDENT CREDITS ───────────────────────────────────────────────────────
CREATE TABLE student_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES profiles(id),
  package_id UUID NOT NULL REFERENCES class_packages(id),
  remaining_credits INT NOT NULL,
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- ─── 9. BLOG POSTS ────────────────────────────────────────────────────────────
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  cover_image_url TEXT,
  author_id UUID REFERENCES profiles(id),
  language TEXT DEFAULT 'en',
  tags TEXT[],
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_blog_posts
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- ─── 10. NOTIFICATIONS ────────────────────────────────────────────────────────
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read, created_at DESC);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, only owner can update
CREATE POLICY "profiles_read_all" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Courses: anyone can read active ones; tutors/admins can write
CREATE POLICY "courses_read_active" ON courses FOR SELECT USING (is_active = TRUE);
CREATE POLICY "courses_write_admin" ON courses FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('tutor', 'admin'))
);

-- Bookings: students see own; tutors see their courses; admins see all
CREATE POLICY "bookings_student" ON bookings FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "bookings_insert_student" ON bookings FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "bookings_update_student" ON bookings FOR UPDATE USING (student_id = auth.uid());
CREATE POLICY "bookings_admin" ON bookings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Reviews: anyone can read visible; students insert for own completed bookings
CREATE POLICY "reviews_read" ON reviews FOR SELECT USING (is_visible = TRUE);
CREATE POLICY "reviews_insert" ON reviews FOR INSERT WITH CHECK (student_id = auth.uid());
CREATE POLICY "reviews_admin" ON reviews FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Notifications: users see only their own
CREATE POLICY "notifications_own" ON notifications FOR ALL USING (user_id = auth.uid());

-- Availability: anyone can read; tutors/admins can manage
CREATE POLICY "slots_read" ON availability_slots FOR SELECT USING (TRUE);
CREATE POLICY "slots_manage" ON availability_slots FOR ALL USING (
  tutor_id = auth.uid() OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ─── AUTO-CREATE PROFILE ON SIGNUP ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'student'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── SEED: Default Class Packages ────────────────────────────────────────────
INSERT INTO class_packages (name, total_credits, price_cents, currency) VALUES
  ('Single Session', 1, 2500, 'usd'),
  ('5-Class Pack', 5, 11000, 'usd'),
  ('10-Class Pack', 10, 20000, 'usd'),
  ('20-Class Pack', 20, 36000, 'usd');
