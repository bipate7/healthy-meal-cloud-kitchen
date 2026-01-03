"use client";

import { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Star,
  Flame,
  Clock,
  Search,
  Filter,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";

const allMeals = [
  {
    id: 1,
    name: "Grilled Tandoori Salmon",
    description:
      "Fresh salmon marinated in yogurt, spices with quinoa and roasted vegetables",
    image: "/grilled-salmon-bowl.jpg",
    calories: 520,
    protein: 42,
    prepTime: 5,
    rating: 4.8,
    reviews: 156,
    price: 399,
    tags: ["High Protein", "Omega-3"],
    category: "Lunch",
    cuisine: "Fusion",
  },
  {
    id: 2,
    name: "Healthy Chicken Tikka Bowl",
    description:
      "Tandoori chicken tikka with brown rice, chickpeas and mint chutney",
    image: "/mediterranean-chicken.jpg",
    calories: 480,
    protein: 38,
    prepTime: 5,
    rating: 4.9,
    reviews: 203,
    price: 299,
    tags: ["Low Carb", "High Protein"],
    category: "Dinner",
    cuisine: "North Indian",
  },
  {
    id: 3,
    name: "Paneer Tikka Masala Bowl",
    description:
      "Grilled paneer in rich tomato gravy with brown rice and salad",
    image: "/thai-tofu-curry.jpg",
    calories: 440,
    protein: 22,
    prepTime: 5,
    rating: 4.7,
    reviews: 128,
    price: 249,
    tags: ["Vegetarian", "High Protein"],
    category: "Lunch",
    cuisine: "North Indian",
  },
  {
    id: 4,
    name: "Protein Poha Bowl",
    description:
      "Healthy poha with sprouts, peanuts, vegetables and boiled eggs",
    image: "/breakfast-power-bowl.jpg",
    calories: 380,
    protein: 28,
    prepTime: 3,
    rating: 4.9,
    reviews: 241,
    price: 149,
    tags: ["High Protein", "Breakfast"],
    category: "Breakfast",
    cuisine: "Maharashtrian",
  },
  {
    id: 5,
    name: "Chicken Chettinad with Millet",
    description:
      "Spicy South Indian chicken curry with healthy finger millet roti",
    image: "/teriyaki-beef-stir-fry.jpg",
    calories: 510,
    protein: 36,
    prepTime: 6,
    rating: 4.8,
    reviews: 189,
    price: 329,
    tags: ["High Protein", "Spicy"],
    category: "Dinner",
    cuisine: "South Indian",
  },
  {
    id: 6,
    name: "Greek Yogurt Parfait with Desi Touch",
    description: "Hung curd with granola, fresh fruits, honey and almonds",
    image: "/greek-yogurt-parfait-berries.jpg",
    calories: 320,
    protein: 18,
    prepTime: 2,
    rating: 4.6,
    reviews: 145,
    price: 179,
    tags: ["Vegetarian", "Breakfast"],
    category: "Breakfast",
    cuisine: "Fusion",
  },
  {
    id: 7,
    name: "Tandoori Fish Tikka Bowl",
    description: "Marinated fish tikka with mint chutney, salad and brown rice",
    image: "/shrimp-tacos-chipotle.jpg",
    calories: 460,
    protein: 32,
    prepTime: 5,
    rating: 4.9,
    reviews: 267,
    price: 349,
    tags: ["High Protein", "Low Carb"],
    category: "Lunch",
    cuisine: "Punjabi",
  },
  {
    id: 8,
    name: "Dal Khichdi with Ghee",
    description: "Nutritious moong dal khichdi with desi ghee and vegetables",
    image: "/creamy-mushroom-risotto.png",
    calories: 490,
    protein: 16,
    prepTime: 7,
    rating: 4.7,
    reviews: 134,
    price: 199,
    tags: ["Vegetarian", "Comfort Food"],
    category: "Dinner",
    cuisine: "North Indian",
  },
  {
    id: 9,
    name: "Healthy Idli Sambar Bowl",
    description:
      "Steamed idli with protein-rich sambar, coconut chutney and vegetables",
    image: "/poke-bowl-tuna-fresh.jpg",
    calories: 380,
    protein: 24,
    prepTime: 4,
    rating: 4.8,
    reviews: 198,
    price: 169,
    tags: ["Vegetarian", "Probiotic"],
    category: "Breakfast",
    cuisine: "South Indian",
  },
  {
    id: 10,
    name: "Mutton Rogan Josh with Quinoa",
    description: "Slow-cooked Kashmiri mutton curry with healthy quinoa",
    image: "/bbq-pulled-pork-sandwich.jpg",
    calories: 580,
    protein: 40,
    prepTime: 6,
    rating: 4.9,
    reviews: 312,
    price: 429,
    tags: ["High Protein", "Comfort Food"],
    category: "Dinner",
    cuisine: "Kashmiri",
  },
  {
    id: 11,
    name: "Sprouted Moong Salad Bowl",
    description:
      "Protein-rich sprouted moong with vegetables, lemon and spices",
    image: "/acai-bowl-granola-berries.jpg",
    calories: 290,
    protein: 18,
    prepTime: 3,
    rating: 4.7,
    reviews: 167,
    price: 149,
    tags: ["Vegan", "High Protein"],
    category: "Breakfast",
    cuisine: "Healthy Indian",
  },
  {
    id: 12,
    name: "Grilled Chicken Seekh Bowl",
    description:
      "Grilled chicken seekh kebab with millet roti and cucumber raita",
    image: "/lemon-herb-chicken-grilled.jpg",
    calories: 450,
    protein: 42,
    prepTime: 5,
    rating: 4.8,
    reviews: 221,
    price: 319,
    tags: ["High Protein", "Low Carb"],
    category: "Dinner",
    cuisine: "Punjabi",
  },
  {
    id: 13,
    name: "Bengali Fish Curry Bowl",
    description:
      "Traditional Bengali fish curry with mustard, served with brown rice",
    image: "/teriyaki-beef-stir-fry.jpg",
    calories: 480,
    protein: 35,
    prepTime: 6,
    rating: 4.8,
    reviews: 178,
    price: 339,
    tags: ["High Protein", "Traditional"],
    category: "Lunch",
    cuisine: "Bengali",
  },
  {
    id: 14,
    name: "Dhokla Breakfast Plate",
    description: "Steamed besan dhokla with green chutney and sprouts salad",
    image: "/greek-yogurt-parfait-berries.jpg",
    calories: 320,
    protein: 14,
    prepTime: 4,
    rating: 4.6,
    reviews: 192,
    price: 129,
    tags: ["Vegetarian", "Low Fat"],
    category: "Breakfast",
    cuisine: "Gujarati",
  },
  {
    id: 15,
    name: "Palak Paneer Power Bowl",
    description: "Protein-rich spinach and cottage cheese with multigrain roti",
    image: "/thai-tofu-curry.jpg",
    calories: 420,
    protein: 26,
    prepTime: 5,
    rating: 4.9,
    reviews: 245,
    price: 269,
    tags: ["Vegetarian", "High Protein"],
    category: "Lunch",
    cuisine: "North Indian",
  },
  {
    id: 16,
    name: "Masala Dosa Plate",
    description: "Crispy dosa with sambar and coconut chutney",
    image: "/poke-bowl-tuna-fresh.jpg",
    calories: 390,
    protein: 14,
    prepTime: 5,
    rating: 4.7,
    reviews: 210,
    price: 179,
    tags: ["Vegetarian", "Probiotic"],
    category: "Breakfast",
    cuisine: "South Indian",
  },
  {
    id: 17,
    name: "Veg Biryani Bowl",
    description: "Aromatic basmati rice with mixed veggies and spices",
    image: "/creamy-mushroom-risotto.png",
    calories: 520,
    protein: 16,
    prepTime: 6,
    rating: 4.6,
    reviews: 158,
    price: 219,
    tags: ["Vegetarian", "Comfort Food"],
    category: "Lunch",
    cuisine: "North Indian",
  },
  {
    id: 18,
    name: "Chicken Biryani",
    description: "Hyderabadi style biryani with tender chicken pieces",
    image: "/teriyaki-beef-stir-fry.jpg",
    calories: 610,
    protein: 34,
    prepTime: 7,
    rating: 4.8,
    reviews: 312,
    price: 349,
    tags: ["High Protein", "Spicy"],
    category: "Dinner",
    cuisine: "Hyderabadi",
  },
  {
    id: 19,
    name: "Goan Fish Curry",
    description: "Tangy coconut-based curry with steamed rice",
    image: "/shrimp-tacos-chipotle.jpg",
    calories: 480,
    protein: 30,
    prepTime: 6,
    rating: 4.7,
    reviews: 167,
    price: 339,
    tags: ["High Protein", "Low Carb"],
    category: "Dinner",
    cuisine: "Goan",
  },
  {
    id: 20,
    name: "Rajasthani Dal Baati",
    description: "Traditional dal baati churma with ghee",
    image: "/thai-tofu-curry.jpg",
    calories: 540,
    protein: 20,
    prepTime: 6,
    rating: 4.6,
    reviews: 142,
    price: 299,
    tags: ["Vegetarian", "Traditional"],
    category: "Lunch",
    cuisine: "Rajasthani",
  },
  {
    id: 21,
    name: "Idli Vada Sambar",
    description: "Soft idlis and crispy vadas with hot sambar",
    image: "/breakfast-power-bowl.jpg",
    calories: 360,
    protein: 16,
    prepTime: 5,
    rating: 4.8,
    reviews: 233,
    price: 169,
    tags: ["Vegetarian", "Probiotic"],
    category: "Breakfast",
    cuisine: "South Indian",
  },
  {
    id: 22,
    name: "Chole Bhature Lite",
    description: "Flavorful chickpeas with lighter bhature",
    image: "/lemon-herb-chicken-grilled.jpg",
    calories: 520,
    protein: 18,
    prepTime: 6,
    rating: 4.7,
    reviews: 198,
    price: 219,
    tags: ["Vegetarian", "Comfort Food"],
    category: "Lunch",
    cuisine: "Punjabi",
  },
  {
    id: 23,
    name: "Paneer Butter Masala",
    description: "Creamy paneer curry with buttery goodness",
    image: "/mediterranean-chicken.jpg",
    calories: 510,
    protein: 22,
    prepTime: 6,
    rating: 4.8,
    reviews: 287,
    price: 289,
    tags: ["Vegetarian", "High Protein"],
    category: "Dinner",
    cuisine: "North Indian",
  },
];

const categories = ["All", "Breakfast", "Lunch", "Dinner"];
const dietaryTags = [
  "All",
  "High Protein",
  "Vegetarian",
  "Vegan",
  "Low Carb",
  "Spicy",
  "Low Fat",
];
const cuisineTypes = [
  "All",
  "North Indian",
  "South Indian",
  "Punjabi",
  "Gujarati",
  "Bengali",
  "Kashmiri",
  "Maharashtrian",
  "Hyderabadi",
  "Goan",
  "Andhra",
  "Telugu",
  "Fusion",
  "Healthy Indian",
  "Street Food",
  "Mediterranean",
  "Italian",
  "Chinese",
  "Continental",
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [showAllCuisines, setShowAllCuisines] = useState(false);
  const cuisineScrollRef = useRef<HTMLDivElement | null>(null);

  const filteredMeals = useMemo(() => {
    return allMeals.filter((meal) => {
      const matchesCategory =
        selectedCategory === "All" || meal.category === selectedCategory;
      const matchesTag =
        selectedTag === "All" || meal.tags.includes(selectedTag);
      const matchesCuisine =
        selectedCuisine === "All" || meal.cuisine === selectedCuisine;
      const matchesSearch =
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesTag && matchesCuisine && matchesSearch;
    });
  }, [selectedCategory, selectedTag, selectedCuisine, searchQuery]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id]);
    console.log("[v0] Added to cart:", id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 bg-gradient-to-br from-primary/10 via-background to-orange-500/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent animate-gradient">
              Explore Our Full Menu
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Discover delicious, nutritious Indian meals crafted by our expert
              chefs
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search meals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-12 text-base border-2 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90"
                    : "hover:bg-primary/10"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Cuisine Filter (Scrollable with Controls) */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Cuisine:</span>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    cuisineScrollRef.current?.scrollBy({
                      left: -240,
                      behavior: "smooth",
                    })
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    cuisineScrollRef.current?.scrollBy({
                      left: 240,
                      behavior: "smooth",
                    })
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAllCuisines((v) => !v)}
                  className="ml-2"
                >
                  {showAllCuisines ? "Less" : "More"}
                </Button>
              </div>
            </div>
            <div
              ref={cuisineScrollRef}
              className="overflow-x-auto whitespace-nowrap px-2 py-1"
            >
              {(showAllCuisines ? cuisineTypes : cuisineTypes.slice(0, 10)).map(
                (cuisine) => (
                  <Badge
                    key={cuisine}
                    variant={
                      selectedCuisine === cuisine ? "default" : "outline"
                    }
                    onClick={() => setSelectedCuisine(cuisine)}
                    className={`inline-block mr-2 mb-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedCuisine === cuisine
                        ? "bg-orange-600 hover:bg-orange-700"
                        : "hover:bg-orange-600/10"
                    }`}
                  >
                    {cuisine}
                  </Badge>
                )
              )}
            </div>
          </div>

          {/* Dietary Tags */}
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
            {dietaryTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                onClick={() => setSelectedTag(tag)}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedTag === tag
                    ? "bg-primary hover:bg-primary/90"
                    : "hover:bg-primary/10"
                }`}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Showing {filteredMeals.length} of {allMeals.length} meals
          </div>
        </div>
      </section>

      {/* Meals Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredMeals.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">
                No meals found matching your criteria
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTag("All");
                  setSelectedCuisine("All");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMeals.map((meal, index) => (
                <Card
                  key={meal.id}
                  className="overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: "fadeInScale 0.5s ease-out forwards",
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={meal.image || "/placeholder.svg"}
                      alt={meal.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-foreground shadow-lg">
                      {meal.category}
                    </Badge>
                    <Badge className="absolute top-3 right-12 bg-orange-600/95 backdrop-blur-sm text-white shadow-lg">
                      {meal.cuisine}
                    </Badge>
                    <Button
                      size="icon"
                      variant="secondary"
                      className={`absolute top-3 right-3 rounded-full transition-all duration-300 ${
                        favorites.includes(meal.id)
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-white/95 hover:bg-white"
                      }`}
                      onClick={() => toggleFavorite(meal.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(meal.id) ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {meal.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {meal.description}
                    </p>

                    <div className="flex gap-2 mb-3 flex-wrap">
                      {meal.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span>{meal.calories} cal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{meal.prepTime} min</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{meal.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({meal.reviews})
                        </span>
                      </div>
                      <span className="text-xl font-bold text-primary">
                        ₹{meal.price}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 transition-all duration-300 group-hover:shadow-lg"
                      onClick={() => addToCart(meal.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <Button
          asChild
          size="lg"
          className="fixed bottom-6 right-6 rounded-full shadow-2xl bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 animate-bounce z-40"
        >
          <Link href="/cart">
            <ShoppingCart className="h-5 w-5 mr-2" />
            View Cart ({cart.length})
          </Link>
        </Button>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
