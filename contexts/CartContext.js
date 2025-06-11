"use client"
import { createContext, useContext, useReducer, useEffect } from "react"

const CartContext = createContext()

// Cart reducer to handle state changes
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.category === action.payload.category &&
          item.size === action.payload.size &&
          item.color === action.payload.color,
      )

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === existingItem.id &&
            item.category === existingItem.category &&
            item.size === existingItem.size &&
            item.color === existingItem.color
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      }
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.cartId !== action.payload.cartId),
      }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.cartId === action.payload.cartId ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      }

    case "LOAD_CART":
      return {
        ...state,
        items: action.payload || [],
      }

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("elegance-cart")
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartData })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("elegance-cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product, category, selectedSize, selectedColor, quantity = 1) => {
    const cartId = `${product.id}-${category}-${selectedSize || "no-size"}-${selectedColor || "default"}-${Date.now()}`

    const cartItem = {
      cartId,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0],
      category,
      size: selectedSize,
      color: selectedColor,
      quantity,
      fabric: product.fabric,
      material: product.material,
    }

    dispatch({ type: "ADD_ITEM", payload: cartItem })
  }

  const removeItem = (cartId) => {
    dispatch({ type: "REMOVE_ITEM", payload: { cartId } })
  }

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeItem(cartId)
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { cartId, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getCartCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const value = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
