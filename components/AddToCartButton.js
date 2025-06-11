"use client"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

export default function AddToCartButton({
  product,
  category,
  selectedSize,
  selectedColor,
  quantity = 1,
  onSizeRequired,
  className = "btn-primary flex items-center",
}) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    // Check if this product category requires size selection
    const requiresSize = (category === "abayas" || category === "shoes") && product.sizes && product.sizes.length > 0

    if (requiresSize && !selectedSize) {
      if (onSizeRequired) {
        onSizeRequired()
      } else {
        alert("Please select a size")
      }
      return
    }

    // Add item to cart without showing alert
    addItem(product, category, selectedSize, selectedColor, quantity)
  }

  return (
    <button onClick={handleAddToCart} className={className}>
      <ShoppingCart className="w-4 h-4 mr-2" />
      Add to Cart
    </button>
  )
}
