import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">HM</span>
              </div>
              <span className="text-xl font-semibold">HealthyMeal</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Fresh, healthy meals delivered to your door. Making wellness simple and delicious.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Menu</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/menu" className="hover:text-primary transition-colors">
                  Browse All Meals
                </Link>
              </li>
              <li>
                <Link href="/menu?category=breakfast" className="hover:text-primary transition-colors">
                  Breakfast
                </Link>
              </li>
              <li>
                <Link href="/menu?category=lunch" className="hover:text-primary transition-colors">
                  Lunch
                </Link>
              </li>
              <li>
                <Link href="/menu?category=dinner" className="hover:text-primary transition-colors">
                  Dinner
                </Link>
              </li>
              <li>
                <Link href="/menu?category=snacks" className="hover:text-primary transition-colors">
                  Snacks
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4 text-sm">Get weekly meal inspiration and exclusive offers.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="h-9" />
              <Button size="sm" className="shrink-0">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 HealthyMeal. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
