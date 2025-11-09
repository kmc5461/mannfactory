import Link from 'next/link'
import { Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-black tracking-tight mb-4 block">
              MÄNN
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Zamansız Minimal Giyim. Sürdürülebilir üretim anlayışıyla, 
              kaliteli ve minimal tasarımları hayatınıza taşıyoruz.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="mailto:info@mann.com.tr" 
                className="text-gray-600 hover:text-black transition-colors duration-200"
                aria-label="E-posta"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-4">
              Navigasyon
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop" 
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Mağaza
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-4">
              Müşteri Desteği
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/shipping" 
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Kargo Bilgileri
                </Link>
              </li>
              <li>
                <Link 
                  href="/returns" 
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  İade & Değişim
                </Link>
              </li>
              <li>
                <Link 
                  href="/size-guide" 
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Beden Rehberi
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  S.S.S
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="max-w-md">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-4">
              Bülten Aboneliği
            </h3>
            <p className="text-gray-600 mb-4">
              Yeni ürünler ve kampanyalardan haberdar olmak için e-posta adresinizi bırakın.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:border-black"
              />
              <button
                type="button"
                className="px-6 py-2 bg-black text-white text-sm font-medium rounded-r-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800 transition-colors duration-200"
              >
                Abone Ol
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 md:flex md:items-center md:justify-between">
          <div className="text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} MÄNN. Tüm hakları saklıdır.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link 
                href="/privacy" 
                className="hover:text-black transition-colors duration-200"
              >
                Gizlilik Politikası
              </Link>
              <Link 
                href="/terms" 
                className="hover:text-black transition-colors duration-200"
              >
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
