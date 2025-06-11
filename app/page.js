import HeroSection from "@/components/HeroSection"
import CategoriesSection from "@/components/CategoriesSection"
import FeaturedProducts from "@/components/FeaturedProducts"
import FeaturesSection from "@/components/FeaturesSection"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <FeaturesSection />
    </div>
  )
}
