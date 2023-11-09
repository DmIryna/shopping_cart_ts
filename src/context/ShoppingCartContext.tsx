import { ReactNode, createContext, useContext, useState } from "react"
import ShoppingCart from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface CartItem {
  id: number
  quantity: number
}

interface ShoppingCartProviderProps {
  children: ReactNode
}

interface ShoppingCartContextProps {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export function useShoppingContext() {
  return useContext(ShoppingCartContext)
}

export default function ShoppingCartProvider({
  children,
}: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shoppingCart",
    []
  )
  const [isOpen, setIsOpen] = useState(false)

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )
  const getItemQuantity = (id: number) =>
    cartItems.find((item) => item.id === id)?.quantity || 0

  const increaseCartQuantity = (id: number) => {
    setCartItems((current) =>
      current.find((item) => item.id === id) == null
        ? [...current, { id, quantity: 1 }]
        : cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
    )
  }

  const decreaseCartQuantity = (id: number) => {
    setCartItems((current) =>
      current.find((item) => item.id === id)?.quantity === 1
        ? current.filter((item) => item.id !== id)
        : cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
    )
  }

  const removeFromCart = (id: number) =>
    setCartItems(cartItems.filter((item) => item.id !== id))

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}
