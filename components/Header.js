"use client"
import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, Menu, X, User, Heart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import SearchBar from "./SearchBar"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartCount } = useCart()

  const categories = [
    { name: "Abayas", href: "/category/abayas" },
    { name: "Jewelry", href: "/category/jewelry" },
    { name: "Cosmetics", href: "/category/cosmetics" },
    { name: "Perfumes", href: "/category/perfumes" },
    { name: "Shoes", href: "/category/shoes" },
    { name: "Bags", href: "/category/bags" },
  ]

  const cartCount = getCartCount()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-black">Elegance</span>
          </Link>

          <nav className="hidden md:flex space-x-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <SearchBar className="w-full" />
          </div>

          <div className="flex items-center ">
            <button className="p-2 text-gray-700 hover:text-black transition-colors duration-200">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-700 hover:text-black transition-colors duration-200">
              <Heart className="w-5 h-5" />
            </button>
            <Link href="/cart" className="p-2 text-gray-700 hover:text-black relative transition-colors duration-200">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="mb-4">
              <SearchBar className="w-full" />
            </div>
            <nav className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block py-2 text-gray-700 hover:text-black font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
