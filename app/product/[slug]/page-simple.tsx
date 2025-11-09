import { notFound } from 'next/navigation'
import products from '@/data/products.json'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.slug === params.slug)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-4">Slug: {params.slug}</p>
        <p className="text-2xl font-bold mb-4">{product.price} TRY</p>
        <p className="text-gray-700">{product.description}</p>
        <div className="mt-8">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-64 h-64 object-cover rounded"
          />
        </div>
      </div>
    </div>
  )
}
