import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-black tracking-tight mb-4 block">
            MÄNN
          </Link>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Zamansız Minimal Giyim. Sürdürülebilir üretim anlayışıyla, 
            kaliteli ve minimal tasarımları hayatınıza taşıyoruz.
          </p>
          <div className="flex justify-center space-x-8 mb-8">
            <Link href="/" className="text-gray-600 hover:text-black">Ana Sayfa</Link>
            <Link href="/shop" className="text-gray-600 hover:text-black">Mağaza</Link>
            <Link href="/about" className="text-gray-600 hover:text-black">Hakkımızda</Link>
            <Link href="/contact" className="text-gray-600 hover:text-black">İletişim</Link>
          </div>
          <div className="text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} MÄNN. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
