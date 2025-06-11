import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Discover Your
              <span className="block">Elegance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Explore our premium collection of abayas, jewelry, cosmetics, perfumes, shoes, and bags designed for the
              modern woman.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/category/abayas" className="btn-primary inline-flex items-center justify-center">
                Shop Now <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link href="/about" className="btn-secondary inline-flex items-center justify-center">
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="Fashion Model"
              width={500}
              height={600}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
