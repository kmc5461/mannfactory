'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'
import { Product } from '@/app/api/products/route'
import { ShoppingBag, Eye } from 'lucide-react'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-gray-100 relative">
          {!imageError ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority={priority}
              className={`object-cover transition-transform duration-300 ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xl">👕</span>
                </div>
                <p className="text-sm">Görsel Yüklenemedi</p>
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex space-x-3">
              <button
                onClick={handleAddToCart}
                className="bg-white text-black p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                aria-label="Sepete Ekle"
              >
                <ShoppingBag className="h-5 w-5" />
              </button>
              <Link
                href={`/product/${product.slug}`}
                className="bg-white text-black p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                aria-label="Detayları Gör"
              >
                <Eye className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white text-black text-xs font-medium px-2 py-1 rounded-full capitalize">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-black transition-colors duration-200">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-black">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </Link>

      {/* Mobile Add to Cart Button */}
      <div className="md:hidden p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Sepete Ekle</span>
        </button>
      </div>
    </div>
  )
}
