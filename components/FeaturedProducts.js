import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

export default function FeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      name: "Elegant Black Abaya",
      price: 129.99,
      originalPrice: 159.99,
      image: "/abaya-1.png",
      rating: 4.8,
      category: "abayas",
    },
    {
      id: 2,
      name: "Gold Pearl Necklace",
      price: 89.99,
      originalPrice: 119.99,
      image: "/jew-1.png",
      rating: 4.9,
      category: "jewelry",
    },
    {
      id: 3,
      name: "Luxury Lipstick Set",
      price: 45.99,
      originalPrice: 59.99,
      image: "/cosmetics-1.png",
      rating: 4.7,
      category: "cosmetics",
    },
    {
      id: 4,
      name: "Rose Garden Perfume",
      price: 75.99,
      originalPrice: 95.99,
      image: "/perfume-1.png",
      rating: 4.8,
      category: "perfumes",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Handpicked favorites from our collection</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card group">
              <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
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
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-black">AED {product.price}</span>
                  <span className="text-sm text-gray-500 line-through">AED {product.originalPrice}</span>
                </div>
              </div>
              <Link
                href={`/product/${product.category}/${product.id}`}
                className="w-full btn-primary text-center block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
