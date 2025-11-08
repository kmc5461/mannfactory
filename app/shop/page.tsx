'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/app/api/products/route'
import { Search, Filter, X } from 'lucide-react'

function ShopContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  
  const searchParams = useSearchParams()

  // Kategoriler listesi
  const categories = [
    { value: 'all', label: 'Tüm Ürünler' },
    { value: 'gömlek', label: 'Gömlek' },
    { value: 'tişört', label: 'Tişört' },
    { value: 'pantolon', label: 'Pantolon' },
    { value: 'sweatshirt', label: 'Sweatshirt' },
    { value: 'ceket', label: 'Ceket' },
    { value: 'ayakkabı', label: 'Ayakkabı' },
    { value: 'kazak', label: 'Kazak' }
  ]

  // Sıralama seçenekleri
  const sortOptions = [
    { value: 'name', label: 'İsme Göre (A-Z)' },
    { value: 'price-low', label: 'Fiyat (Düşük-Yüksek)' },
    { value: 'price-high', label: 'Fiyat (Yüksek-Düşük)' },
    { value: 'newest', label: 'Yeni Gelenler' }
  ]

  // Ürünleri getir
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('API error')
        
        const data = await response.json()
        setProducts(data.data)
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error)
        // Fallback: Local data kullan
        import('@/data/products.json').then(data => {
          setProducts(data.default)
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // URL parametrelerinden kategori al
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  // Filtreleme ve sıralama
  useEffect(() => {
    let filtered = [...products]

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Arama filtresi
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      )
    }

    // Sıralama
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title, 'tr'))
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        // ID'ye göre sırala (yeni ürünlerin ID'si daha büyük varsayımıyla)
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchTerm, sortBy])

  const clearFilters = () => {
    setSelectedCategory('all')
    setSearchTerm('')
    setSortBy('name')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Mağaza
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Zamansız minimal giyim koleksiyonumuzu keşfedin. 
              Kaliteli malzemeler ve sürdürülebilir üretim anlayışı.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filtreler */}
          <aside className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              {/* Mobile filter toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-between w-full px-4 py-2 bg-black text-white rounded-md"
                >
                  <span className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtreler
                  </span>
                  <span>{showFilters ? '−' : '+'}</span>
                </button>
              </div>

              <div className={`space-y-6 ${showFilters || 'lg:block hidden'}`}>
                {/* Arama */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Arama
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Ürün ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Kategori
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.value} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.value}
                          checked={selectedCategory === category.value}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {category.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sıralama */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Sıralama
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtreleri Temizle */}
                {(selectedCategory !== 'all' || searchTerm || sortBy !== 'name') && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Filtreleri Temizle
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <p className="text-gray-600 mb-4 sm:mb-0">
                {loading ? (
                  'Ürünler yükleniyor...'
                ) : (
                  `${filteredProducts.length} ürün bulundu`
                )}
              </p>
              
              {/* Quick sort for mobile */}
              <div className="sm:hidden">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ürün Bulunamadı
                </h3>
                <p className="text-gray-600 mb-4">
                  Arama kriterlerinize uygun ürün bulunamadı.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Mağaza yükleniyor...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
