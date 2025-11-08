'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Dummy form submission - gerçek uygulamada API call yapılır
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
    
    // Form'u temizle
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center py-20 px-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-4">
            Mesajınız Gönderildi!
          </h1>
          <p className="text-gray-600 mb-8">
            Teşekkür ederiz! Mesajınızı aldık ve en kısa sürede size dönüş yapacağız. 
            Genellikle 24 saat içinde yanıtlıyoruz.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium"
            >
              Yeni Mesaj Gönder
            </button>
            <Link
              href="/"
              className="block text-gray-600 hover:text-black transition-colors"
            >
              Ana sayfaya dön
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              İletişim
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçin. 
              Size yardımcı olmaktan mutluluk duyarız.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-black mb-6">
                İletişim Bilgileri
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">E-posta</h3>
                    <p className="text-gray-600">info@mann.com.tr</p>
                    <p className="text-gray-600">destek@mann.com.tr</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Telefon</h3>
                    <p className="text-gray-600">+90 212 555 0123</p>
                    <p className="text-gray-600 text-sm">Pzt-Cum: 09:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Adres</h3>
                    <p className="text-gray-600">
                      Maslak Mahallesi<br />
                      Büyükdere Caddesi No: 123<br />
                      Şişli, İstanbul 34485
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">
                Çalışma Saatleri
              </h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Pazartesi - Cuma</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Cumartesi</span>
                  <span>10:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Pazar</span>
                                    <span>Pazar</span>
                  <span>Kapalı</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">
                Hızlı Erişim
              </h3>
              <div className="space-y-2">
                <a href="/faq" className="block text-gray-600 hover:text-black transition-colors">
                  Sık Sorulan Sorular
                </a>
                <a href="/shipping" className="block text-gray-600 hover:text-black transition-colors">
                  Kargo & Teslimat
                </a>
                <a href="/returns" className="block text-gray-600 hover:text-black transition-colors">
                  İade & Değişim
                </a>
                <a href="/size-guide" className="block text-gray-600 hover:text-black transition-colors">
                  Beden Rehberi
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Bize Mesaj Gönderin
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                      İsim Soyisim *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black transition-colors"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black transition-colors"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                    Konu *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="">Konu seçin...</option>
                    <option value="order">Sipariş ile İlgili</option>
                    <option value="product">Ürün Bilgisi</option>
                    <option value="shipping">Kargo & Teslimat</option>
                    <option value="return">İade & Değişim</option>
                    <option value="technical">Teknik Destek</option>
                    <option value="feedback">Öneri & Şikayet</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                    Mesajınız *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <div className="text-sm text-gray-600">
                  <p>
                    * işaretli alanlar zorunludur. Kişisel verileriniz 
                    <a href="/privacy" className="text-black hover:underline ml-1">
                      Gizlilik Politikamız
                    </a> kapsamında işlenir.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Mesajı Gönder</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-black mb-8 text-center">
            Bizi Ziyaret Edin
          </h2>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg">Harita Entegrasyonu</p>
              <p className="text-sm">Google Maps yakında eklenecek</p>
            </div>
                        </div>
          </div>
        </div>
      </div>
    </div>
  )
}
