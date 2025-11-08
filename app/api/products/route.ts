import { NextRequest, NextResponse } from 'next/server'
import products from '@/data/products.json'

export interface Product {
  id: number
  title: string
  slug: string
  price: number
  currency: string
  image: string
  category: string
  description: string
}

// GET /api/products - Tüm ürünleri getir
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const search = url.searchParams.get('search')

    let filteredProducts = products as Product[]

    // Kategori filtresi
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Arama filtresi
    if (search) {
      const searchTerm = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        product => 
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length
    })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ürünler yüklenirken bir hata oluştu',
        data: []
      }, 
      { status: 500 }
    )
  }
}
