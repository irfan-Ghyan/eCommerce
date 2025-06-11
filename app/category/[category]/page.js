"use client"
import React from "react"
import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter, Grid, List, Star, Heart } from "lucide-react"
import AddToCartButton from "@/components/AddToCartButton"

const categoryData = {
  abayas: {
    title: "Abayas",
    description: "Elegant traditional wear for the modern woman",
    products: [
      {
        id: 1,
        name: "Classic Black Abaya",
        price: 129.99,
        originalPrice: 159.99,
        image: "/abaya-1.png",
        rating: 4.8,
        fabric: "Premium Crepe",
        colors: ["Black", "Navy", "Burgundy"],
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        id: 2,
        name: "Embroidered Abaya",
        price: 189.99,
        originalPrice: 229.99,
        image: "/abaya-2.png",
        rating: 4.9,
        fabric: "Silk Blend",
        colors: ["Black", "Green", "Red"],
        sizes: ["S", "M", "L", "XL"],
      },
      {
        id: 3,
        name: "Modern Cut Abaya",
        price: 149.99,
        originalPrice: 179.99,
        image: "/abaya-3.png",
        rating: 4.7,
        fabric: "Cotton Blend",
        colors: ["Black", "Gray", "Brown"],
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      {
        id: 4,
        name: "Luxury Abaya",
        price: 299.99,
        originalPrice: 349.99,
        image: "/abaya-4.png",
        rating: 4.6,
        fabric: "Premium Silk",
        colors: ["Black", "Blue", "Purple"],
        sizes: ["M", "L", "XL", "XXL"],
      },
      {
        id: 5,
        name: "Casual Abaya",
        price: 79.99,
        originalPrice: 99.99,
        image: "/abaya-5.png",
        rating: 4.3,
        fabric: "Cotton",
        colors: ["Black", "White", "Pink"],
        sizes: ["XS", "S", "M", "L"],
      },
    ],
  },
  jewelry: {
    title: "Jewelry",
    description: "Exquisite jewelry pieces to complement your style",
    products: [
      {
        id: 1,
        name: "Gold Pearl Necklace",
        price: 89.99,
        originalPrice: 119.99,
        image: "/abaya-1.png",
        rating: 4.9,
        material: "18K Gold Plated",
        colors: ["Gold", "Silver", "Rose Gold"],
      },
      {
        id: 2,
        name: "Diamond Earrings",
        price: 159.99,
        originalPrice: 199.99,
        image: "/abaya-2.png",
        rating: 4.8,
        material: "Sterling Silver",
        colors: ["Silver", "Gold"],
      },
      {
        id: 3,
        name: "Ruby Ring",
        price: 249.99,
        originalPrice: 299.99,
        image: "/abaya-3.png",
        rating: 4.7,
        material: "14K Gold",
        colors: ["Gold", "Red"],
      },
    ],
  },
  cosmetics: {
    title: "Cosmetics",
    description: "Premium beauty products for your daily routine",
    products: [
      {
        id: 1,
        name: "Luxury Lipstick Set",
        price: 45.99,
        originalPrice: 59.99,
        image: "/abaya-1.png0",
        rating: 4.7,
        brand: "Elegance Beauty",
        colors: ["Red", "Pink", "Nude", "Berry"],
      },
      {
        id: 2,
        name: "Foundation Kit",
        price: 65.99,
        originalPrice: 79.99,
        image: "/abaya-2.png",
        rating: 4.5,
        brand: "Elegance Beauty",
        colors: ["Beige", "Tan", "Fair"],
      },
    ],
  },
  perfumes: {
    title: "Perfumes",
    description: "Captivating fragrances for every occasion",
    products: [
      {
        id: 1,
        name: "Rose Garden Perfume",
        price: 75.99,
        originalPrice: 95.99,
        image: "/abaya-3.png",
        rating: 4.8,
        size: "50ml",
        notes: ["Rose", "Jasmine", "Vanilla"],
      },
      {
        id: 2,
        name: "Ocean Breeze",
        price: 125.99,
        originalPrice: 149.99,
        image: "/abaya-4.png",
        rating: 4.6,
        size: "100ml",
        notes: ["Ocean", "Citrus", "Musk"],
      },
    ],
  },
  shoes: {
    title: "Shoes",
    description: "Stylish footwear for every occasion",
    products: [
      {
        id: 1,
        name: "Elegant Heels",
        price: 99.99,
        originalPrice: 129.99,
        image: "/abaya-1.png",
        rating: 4.6,
        colors: ["Black", "Nude", "Red"],
        sizes: ["5", "6", "7", "8", "9", "10"],
      },
      {
        id: 2,
        name: "Comfort Flats",
        price: 59.99,
        originalPrice: 79.99,
        image: "/abaya-2.png",
        rating: 4.4,
        colors: ["Black", "Brown", "White"],
        sizes: ["5", "6", "7", "8", "9"],
      },
    ],
  },
  bags: {
    title: "Bags",
    description: "Designer handbags and accessories",
    products: [
      {
        id: 1,
        name: "Luxury Handbag",
        price: 199.99,
        originalPrice: 249.99,
        image: "/abaya-3.png",
        rating: 4.9,
        material: "Genuine Leather",
        colors: ["Black", "Brown", "Tan"],
      },
      {
        id: 2,
        name: "Evening Clutch",
        price: 89.99,
        originalPrice: 119.99,
        image: "/abaya-4.png",
        rating: 4.7,
        material: "Satin",
        colors: ["Black", "Gold", "Silver"],
      },
    ],
  },
}

export default function CategoryPage({ params }) {
  const resolvedParams = React.use(params)
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("featured")

  // Filter states
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])

  const category = categoryData[resolvedParams.category] || categoryData.abayas
  const allProducts = category.products || []

  // Available filter options
  const availableColors = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Pink",
    "Yellow",
    "Gray",
    "Gold",
    "Silver",
    "Brown",
    "Navy",
    "Purple",
    "Beige",
    "Tan",
    "Fair",
    "Nude",
    "Rose Gold",
  ]
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "5", "6", "7", "8", "9", "10"]
  const priceRanges = [
    { id: "under-50", label: "Under AED 50", min: 0, max: 50 },
    { id: "50-100", label: "AED 50 - AED 100", min: 50, max: 100 },
    { id: "100-200", label: "AED 100 - AED 200", min: 100, max: 200 },
    { id: "over-200", label: "Over AED 200", min: 200, max: Number.POSITIVE_INFINITY },
  ]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        return selectedPriceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId)
          return product.price >= range.min && product.price <= range.max
        })
      })
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) => {
        if (!product.colors) return false
        return product.colors.some((color) => selectedColors.includes(color))
      })
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) => {
        if (!product.sizes) return false
        return product.sizes.some((size) => selectedSizes.includes(size))
      })
    }

    // Filter by rating
    if (selectedRatings.length > 0) {
      filtered = filtered.filter((product) => {
        return selectedRatings.some((minRating) => product.rating >= minRating)
      })
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Keep original order for featured
        break
    }

    return filtered
  }, [allProducts, selectedPriceRanges, selectedColors, selectedSizes, selectedRatings, sortBy])

  // Filter handlers
  const handlePriceRangeChange = (rangeId) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((id) => id !== rangeId) : [...prev, rangeId],
    )
  }

  const handleColorChange = (color) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  const clearAllFilters = () => {
    setSelectedPriceRanges([])
    setSelectedColors([])
    setSelectedSizes([])
    setSelectedRatings([])
  }

  const getColorStyle = (color) => {
    const colorMap = {
      Black: "#000000",
      White: "#FFFFFF",
      Red: "#EF4444",
      Blue: "#3B82F6",
      Green: "#10B981",
      Pink: "#EC4899",
      Yellow: "#F59E0B",
      Gray: "#6B7280",
      Gold: "#F59E0B",
      Silver: "#9CA3AF",
      Brown: "#92400E",
      Navy: "#1E3A8A",
      Purple: "#8B5CF6",
      Beige: "#F5F5DC",
      Tan: "#D2B48C",
      Fair: "#FAD5A5",
      Nude: "#E8B4B8",
      "Rose Gold": "#E8B4B8",
    }
    return colorMap[color] || "#6B7280"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.title}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              {(selectedPriceRanges.length > 0 ||
                selectedColors.length > 0 ||
                selectedSizes.length > 0 ||
                selectedRatings.length > 0) && (
                <button onClick={clearAllFilters} className="text-sm text-rose-600 hover:text-rose-700">
                  Clear All
                </button>
              )}
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={range.id}
                      checked={selectedPriceRanges.includes(range.id)}
                      onChange={() => handlePriceRangeChange(range.id)}
                      className="mr-2 text-rose-600 focus:ring-rose-500"
                    />
                    <label htmlFor={range.id} className="text-sm text-gray-600 cursor-pointer">
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Colors</h4>
              <div className="grid grid-cols-4 gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColors.includes(color) ? "border-rose-500 ring-2 ring-rose-200" : "border-gray-300"
                    } hover:border-rose-400 transition-colors`}
                    style={{ backgroundColor: getColorStyle(color) }}
                    title={color}
                  />
                ))}
              </div>
              {selectedColors.length > 0 && (
                <div className="mt-2 text-xs text-gray-600">Selected: {selectedColors.join(", ")}</div>
              )}
            </div>

            {/* Sizes */}
            {(resolvedParams.category === "abayas" || resolvedParams.category === "shoes") && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Sizes</h4>
                <div className="grid grid-cols-3 gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`border rounded px-3 py-1 text-sm transition-colors ${
                        selectedSizes.includes(size)
                          ? "border-rose-500 bg-rose-50 text-rose-600"
                          : "border-gray-300 hover:border-rose-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Rating */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onChange={() => handleRatingChange(rating)}
                      className="mr-2 text-rose-600 focus:ring-rose-500"
                    />
                    <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">& up</span>
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
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center text-gray-600 hover:text-gray-900"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <span className="text-gray-600">
                {filteredProducts.length} of {allProducts.length} products
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rating</option>
                <option value="newest">Newest</option>
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

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              <button onClick={clearAllFilters} className="mt-4 btn-primary">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card group">
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

                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>

                    {/* Product Details */}
                    {product.fabric && <p className="text-sm text-gray-600 mb-1">Fabric: {product.fabric}</p>}
                    {product.material && <p className="text-sm text-gray-600 mb-1">Material: {product.material}</p>}

                    {/* Colors */}
                    {product.colors && (
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-600 mr-2">Colors:</span>
                        <div className="flex space-x-1">
                          {product.colors.slice(0, 3).map((color) => (
                            <div
                              key={color}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: getColorStyle(color) }}
                              title={color}
                            />
                          ))}
                          {product.colors.length > 3 && (
                            <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Sizes */}
                    {product.sizes && (
                      <div className="mb-2">
                        <span className="text-sm text-gray-600">Sizes: {product.sizes.join(", ")}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-rose-600">AED {product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">AED {product.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <Link
                        href={`/product/${resolvedParams.category}/${product.id}`}
                        className="flex-1 btn-secondary text-center"
                      >
                        View Details
                      </Link>
                      <AddToCartButton
                        product={product}
                        category={resolvedParams.category}
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
