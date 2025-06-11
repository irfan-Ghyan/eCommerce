import Link from "next/link"
import Image from "next/image"

export default function CategoriesSection() {
  const categories = [
    {
      name: "Abayas",
      href: "/category/abayas",
      image: "/placeholder.svg?height=300&width=300",
      description: "Elegant traditional wear",
    },
    {
      name: "Jewelry",
      href: "/category/jewelry",
      image: "/placeholder.svg?height=300&width=300",
      description: "Exquisite jewelry pieces",
    },
    {
      name: "Cosmetics",
      href: "/category/cosmetics",
      image: "/placeholder.svg?height=300&width=300",
      description: "Premium beauty products",
    },
    {
      name: "Perfumes",
      href: "/category/perfumes",
      image: "/placeholder.svg?height=300&width=300",
      description: "Captivating fragrances",
    },
    {
      name: "Shoes",
      href: "/category/shoes",
      image: "/placeholder.svg?height=300&width=300",
      description: "Stylish footwear",
    },
    {
      name: "Bags",
      href: "/category/bags",
      image: "/placeholder.svg?height=300&width=300",
      description: "Designer handbags",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600">Discover our carefully curated collections</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-200">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
