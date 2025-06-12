"use client"
import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, Grid, List } from "lucide-react"
import AddToCartButton from "@/components/AddToCartButton"

// All products data (same as in SearchBar component)
const allProducts = {
  abayas: [
    {
      id: 1,
      name: "Classic Black Abaya",
      price: 129.99,
      originalPrice: 159.99,
      image: "/placeholder.svg?height=400&width=300&text=Black+Abaya",
      rating: 4.8,
      category: "abayas",
      keywords: ["black", "classic", "traditional", "elegant", "formal"],
    },
    {
      id: 2,
      name: "Embroidered Abaya",
      price: 189.99,
      originalPrice: 229.99,
      image: "/placeholder.svg?height=400&width=300&text=Embroidered+Abaya",
      rating: 4.9,
      category: "abayas",
      keywords: ["embroidered", "silk", "luxury", "special", "occasion"],
    },
    {
      id: 3,
      name: "Modern Cut Abaya",
      price: 149.99,
      originalPrice: 179.99,
      image: "/placeholder.svg?height=400&width=300&text=Modern+Abaya",
      rating: 4.7,
      category: "abayas",
      keywords: ["modern", "contemporary", "stylish", "cotton"],
    },
    {
      id: 4,
      name: "Luxury Abaya",
      price: 299.99,
      originalPrice: 349.99,
      image: "/placeholder.svg?height=400&width=300&text=Luxury+Abaya",
      rating: 4.6,
      category: "abayas",
      keywords: ["luxury", "premium", "silk", "expensive"],
    },
    {
      id: 5,
      name: "Casual Abaya",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg?height=400&width=300&text=Casual+Abaya",
      rating: 4.3,
      category: "abayas",
      keywords: ["casual", "everyday", "comfortable", "cotton"],
    },
  ],
  bags: [
    {
      id: 1,
      name: "Luxury Handbag",
      price: 199.99,
      originalPrice: 249.99,
      image: "/placeholder.svg?height=400&width=300&text=Luxury+Handbag",
      rating: 4.9,
      category: "bags",
      keywords: ["luxury", "handbag", "leather", "designer", "formal"],
    },
    {
      id: 2,
      name: "Evening Clutch",
      price: 89.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=400&width=300&text=Evening+Clutch",
      rating: 4.7,
      category: "bags",
      keywords: ["evening", "clutch", "party", "formal", "satin"],
    },
  ],
  jewelry: [
    {
      id: 1,
      name: "Gold Pearl Necklace",
      price: 89.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=400&width=300&text=Pearl+Necklace",
      rating: 4.9,
      category: "jewelry",
      keywords: ["gold", "pearl", "necklace", "elegant", "formal"],
    },
    {
      id: 2,
      name: "Diamond Earrings",
      price: 159.99,
      originalPrice: 199.99,
      image: "/placeholder.svg?height=400&width=300&text=Diamond+Earrings",
      rating: 4.8,
      category: "jewelry",
      keywords: ["diamond", "earrings", "silver", "sparkle", "formal"],
    },
    {
      id: 3,
      name: "Ruby Ring",
      price: 249.99,
      originalPrice: 299.99,
      image: "/placeholder.svg?height=400&width=300&text=Ruby+Ring",
      rating: 4.7,
      category: "jewelry",
      keywords: ["ruby", "ring", "gold", "precious", "stone"],
    },
  ],
  cosmetics: [
    {
      id: 1,
      name: "Luxury Lipstick Set",
      price: 45.99,
      originalPrice: 59.99,
      image: "/placeholder.svg?height=400&width=300&text=Lipstick+Set",
      rating: 4.7,
      category: "cosmetics",
      keywords: ["lipstick", "makeup", "beauty", "set", "colors"],
    },
    {
      id: 2,
      name: "Foundation Kit",
      price: 65.99,
      originalPrice: 79.99,
      image: "/placeholder.svg?height=400&width=300&text=Foundation+Kit",
      rating: 4.5,
      category: "cosmetics",
      keywords: ["foundation", "makeup", "beauty", "coverage", "skin"],
    },
  ],
  perfumes: [
    {
      id: 1,
      name: "Rose Garden Perfume",
      price: 75.99,
      originalPrice: 95.99,
      image: "/placeholder.svg?height=400&width=300&text=Rose+Perfume",
      rating: 4.8,
      category: "perfumes",
      keywords: ["rose", "floral", "fragrance", "perfume", "romantic"],
    },
    {
      id: 2,
      name: "Ocean Breeze",
      price: 125.99,
      originalPrice: 149.99,
      image: "/placeholder.svg?height=400&width=300&text=Ocean+Breeze",
      rating: 4.6,
      category: "perfumes",
      keywords: ["ocean", "fresh", "citrus", "aquatic", "summer"],
    },
  ],
  shoes: [
    {
      id: 1,
      name: "Elegant Heels",
      price: 99.99,
      originalPrice: 129.99,
      image: "/placeholder.svg?height=400&width=300&text=Elegant+Heels",
      rating: 4.6,
      category: "shoes",
      keywords: ["heels", "elegant", "formal", "leather", "party"],
    },
    {
      id: 2,
      name: "Comfort Flats",
      price: 59.99,
      originalPrice: 79.99,
      image: "/placeholder.svg?height=400&width=300&text=Comfort+Flats",
      rating: 4.4,
      category: "shoes",
      keywords: ["flats", "comfortable", "casual", "everyday", "walking"],
    },
  ],
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [selectedCategories, setSelectedCategories] = useState([])

  // Flatten all products
  const flatProducts = Object.values(allProducts).flat()

  // Search function
  const searchResults = useMemo(() => {
    if (!query.trim()) return []

    const searchQuery = query.toLowerCase().trim()

    let results = flatProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchQuery)
      const categoryMatch = product.category.toLowerCase().includes(searchQuery)
      const keywordMatch = product.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery))

      const priceMatch = (() => {
        if (searchQuery.includes("under") || searchQuery.includes("below")) {
          const priceNum = searchQuery.match(/\d+/)
          if (priceNum) return product.price < Number.parseInt(priceNum[0])
        }
        if (searchQuery.includes("over") || searchQuery.includes("above")) {
          const priceNum = searchQuery.match(/\d+/)
          if (priceNum) return product.price > Number.parseInt(priceNum[0])
        }
        if (searchQuery.includes("cheap") || searchQuery.includes("affordable")) {
          return product.price < 100
        }
        if (searchQuery.includes("expensive") || searchQuery.includes("luxury")) {
          return product.price > 150
        }
        return false
      })()

      return nameMatch || categoryMatch || keywordMatch || priceMatch
    })

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      results = results.filter((product) => selectedCategories.includes(product.category))
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results.sort((a, b) => b.price - a.price)
        break
      case "rating":
        results.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Keep relevance order (search algorithm order)
        break
    }

    return results
  }, [query, selectedCategories, sortBy])

  const categories = ["abayas", "bags", "jewelry", "cosmetics", "perfumes", "shoes"]

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Search Results</h1>
        {query && (
          <p className="text-gray-600">
            {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found for "{query}"
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-64">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-black">Filters</h3>
              {selectedCategories.length > 0 && (
                <button onClick={() => setSelectedCategories([])} className="text-sm text-gray-600 hover:text-black">
                  Clear
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-black mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2 text-black focus:ring-black"
                    />
                    <label htmlFor={category} className="text-sm text-gray-600 cursor-pointer capitalize">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {searchResults.length} product{searchResults.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rating</option>
                <option value="name">Name A-Z</option>
              </select>

              <div className="flex border border-gray-300 rounded">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-gray-100" : ""}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                {query ? `No products found for "${query}"` : "Enter a search term to find products"}
              </p>
              <div className="text-sm text-gray-400">
                <p>Try searching for:</p>
                <p>"abayas", "jewelry", "bags", "luxury", "black", etc.</p>
              </div>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {searchResults.map((product) => (
                <div key={`${product.category}-${product.id}`} className="product-card group">
                  <div className="relative">
                    <div
                      className={`${viewMode === "grid" ? "aspect-[3/4]" : "aspect-square w-48"} mb-4 overflow-hidden rounded-lg`}
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <div className={viewMode === "list" ? "flex-1 ml-4" : ""}>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                    </div>

                    <h3 className="font-semibold text-black mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 capitalize">{product.category}</p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-black">AED {product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">AED {product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Link
                        href={`/product/${product.category}/${product.id}`}
                        className="flex-1 btn-secondary text-center"
                      >
                        View Details
                      </Link>
                      <AddToCartButton
                        product={product}
                        category={product.category}
                        selectedSize={null}
                        className="btn-primary flex items-center"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
