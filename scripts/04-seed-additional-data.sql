-- Seed data for new features

-- Insert limited time offers
INSERT INTO limited_offers (title, description, discount_percentage, meal_id, start_date, end_date, is_active) VALUES
('Flash Sale: Mediterranean Chicken', 'Get 30% off on our bestselling Mediterranean Chicken Bowl!', 30.00, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '7 days', true),
('Weekend Special: Salmon Bowl', 'Premium Grilled Salmon Bowl at 25% off this weekend only!', 25.00, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '3 days', true);

-- Insert sample loyalty points for existing users
INSERT INTO loyalty_points (user_id, points, tier) VALUES
(1, 250, 'silver'),
(2, 450, 'gold')
ON CONFLICT (user_id) DO NOTHING;
