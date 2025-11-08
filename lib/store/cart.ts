'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/app/api/products/route'

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (product: Product) => {
        const items = get().items
        const existingItem = items.find(item => item.id === product.id)

        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }]
          })
        }

        // Toplam ve item sayısını güncelle
        const state = get()
        set({
          total: state.getTotal(),
          itemCount: state.getItemCount()
        })
      },

      removeItem: (productId: number) => {
        set({
          items: get().items.filter(item => item.id !== productId)
        })

        // Toplam ve item sayısını güncelle
        const state = get()
        set({
          total: state.getTotal(),
          itemCount: state.getItemCount()
        })
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set({
          items: get().items.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        })

        // Toplam ve item sayısını güncelle
        const state = get()
        set({
          total: state.getTotal(),
          itemCount: state.getItemCount()
        })
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0
        })
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + (item.price * item.quantity),
          0
        )
      },

      getItemCount: () => {
        return get().items.reduce(
          (count, item) => count + item.quantity,
          0
        )
      }
    }),
    {
      name: 'mann-cart-storage', // localStorage key
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount
      })
    }
  )
)
