import Link from 'next/link'
import { Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
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

          {/* Navigation */}
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
