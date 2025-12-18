"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Instagram, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"

const posts = [
  {
    id: 1,
    image: "/grilled-salmon-bowl.jpg",
    likes: 2847,
    comments: 156,
    caption: "Fresh salmon bowl perfection 🐟",
  },
  {
    id: 2,
    image: "/mediterranean-chicken.jpg",
    likes: 3201,
    comments: 203,
    caption: "Mediterranean vibes 🌿",
  },
  {
    id: 3,
    image: "/teriyaki-beef-stir-fry.jpg",
    likes: 2654,
    comments: 142,
    caption: "Teriyaki dreams come true 🥢",
  },
  {
    id: 4,
    image: "/greek-yogurt-parfait-berries.jpg",
    likes: 4103,
    comments: 287,
    caption: "Morning berry bliss 🍓",
  },
  {
    id: 5,
    image: "/poke-bowl-tuna-fresh.jpg",
    likes: 3456,
    comments: 198,
    caption: "Poke bowl paradise 🌺",
  },
  {
    id: 6,
    image: "/creamy-mushroom-risotto.png",
    likes: 2989,
    comments: 167,
    caption: "Creamy comfort food 🍄",
  },
]

export function InstagramFeed() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-pink-100 text-pink-700 hover:bg-pink-200">
            <Instagram className="h-3 w-3 mr-1" />
            Social
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our <span className="text-pink-600">#HealthyEats</span> Community
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            See what our community is enjoying! Tag us @healthymealkitchen for a chance to be featured.
          </p>
          <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50 bg-transparent">
            <Instagram className="h-4 w-4 mr-2" />
            Follow @healthymealkitchen
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInScale 0.6s ease-out forwards",
                opacity: 0,
              }}
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.caption}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm mb-2">{post.caption}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  )
}
