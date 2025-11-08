'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/app/api/products/route'
import { ShoppingBag, Heart, Share2, ArrowLeft, Star } from 'lucide-react'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const addItem = useCartStore((state) => state.addItem)

  // Beden seçenekleri
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        
        // Ürünleri getir ve slug'a göre filtrele
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('API error')
        
        const data = await response.json()
        const foundProduct = data.data.find((p: Product) => p.slug === params.slug)
        
        if (!foundProduct) {
          // Fallback: Local data kontrol et
          const localData = await import('@/data/products.json')
          const localProduct = localData.default.find((p: Product) => p.slug === params.slug)
          
          if (!localProduct) {
            notFound()
            return
          }
          setProduct(localProduct)
          
          // Benzer ürünleri bul (aynı kategori)
          const similar = localData.default
            .filter((p: Product) => p.category === localProduct.category && p.id !== localProduct.id)
            .slice(0, 4)
          setRelatedProducts(similar)
        } else {
          setProduct(foundProduct)
          
          // Benzer ürünleri bul (aynı kategori)
          const similar = data.data
            .filter((p: Product) => p.category === foundProduct.category && p.id !== foundProduct.id)
            .slice(0, 4)
          setRelatedProducts(similar)
        }
      } catch (error) {
        console.error('Ürün yüklenirken hata:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const handleAddToCart = () => {
    if (product) {
      // Mevcut sepet fonksiyonalitesi için ürünü olduğu gibi ekle
      // Gerçek uygulamada beden/adet bilgisini de saklayabilirsiniz
      for (let i = 0; i < quantity; i++) {
        addItem(product)
      }
    }
  }

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback: URL'yi clipboard'a kopyala
        await navigator.clipboard.writeText(window.location.href)
        alert('Ürün linki kopyalandı!')
      }
    } else {
      // Fallback: URL'yi clipboard'a kopyala
      await navigator.clipboard.writeText(window.location.href)
      alert('Ürün linki kopyalandı!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-black transition-colors">
            Ana Sayfa
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors">
            Mağaza
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-black transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-black">{product.title}</span>
        </nav>

        {/* Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Mağazaya Dön
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {!imageError ? (
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-4xl">👕</span>
                  </div>
                  <p className="text-lg">Görsel Yüklenemedi</p>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="bg-gray-100 text-black text-sm font-medium px-3 py-1 rounded-full capitalize">
                {product.category}
              </span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">(4.0)</span>
              </div>
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">{product.title}</h1>
              <p className="text-3xl font-bold text-black">{formatPrice(product.price)}</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Beden Seçimi
              </label>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Adet
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:border-black transition-colors"
                >
                  −
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:border-black transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Sepete Ekle - {formatPrice(product.price * quantity)}</span>
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 border py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center space-x-2 ${
                    isWishlisted
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Beğenildi' : 'Beğen'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex-1 border border-gray-300 py-3 px-6 rounded-md hover:border-black transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Paylaş</span>
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Ürün Özellikleri</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• %100 Premium pamuk</li>
                <li>• Sürdürülebilir üretim</li>
                <li>• Makine yıkanabilir</li>
                <li>• Türkiye&rsquo;de üretilmiştir</li>
                <li>• 30 gün içinde ücretsiz iade</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                Benzer Ürünler
              </h2>
              <Link
                href={`/shop?category=${product.category}`}
                className="text-black hover:underline font-medium"
              >
                Tümünü Gör →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
