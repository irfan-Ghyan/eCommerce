import Link from "next/link"
import Image from "next/image"

export default function CategoriesSection() {
  const categories = [
    {
      name: "Abayas",
      href: "/category/abayas",
      image: "/abaya-1.png",
      description: "Elegant traditional wear",
    },
    {
      name: "Jewelry",
      href: "/category/jewelry",
      image: "/jew-1.png",
      description: "Exquisite jewelry pieces",
    },
    {
      name: "Cosmetics",
      href: "/category/cosmetics",
      image: "/cosmetics-1.png",
      description: "Premium beauty products",
    },
    {
      name: "Perfumes",
      href: "/category/perfumes",
      image: "/perfume-1.png",
      description: "Captivating fragrances",
    },
    {
      name: "Shoes",
      href: "/category/shoes",
      image: "/shoe-1.png",
      description: "Stylish footwear",
    },
    {
      name: "Bags",
      href: "/category/bags",
      image: "/bag-1.png",
      description: "Designer handbags",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Discover our carefully curated collections</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300">
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
