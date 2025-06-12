"use client"
import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// All products data for search
const allProducts = {
  abayas: [
    {
      id: 1,
      name: "Classic Black Abaya",
      price: 129.99,
      image: "/placeholder.svg?height=400&width=300&text=Black+Abaya",
      category: "abayas",
      keywords: ["black", "classic", "traditional", "elegant", "formal"],
    },
    {
      id: 2,
      name: "Embroidered Abaya",
      price: 189.99,
      image: "/placeholder.svg?height=400&width=300&text=Embroidered+Abaya",
      category: "abayas",
      keywords: ["embroidered", "silk", "luxury", "special", "occasion"],
    },
    {
      id: 3,
      name: "Modern Cut Abaya",
      price: 149.99,
      image: "/placeholder.svg?height=400&width=300&text=Modern+Abaya",
      category: "abayas",
      keywords: ["modern", "contemporary", "stylish", "cotton"],
    },
    {
      id: 4,
      name: "Luxury Abaya",
      price: 299.99,
      image: "/placeholder.svg?height=400&width=300&text=Luxury+Abaya",
      category: "abayas",
      keywords: ["luxury", "premium", "silk", "expensive"],
    },
    {
      id: 5,
      name: "Casual Abaya",
      price: 79.99,
      image: "/placeholder.svg?height=400&width=300&text=Casual+Abaya",
      category: "abayas",
      keywords: ["casual", "everyday", "comfortable", "cotton"],
    },
  ],
  bags: [
    {
      id: 1,
      name: "Luxury Handbag",
      price: 199.99,
      image: "/placeholder.svg?height=400&width=300&text=Luxury+Handbag",
      category: "bags",
      keywords: ["luxury", "handbag", "leather", "designer", "formal"],
    },
    {
      id: 2,
      name: "Evening Clutch",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=300&text=Evening+Clutch",
      category: "bags",
      keywords: ["evening", "clutch", "party", "formal", "satin"],
    },
  ],
  jewelry: [
    {
      id: 1,
      name: "Gold Pearl Necklace",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=300&text=Pearl+Necklace",
      category: "jewelry",
      keywords: ["gold", "pearl", "necklace", "elegant", "formal"],
    },
    {
      id: 2,
      name: "Diamond Earrings",
      price: 159.99,
      image: "/placeholder.svg?height=400&width=300&text=Diamond+Earrings",
      category: "jewelry",
      keywords: ["diamond", "earrings", "silver", "sparkle", "formal"],
    },
    {
      id: 3,
      name: "Ruby Ring",
      price: 249.99,
      image: "/placeholder.svg?height=400&width=300&text=Ruby+Ring",
      category: "jewelry",
      keywords: ["ruby", "ring", "gold", "precious", "stone"],
    },
  ],
  cosmetics: [
    {
      id: 1,
      name: "Luxury Lipstick Set",
      price: 45.99,
      image: "/placeholder.svg?height=400&width=300&text=Lipstick+Set",
      category: "cosmetics",
      keywords: ["lipstick", "makeup", "beauty", "set", "colors"],
    },
    {
      id: 2,
      name: "Foundation Kit",
      price: 65.99,
      image: "/placeholder.svg?height=400&width=300&text=Foundation+Kit",
      category: "cosmetics",
      keywords: ["foundation", "makeup", "beauty", "coverage", "skin"],
    },
  ],
  perfumes: [
    {
      id: 1,
      name: "Rose Garden Perfume",
      price: 75.99,
      image: "/placeholder.svg?height=400&width=300&text=Rose+Perfume",
      category: "perfumes",
      keywords: ["rose", "floral", "fragrance", "perfume", "romantic"],
    },
    {
      id: 2,
      name: "Ocean Breeze",
      price: 125.99,
      image: "/placeholder.svg?height=400&width=300&text=Ocean+Breeze",
      category: "perfumes",
      keywords: ["ocean", "fresh", "citrus", "aquatic", "summer"],
    },
  ],
  shoes: [
    {
      id: 1,
      name: "Elegant Heels",
      price: 99.99,
      image: "/placeholder.svg?height=400&width=300&text=Elegant+Heels",
      category: "shoes",
      keywords: ["heels", "elegant", "formal", "leather", "party"],
    },
    {
      id: 2,
      name: "Comfort Flats",
      price: 59.99,
      image: "/placeholder.svg?height=400&width=300&text=Comfort+Flats",
      category: "shoes",
      keywords: ["flats", "comfortable", "casual", "everyday", "walking"],
    },
  ],
}

export default function SearchBar({ className = "" }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef(null)

  // Flatten all products for search
  const flatProducts = Object.values(allProducts).flat()

  // Search function
  const searchProducts = (searchQuery) => {
    if (!searchQuery.trim()) {
      return []
    }

    const query = searchQuery.toLowerCase().trim()

    return flatProducts.filter((product) => {
      // Search in product name
      const nameMatch = product.name.toLowerCase().includes(query)

      // Search in category
      const categoryMatch = product.category.toLowerCase().includes(query)

      // Search in keywords
      const keywordMatch = product.keywords.some((keyword) => keyword.toLowerCase().includes(query))

      // Search in price (for queries like "under 100", "cheap", "expensive")
      const priceMatch = (() => {
        if (query.includes("under") || query.includes("below")) {
          const priceNum = query.match(/\d+/)
          if (priceNum) {
            return product.price < Number.parseInt(priceNum[0])
          }
        }
        if (query.includes("over") || query.includes("above")) {
          const priceNum = query.match(/\d+/)
          if (priceNum) {
            return product.price > Number.parseInt(priceNum[0])
          }
        }
        if (query.includes("cheap") || query.includes("affordable")) {
          return product.price < 100
        }
        if (query.includes("expensive") || query.includes("luxury")) {
          return product.price > 150
        }
        return false
      })()

      return nameMatch || categoryMatch || keywordMatch || priceMatch
    })
  }

  // Handle search input
  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true)
      // Simulate API delay
      const timer = setTimeout(() => {
        const searchResults = searchProducts(query)
        setResults(searchResults.slice(0, 8)) // Limit to 8 results
        setIsLoading(false)
        setIsOpen(true)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setResults([])
      setIsOpen(false)
      setIsLoading(false)
    }
  }, [query])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      // Navigate to search results page
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (query.trim() || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mx-auto"></div>
              <p className="mt-2">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm text-gray-600">
                  Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {results.map((product) => (
                  <Link
                    key={`${product.category}-${product.id}`}
                    href={`/product/${product.category}/${product.id}`}
                    className="flex items-center p-3 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-12 h-12 flex-shrink-0 mr-3">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                      <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                    </div>
                    <div className="text-sm font-medium text-black">AED {product.price}</div>
                  </Link>
                ))}
              </div>
              {results.length >= 8 && (
                <div className="p-3 border-t border-gray-100">
                  <Link
                    href={`/search?q=${encodeURIComponent(query.trim())}`}
                    className="block text-center text-sm text-black hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    View all results
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No products found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for "abayas", "jewelry", "bags", etc.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
