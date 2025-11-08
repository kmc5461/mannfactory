'use client'

import { useCartStore } from '@/lib/store/cart'

import Link from 'next/link'
import { Trash2, Minus, Plus, ArrowLeft, CreditCard } from 'lucide-react'

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

  // Kargo ücreti (150 TL üzeri ücretsiz)
  const shippingCost = total < 150 ? 29.90 : 0
  const finalTotal = total + shippingCost

  const handleCheckout = () => {
    // Dummy ödeme işlemi
    alert('Ödeme özelliği yakında entegre edilecektir!')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-black mb-4">
              Sepetiniz Boş
            </h1>
            <p className="text-gray-600 mb-8">
              Henüz sepetinize ürün eklemediniz. 
              Mağazamızı keşfetmek için alışverişe başlayın.
            </p>
            <div className="space-y-4">
              <Link
                href="/shop"
                className="inline-flex items-center bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Alışverişe Başla
              </Link>
              <br />
              <Link
                href="/"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Ana sayfaya dön
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">
              Sepetim ({itemCount} Ürün)
            </h1>
            <Link
              href="/shop"
              className="inline-flex items-center text-gray-600 hover:text-black transition-colors mt-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Alışverişe Devam Et
            </Link>
          </div>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 transition-colors text-sm"
          >
            Sepeti Temizle
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-2xl">👕</span>
                    </div>
                  </div>
                    
                  {/* Product Info */}
                  <div className="flex-1">
                    <Link 
                      href={`/product/${item.slug}`}
                      className="block hover:text-gray-600"
                    >
                      <h3 className="font-semibold text-lg text-black mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 capitalize">
                        {item.category}
                      </p>
                    </Link>
                    <p className="font-bold text-lg text-black">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Ürünü Kaldır"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-gray-600">
                    {item.quantity} x {formatPrice(item.price)}
                  </span>
                  <span className="font-bold text-lg">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-xl font-bold text-black mb-6">
                Sipariş Özeti
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Ara Toplam ({itemCount} ürün)</span>
                  <span>{formatPrice(total)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>
                    Kargo
                    {shippingCost === 0 && (
                      <span className="text-green-600 text-sm ml-1">(Ücretsiz)</span>
                    )}
                  </span>
                  <span>{shippingCost === 0 ? 'Ücretsiz' : formatPrice(shippingCost)}</span>
                </div>

                {shippingCost > 0 && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    {formatPrice(150 - total)} daha harcayın, kargo ücretsiz!
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-black">
                  <span>Toplam</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-5 w-5" />
                <span>Satın Al</span>
              </button>

              {/* Security & Info */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span>🔒</span>
                  <span>Güvenli ödeme</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🚚</span>
                  <span>Hızlı teslimat (1-3 iş günü)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>↩️</span>
                  <span>30 gün ücretsiz iade</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">
                  Kabul edilen ödeme yöntemleri:
                </p>
                <div className="flex space-x-2">
                  <div className="w-10 h-6 bg-gray-200 rounded text-xs flex items-center justify-center">
                    💳
                  </div>
                  <div className="w-10 h-6 bg-gray-200 rounded text-xs flex items-center justify-center">
                    🏦
                  </div>
                  <div className="w-10 h-6 bg-gray-200 rounded text-xs flex items-center justify-center">
                    📱
                  </div>
                </div>
              </div>
            </div>
          </div>
