import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "./api/products/route";

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    // Build time'da API çağrısı yapılamaz, direkt local data kullan
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
      const products = await import('@/data/products.json');
      return products.default.slice(0, 6);
    }
    
    // Runtime'da API'yi dene, başarısızsa local data'ya fallback
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`);
    if (!response.ok) {
      throw new Error('API not available');
    }
    const data = await response.json();
    return data.data.slice(0, 6);
  } catch {
    // Fallback: Local data kullan
    const products = await import('@/data/products.json');
    return products.default.slice(0, 6);
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              MÄNN
              <br />
              <span className="text-2xl md:text-3xl font-normal text-gray-600">
                Zamansız Minimal Giyim
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Kaliteli malzemeler ve sürdürülebilir üretim anlayışıyla tasarlanan, 
              zamansız erkek giyim koleksiyonumuzu keşfedin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Koleksiyonu Keşfet
              </Link>
              <Link
                href="/about"
                className="border border-black text-black px-8 py-3 rounded-md hover:bg-black hover:text-white transition-colors duration-200 font-medium"
              >
                Hikayemiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Öne Çıkan Koleksiyonlar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Her sezon için tasarlanan, minimal ve kaliteli parçalarımızı keşfedin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Collection 1 */}
            <div className="relative group cursor-pointer overflow-hidden rounded-lg">
              <div className="aspect-[4/5] bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">👔</div>
                  <h3 className="text-xl font-medium">Formal Koleksiyon</h3>
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  href="/shop?category=ceket"
                  className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Koleksiyonu Gör
                </Link>
              </div>
            </div>

            {/* Collection 2 */}
            <div className="relative group cursor-pointer overflow-hidden rounded-lg">
              <div className="aspect-[4/5] bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">👕</div>
                  <h3 className="text-xl font-medium">Casual Koleksiyon</h3>
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  href="/shop?category=tişört"
                  className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Koleksiyonu Gör
                </Link>
              </div>
            </div>

            {/* Collection 3 */}
            <div className="relative group cursor-pointer overflow-hidden rounded-lg">
              <div className="aspect-[4/5] bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">👖</div>
                  <h3 className="text-xl font-medium">Pantolon Koleksiyon</h3>
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  href="/shop?category=pantolon"
                  className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Koleksiyonu Gör
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Yeni Gelenler
            </h2>
            <Link
              href="/shop"
              className="text-black hover:underline font-medium"
            >
              Tümünü Gör →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                priority={index < 3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Yeniliklerden İlk Siz Haberdar Olun
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Yeni ürünler, özel kampanyalar ve marka haberlerini e-posta adresinize gönderelim.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:border-black"
            />
            <button className="bg-black text-white px-6 py-3 rounded-r-md hover:bg-gray-800 transition-colors duration-200">
              Abone Ol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
