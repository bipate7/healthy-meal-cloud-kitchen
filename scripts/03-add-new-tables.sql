-- Add new tables for additional features

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  meal_id INTEGER REFERENCES meals(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loyalty points table
CREATE TABLE IF NOT EXISTS loyalty_points (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL DEFAULT 0,
  tier VARCHAR(50) DEFAULT 'bronze',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Loyalty transactions table
CREATE TABLE IF NOT EXISTS loyalty_transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'earn' or 'redeem'
  description TEXT,
  order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  goal VARCHAR(100),
  dietary_preference VARCHAR(100),
  activity_level VARCHAR(50),
  allergies TEXT[],
  recommended_meals INTEGER[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Corporate catering requests table
CREATE TABLE IF NOT EXISTS corporate_requests (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  event_date DATE,
  guest_count INTEGER,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP
);

-- Referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id SERIAL PRIMARY KEY,
  referrer_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  referred_email VARCHAR(255) NOT NULL,
  referred_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed'
  reward_claimed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Limited time offers table
CREATE TABLE IF NOT EXISTS limited_offers (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  discount_percentage NUMERIC(5,2),
  meal_id INTEGER REFERENCES meals(id) ON DELETE CASCADE,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cart_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_meal ON cart_items(meal_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_user ON loyalty_points(user_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_trans_user ON loyalty_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_user ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_corporate_status ON corporate_requests(status);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_user_id);
CREATE INDEX IF NOT EXISTS idx_offers_active ON limited_offers(is_active, end_date);
