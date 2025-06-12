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
        "/abaya-1.png",
        "/abaya-2.png",
        "/abaya-3.png",
        "/abaya-4.png",
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
    2: {
      id: 2,
      name: "Embroidered Abaya",
      price: 189.99,
      originalPrice: 229.99,
      images: [
        "/abaya-1.png",
        "/abaya-2.png",
        "/abaya-3.png",
        "/abaya-4.png",
      ],
      rating: 4.9,
      reviews: 89,
      fabric: "Silk Blend",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Green", value: "#10B981" },
        { name: "Red", value: "#EF4444" },
      ],
      sizes: ["S", "M", "L", "XL"],
      description:
        "Beautiful embroidered abaya with intricate patterns. Made from luxurious silk blend fabric for special occasions.",
      features: [
        "Silk blend fabric",
        "Hand embroidered details",
        "Elegant design",
        "Dry clean only",
        "Limited edition",
      ],
      sizeGuide: {
        S: 'Chest: 36", Length: 54"',
        M: 'Chest: 38", Length: 55"',
        L: 'Chest: 40", Length: 56"',
        XL: 'Chest: 42", Length: 57"',
      },
    },
  },
  bags: {
    1: {
      id: 1,
      name: "Luxury Handbag",
      price: 199.99,
      originalPrice: 249.99,
      images: [
        "/bag-1.png",
        "/bag-2.png",
        "/bag-3.png",
        "/bag-4.png",
      ],
      rating: 4.9,
      reviews: 156,
      material: "Genuine Leather",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Brown", value: "#92400E" },
        { name: "Tan", value: "#D2B48C" },
      ],
      description:
        "Luxurious handbag crafted from genuine leather. Perfect for both casual and formal occasions with ample storage space.",
      features: [
        "Genuine leather construction",
        "Multiple compartments",
        "Adjustable shoulder strap",
        "Gold-tone hardware",
        "Dust bag included",
      ],
      dimensions: {
        length: "12 inches",
        width: "5 inches",
        height: "9 inches",
        "strap drop": "8 inches",
      },
    },
    2: {
      id: 2,
      name: "Evening Clutch",
      price: 89.99,
      originalPrice: 119.99,
      images: [
       "/bag-1.png",
        "/bag-2.png",
        "/bag-3.png",
        "/bag-4.png",
      ],
      rating: 4.7,
      reviews: 92,
      material: "Satin",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Gold", value: "#F59E0B" },
        { name: "Silver", value: "#9CA3AF" },
      ],
      description:
        "Elegant evening clutch perfect for special occasions. Made from luxurious satin with a sophisticated design.",
      features: [
        "Satin material",
        "Magnetic closure",
        "Chain strap included",
        "Compact design",
        "Perfect for evening events",
      ],
      dimensions: {
        length: "8 inches",
        width: "2 inches",
        height: "5 inches",
        "chain length": "24 inches",
      },
    },
  },
  jewelry: {
    1: {
      id: 1,
      name: "Gold Pearl Necklace",
      price: 89.99,
      originalPrice: 119.99,
      images: [
        "/jew-1.png",
        "/jew-2.png",
        "/jew-3.png",
        "/jew-4.png",
      ],
      rating: 4.9,
      reviews: 203,
      material: "18K Gold Plated",
      colors: [
        { name: "Gold", value: "#F59E0B" },
        { name: "Silver", value: "#9CA3AF" },
        { name: "Rose Gold", value: "#E8B4B8" },
      ],
      description:
        "Elegant pearl necklace with 18K gold plating. Features lustrous pearls that add sophistication to any outfit.",
      features: [
        "18K gold plated",
        "Natural freshwater pearls",
        "Adjustable length",
        "Hypoallergenic",
        "Gift box included",
      ],
      specifications: {
        "pearl size": "6-7mm",
        length: "16-18 inches adjustable",
        clasp: "Lobster clasp",
        care: "Avoid water and chemicals",
      },
    },
    2: {
      id: 2,
      name: "Diamond Earrings",
      price: 159.99,
      originalPrice: 199.99,
      images: [
        "/jew-1.png",
        "/jew-2.png",
        "/jew-3.png",
        "/jew-4.png",
      ],
      rating: 4.8,
      reviews: 145,
      material: "Sterling Silver",
      colors: [
        { name: "Silver", value: "#9CA3AF" },
        { name: "Gold", value: "#F59E0B" },
      ],
      description: "Stunning diamond earrings set in sterling silver. Perfect for adding sparkle to any occasion.",
      features: [
        "Sterling silver setting",
        "Cubic zirconia stones",
        "Butterfly backs",
        "Nickel-free",
        "Certificate included",
      ],
      specifications: {
        "stone size": "5mm",
        setting: "Prong setting",
        back: "Butterfly back",
        care: "Clean with soft cloth",
      },
    },
  },
  cosmetics: {
    1: {
      id: 1,
      name: "Luxury Lipstick Set",
      price: 45.99,
      originalPrice: 59.99,
      images: [
        "/cosmetics-1.png",
        "/cosmetics-2.png",
        "/cosmetics-3.png",
        "/cosmetics-4.png",
      ],
      rating: 4.7,
      reviews: 234,
      brand: "Elegance Beauty",
      colors: [
        { name: "Red", value: "#EF4444" },
        { name: "Pink", value: "#EC4899" },
        { name: "Nude", value: "#E8B4B8" },
        { name: "Berry", value: "#7C2D12" },
      ],
      description: "Luxurious lipstick set with 4 stunning shades. Long-lasting formula with moisturizing ingredients.",
      features: [
        "4 lipstick shades included",
        "Long-lasting formula",
        "Moisturizing ingredients",
        "Cruelty-free",
        "Beautiful packaging",
      ],
      specifications: {
        quantity: "4 x 3.5g",
        finish: "Satin",
        "key ingredients": "Vitamin E, Jojoba Oil",
        "shelf life": "24 months",
      },
    },
    2: {
      id: 2,
      name: "Foundation Kit",
      price: 65.99,
      originalPrice: 79.99,
      images: [
         "/cosmetics-1.png",
        "/cosmetics-2.png",
        "/cosmetics-3.png",
        "/cosmetics-4.png",
      ],
      rating: 4.5,
      reviews: 187,
      brand: "Elegance Beauty",
      colors: [
        { name: "Fair", value: "#FAD5A5" },
        { name: "Beige", value: "#F5F5DC" },
        { name: "Tan", value: "#D2B48C" },
      ],
      description:
        "Complete foundation kit with multiple shades for perfect color matching. Full coverage with natural finish.",
      features: [
        "3 foundation shades",
        "Full coverage formula",
        "Natural finish",
        "SPF 15 protection",
        "Includes application sponge",
      ],
      specifications: {
        quantity: "3 x 30ml",
        coverage: "Full",
        finish: "Natural",
        spf: "SPF 15",
      },
    },
  },
  perfumes: {
    1: {
      id: 1,
      name: "Rose Garden Perfume",
      price: 75.99,
      originalPrice: 95.99,
      images: [
         "/perfumes-1.png",
        "/perfumes-2.png",
        "/perfumes-3.png",
        "/perfumes-4.png",
      ],
      rating: 4.8,
      reviews: 167,
      size: "50ml",
      notes: ["Rose", "Jasmine", "Vanilla"],
      description:
        "Enchanting rose garden perfume with floral notes. Perfect for romantic occasions and everyday wear.",
      features: [
        "Long-lasting fragrance",
        "Natural rose essence",
        "Elegant bottle design",
        "Perfect for gifting",
        "Alcohol-free formula",
      ],
      specifications: {
        size: "50ml",
        "fragrance family": "Floral",
        "top notes": "Rose, Bergamot",
        "heart notes": "Jasmine, Peony",
        "base notes": "Vanilla, Musk",
      },
    },
    2: {
      id: 2,
      name: "Ocean Breeze",
      price: 125.99,
      originalPrice: 149.99,
      images: [
        "/perfumes-1.png",
        "/perfumes-2.png",
        "/perfumes-3.png",
        "/perfumes-4.png",
      ],
      rating: 4.6,
      reviews: 134,
      size: "100ml",
      notes: ["Ocean", "Citrus", "Musk"],
      description:
        "Fresh ocean breeze fragrance with citrus and aquatic notes. Perfect for summer and active lifestyle.",
      features: [
        "Fresh aquatic scent",
        "Long-lasting formula",
        "Unisex fragrance",
        "Premium bottle",
        "Travel-friendly size",
      ],
      specifications: {
        size: "100ml",
        "fragrance family": "Aquatic",
        "top notes": "Citrus, Sea Salt",
        "heart notes": "Ocean Breeze, Lily",
        "base notes": "Musk, Amber",
      },
    },
  },
  shoes: {
    1: {
      id: 1,
      name: "Elegant Heels",
      price: 99.99,
      originalPrice: 129.99,
      images: [
        "/shoe-1.png",
        "/shoe-2.png",
        "/shoe-3.png",
        "/shoe-4.png",
      ],
      rating: 4.6,
      reviews: 198,
      material: "Leather",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Nude", value: "#E8B4B8" },
        { name: "Red", value: "#EF4444" },
      ],
      sizes: ["5", "6", "7", "8", "9", "10"],
      description:
        "Elegant high heels perfect for formal occasions. Comfortable design with premium leather construction.",
      features: [
        "Premium leather upper",
        "Cushioned insole",
        "3-inch heel height",
        "Non-slip sole",
        "Available in multiple colors",
      ],
      sizeGuide: {
        5: "US 5 / EU 35",
        6: "US 6 / EU 36",
        7: "US 7 / EU 37",
        8: "US 8 / EU 38",
        9: "US 9 / EU 39",
        10: "US 10 / EU 40",
      },
    },
    2: {
      id: 2,
      name: "Comfort Flats",
      price: 59.99,
      originalPrice: 79.99,
      images: [
         "/shoe-1.png",
        "/shoe-2.png",
        "/shoe-3.png",
        "/shoe-4.png",
      ],
      rating: 4.4,
      reviews: 156,
      material: "Synthetic",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Brown", value: "#92400E" },
        { name: "White", value: "#FFFFFF" },
      ],
      sizes: ["5", "6", "7", "8", "9"],
      description: "Comfortable flat shoes perfect for everyday wear. Lightweight design with excellent support.",
      features: [
        "Lightweight construction",
        "Memory foam insole",
        "Breathable lining",
        "Flexible sole",
        "Easy slip-on design",
      ],
      sizeGuide: {
        5: "US 5 / EU 35",
        6: "US 6 / EU 36",
        7: "US 7 / EU 37",
        8: "US 8 / EU 38",
        9: "US 9 / EU 39",
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


  const categoryProducts = productData[resolvedParams.category]
  const product = categoryProducts?.[resolvedParams.id]

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link href={`/category/${resolvedParams.category}`} className="btn-primary">
            Back to {resolvedParams.category}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href={`/category/${resolvedParams.category}`} className="hover:text-black capitalize">
            {resolvedParams.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
 
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


          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? "border-black" : "border-gray-200"
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


          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-black">AED {product.price}</span>
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

          {product.fabric && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Fabric</h3>
              <p className="text-gray-600">{product.fabric}</p>
            </div>
          )}

          {product.material && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Material</h3>
              <p className="text-gray-600">{product.material}</p>
            </div>
          )}

          {product.brand && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Brand</h3>
              <p className="text-gray-600">{product.brand}</p>
            </div>
          )}

          {product.size && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Size</h3>
              <p className="text-gray-600">{product.size}</p>
            </div>
          )}

          {product.notes && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Fragrance Notes</h3>
              <p className="text-gray-600">{product.notes.join(", ")}</p>
            </div>
          )}

          {product.colors && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === index ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">Selected: {product.colors[selectedColor].name}</p>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-4 border rounded-lg font-medium ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}


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

          <div className="flex space-x-4 mb-8">
            <AddToCartButton
              product={product}
              category={resolvedParams.category}
              selectedSize={selectedSize}
              selectedColor={product.colors ? product.colors[selectedColor].name : null}
              quantity={quantity}
              className="flex-1 btn-primary flex items-center justify-center"
            />
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Heart className="w-5 h-5" />
            </button>
          </div>


          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <Truck className="w-6 h-6 text-black mx-auto mb-2" />
              <p className="text-sm text-gray-600">Free Shipping</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-6 h-6 text-black mx-auto mb-2" />
              <p className="text-sm text-gray-600">Easy Returns</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 text-black mx-auto mb-2" />
              <p className="text-sm text-gray-600">Secure Payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {["description", "features", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "specifications" && (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(product.sizeGuide || product.dimensions || product.specifications) &&
                      Object.entries(product.sizeGuide || product.dimensions || product.specifications || {}).map(
                        ([key, value]) => (
                          <tr key={key}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                              {key}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value}</td>
                          </tr>
                        ),
                      )}
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
