# MÄNN E-TİCARET PLATFORMU

## 🚀 Proje Özeti
MÄNN markası için Next.js 14 + Tailwind CSS ile geliştirilmiş tam çalışır e-ticaret uygulaması.

## ✅ Tamamlanan Özellikler

### 📱 Sayfalar
- **Ana Sayfa (/)** - Hero, koleksiyonlar, öne çıkan ürünler
- **Mağaza (/shop)** - Filtreleme, arama, sıralama
- **Ürün Detay (/product/[slug])** - Beden seçimi, miktar, benzer ürünler  
- **Sepet (/cart)** - CRUD işlemler, toplam hesaplama
- **Hakkımızda (/about)** - Marka hikayesi, değerler
- **İletişim (/contact)** - Çalışan form + validation

### 🔧 Teknik Özellikler
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (responsive)
- **State Management:** Zustand + localStorage
- **Type Safety:** 100% TypeScript
- **Icons:** Lucide React
- **API:** REST endpoints (products, payment placeholder)

### 📊 Veri
- 8 çeşit ürün (gömlek, tişört, pantolon, vb.)
- JSON-based veri yapısı
- API filtreleme ve arama desteği

## 🎯 Özel Özellikler
- **🇹🇷 Türkçe İçerik** - Tüm metinler Türkçe
- **₺ TRY Para Birimi** - Türk Lirası formatı
- **📱 Mobile-First** - Responsive tasarım
- **🛒 Persistent Cart** - localStorage ile sepet saklama
- **🌱 Sürdürülebilirlik** - Çevre dostu marka hikayesi

## 🚀 Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Development server
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
