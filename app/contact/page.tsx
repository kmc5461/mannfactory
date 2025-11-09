'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-black mb-4">Mesajınız Gönderildi!</h2>
          <p className="text-gray-600 mb-8">24 saat içinde dönüş yapacağız.</p>
          <Link href="/" className="bg-black text-white px-8 py-3 rounded-md">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">İletişim</h1>
            <p className="text-gray-600">Sorularınız için bize ulaşın.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-black mb-6">Bize Ulaşın</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-black mb-2">📧 E-posta</h3>
                  <p className="text-gray-600">info@mann.com.tr</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">📞 Telefon</h3>
                  <p className="text-gray-600">+90 212 555 0123</p>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">📍 Adres</h3>
                  <p className="text-gray-600">
                    Levent Mahallesi<br />
                    Büyükdere Caddesi No: 123<br />
                    Şişli, İstanbul
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">🕒 Çalışma Saatleri</h3>
                  <p className="text-gray-600">
                    Pazartesi - Cuma: 09:00 - 18:00<br />
                    Cumartesi: 10:00 - 16:00<br />
                    Pazar: Kapalı
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-black mb-6">Mesaj Gönderin</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Konu
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  >
                    <option value="">Bir konu seçin</option>
                    <option value="genel">Genel Bilgi</option>
                    <option value="siparis">Sipariş Durumu</option>
                    <option value="iade">İade/Değişim</option>
                    <option value="urun">Ürün Bilgisi</option>
                    <option value="diğer">Diğer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
                >
                  Mesaj Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
