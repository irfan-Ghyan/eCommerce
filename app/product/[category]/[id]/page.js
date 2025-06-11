"use client"
import React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, Minus, Plus, Truck, RotateCcw, Shield } from "lucide-react"
import AddToCartButton from "@/components/AddToCartButton"

const productData = {
  abayas: {
    1: {
      id: 1,
      name: "Classic Black Abaya",
      price: 129.99,
      originalPrice: 159.99,
      images: [
        "/placeholder.svg?height=600&width=500",
        "/placeholder.svg?height=600&width=500",
        "/placeholder.svg?height=600&width=500",
        "/placeholder.svg?height=600&width=500",
      ],
      rating: 4.8,
      reviews: 124,
      fabric: "Premium Crepe",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Navy", value: "#1e3a8a" },
        { name: "Burgundy", value: "#7c2d12" },
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      description:
        "Elegant and sophisticated, this classic black abaya is perfect for any occasion. Made from premium crepe fabric, it offers comfort and style in equal measure.",
      features: [
        "Premium crepe fabric",
        "Loose-fitting design",
        "Full-length sleeves",
        "Machine washable",
        "Available in multiple colors",
      ],
      sizeGuide: {
        S: 'Chest: 36", Length: 54"',
        M: 'Chest: 38", Length: 55"',
        L: 'Chest: 40", Length: 56"',
        XL: 'Chest: 42", Length: 57"',
        XXL: 'Chest: 44", Length: 58"',
      },
    },
  },
}

export default function ProductPage({ params }) {
  const resolvedParams = React.use(params)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const product = productData[resolvedParams.category]?.[resolvedParams.id] || productData.abayas[1]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-rose-600">
            Home
          </Link>
          <span>/</span>
          <Link href={`/category/${resolvedParams.category}`} className="hover:text-rose-600 capitalize">
            {resolvedParams.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="aspect-[4/5] mb-4 overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? "border-rose-500" : "border-gray-200"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-rose-600">AED {product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">AED {product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  Save AED {(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Fabric */}
          {product.fabric && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Fabric</h3>
              <p className="text-gray-600">{product.fabric}</p>
            </div>
          )}

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Color</h3>
            <div className="flex space-x-3">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === index ? "border-rose-500" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">Selected: {product.colors[selectedColor].name}</p>
          </div>

          {/* Size Selection */}
          {(resolvedParams.category === "abayas" || resolvedParams.category === "shoes") &&
            product.sizes &&
            product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Size</h3>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 border rounded-lg font-medium ${
                        selectedSize === size
                          ? "border-rose-500 bg-rose-50 text-rose-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex space-x-4 mb-8">
            <AddToCartButton
              product={product}
              category={resolvedParams.category}
              selectedSize={selectedSize}
              selectedColor={product.colors[selectedColor].name}
              quantity={quantity}
              className="flex-1 btn-primary flex items-center justify-center"
            />
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <Truck className="w-6 h-6 text-rose-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Free Shipping</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-6 h-6 text-rose-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Easy Returns</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 text-rose-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Secure Payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {["description", "features", "size-guide", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-8">
          {activeTab === "description" && (
            <div>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === "features" && (
            <div>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-rose-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "size-guide" && (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Measurements
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(product.sizeGuide).map(([size, measurements]) => (
                      <tr key={size}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{measurements}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="text-center py-8">
                <p className="text-gray-600">Reviews coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
