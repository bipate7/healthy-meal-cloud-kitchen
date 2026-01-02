-- Clean up existing data and reset sequences
TRUNCATE TABLE users, categories, meals, subscription_plans RESTART IDENTITY CASCADE;

-- Insert sample categories
INSERT INTO categories (name, description, image_url) VALUES
  ('Low Carb', 'Delicious low-carb meals for a healthy lifestyle', '/placeholder.svg?height=200&width=300'),
  ('High Protein', 'Protein-packed meals to fuel your workouts', '/placeholder.svg?height=200&width=300'),
  ('Vegan', 'Plant-based meals full of nutrients', '/placeholder.svg?height=200&width=300'),
  ('Keto', 'Keto-friendly meals to support your diet', '/placeholder.svg?height=200&width=300'),
  ('Balanced', 'Well-balanced meals for everyday nutrition', '/placeholder.svg?height=200&width=300');

-- Insert sample meals
INSERT INTO meals (name, description, category_id, price, image_url, calories, protein, carbs, fat, fiber, ingredients, allergens, is_vegetarian, is_vegan, is_gluten_free, preparation_time, serving_size) VALUES
  ('Grilled Chicken Bowl', 'Tender grilled chicken with quinoa, roasted vegetables, and tahini dressing', 2, 12.99, '/placeholder.svg?height=400&width=600', 450, 42, 38, 15, 8, ARRAY['Chicken breast', 'Quinoa', 'Broccoli', 'Bell peppers', 'Tahini', 'Lemon'], ARRAY['Sesame'], FALSE, FALSE, TRUE, 25, '400g'),
  ('Zucchini Noodle Carbonara', 'Low-carb zucchini noodles with creamy carbonara sauce', 1, 10.99, '/placeholder.svg?height=400&width=600', 320, 18, 12, 22, 4, ARRAY['Zucchini', 'Eggs', 'Parmesan', 'Turkey bacon', 'Garlic'], ARRAY['Dairy', 'Eggs'], FALSE, FALSE, TRUE, 20, '350g'),
  ('Buddha Bowl', 'Colorful plant-based bowl with chickpeas, hummus, and fresh veggies', 3, 11.99, '/placeholder.svg?height=400&width=600', 380, 15, 52, 12, 12, ARRAY['Chickpeas', 'Quinoa', 'Sweet potato', 'Kale', 'Hummus', 'Tahini'], ARRAY[]::TEXT[], TRUE, TRUE, TRUE, 30, '450g'),
  ('Salmon with Asparagus', 'Pan-seared salmon with roasted asparagus and cauliflower mash', 1, 15.99, '/placeholder.svg?height=400&width=600', 420, 38, 18, 24, 6, ARRAY['Salmon fillet', 'Asparagus', 'Cauliflower', 'Olive oil', 'Garlic', 'Lemon'], ARRAY['Fish'], FALSE, FALSE, TRUE, 25, '400g'),
  ('Keto Meatballs', 'Juicy grass-fed beef meatballs with zucchini and marinara', 4, 13.99, '/placeholder.svg?height=400&width=600', 390, 32, 14, 25, 5, ARRAY['Grass-fed beef', 'Almond flour', 'Zucchini', 'Tomatoes', 'Basil', 'Garlic'], ARRAY['Tree nuts'], FALSE, FALSE, TRUE, 30, '380g'),
  ('Teriyaki Tofu Stir Fry', 'Crispy tofu with mixed vegetables in homemade teriyaki sauce', 3, 10.99, '/placeholder.svg?height=400&width=600', 350, 20, 42, 10, 7, ARRAY['Tofu', 'Broccoli', 'Carrots', 'Snow peas', 'Teriyaki sauce', 'Sesame'], ARRAY['Soy', 'Sesame'], TRUE, TRUE, FALSE, 20, '400g'),
  ('Mediterranean Chicken', 'Herb-marinated chicken with Greek salad and tzatziki', 5, 12.99, '/placeholder.svg?height=400&width=600', 420, 40, 28, 16, 6, ARRAY['Chicken breast', 'Cucumber', 'Tomatoes', 'Feta', 'Olives', 'Greek yogurt'], ARRAY['Dairy'], FALSE, FALSE, TRUE, 25, '420g'),
  ('Shrimp Avocado Salad', 'Grilled shrimp over mixed greens with avocado and citrus dressing', 2, 14.99, '/placeholder.svg?height=400&width=600', 340, 28, 22, 18, 8, ARRAY['Shrimp', 'Mixed greens', 'Avocado', 'Cherry tomatoes', 'Lime', 'Olive oil'], ARRAY['Shellfish'], FALSE, FALSE, TRUE, 15, '350g');

-- Insert subscription plans
INSERT INTO subscription_plans (name, description, price, meals_per_week, discount_percentage) VALUES
  ('Starter', 'Perfect for trying out our service', 39.99, 3, 5),
  ('Standard', 'Best value for regular meal planning', 69.99, 5, 10),
  ('Premium', 'Complete meal coverage for the week', 99.99, 7, 15);

-- Insert a sample admin user (password: admin123)
-- Note: In production, use bcrypt to hash passwords
INSERT INTO users (email, password_hash, name, is_admin) VALUES
  ('admin@healthymeal.com', '$2a$10$rHqPRJLNBw2E6Dw3m2E2Z.5GYKZxqKJ3xqM5ZQXv8vLHJx9y0YjIa', 'Admin User', TRUE);

-- Insert a sample regular user (password: user123)
INSERT INTO users (email, password_hash, name, phone) VALUES
  ('john.doe@example.com', '$2a$10$rHqPRJLNBw2E6Dw3m2E2Z.5GYKZxqKJ3xqM5ZQXv8vLHJx9y0YjIa', 'John Doe', '555-0123');
