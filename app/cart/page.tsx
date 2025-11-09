'use client'

import { useCartStore } from '@/lib/store/cart'
import Link from 'next/link'

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, getTotal, getItemCount } = useCartStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const total = getTotal()
  const itemCount = getItemCount()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-black mb-4">Sepetiniz Boş</h2>
          <p className="text-gray-600 mb-8">Sepetinize ürün eklemediniz.</p>
          <Link href="/shop" className="bg-black text-white px-8 py-3 rounded-md">
            Mağazaya Git
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">
            Sepetim ({itemCount} ürün)
          </h1>
          <button onClick={clearCart} className="text-red-600 text-sm font-medium">
            Sepeti Temizle
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-2xl">👕</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.category}</p>
                      <p className="font-bold">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 border rounded flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border rounded flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600"
                    >
                      Sil
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between">
                  <span>Toplam:</span>
                  <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Sipariş Özeti</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Ara Toplam:</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo:</span>
                  <span className="text-green-600">Ücretsiz</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-md mt-6">
                  Ödeme Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
