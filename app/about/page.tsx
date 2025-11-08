import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              MÄNN olarak, zamansız minimal giyimin gücüne inanıyoruz. 
              Her parça, kalite ve sürdürülebilirlik değerlerimizle tasarlanır.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Hikayemiz
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  2024 yılında, modern erkeğin değişen yaşam tarzına uygun, 
                  kaliteli ve zamansız giyim parçaları yaratma vizyonuyla kurulduk. 
                  MÄNN, sadece bir moda markası değil; bir yaşam felsefesidir.
                </p>
                <p>
                  Minimalizmin gücüne inanarak, her tasarımımızı özenle seçilmiş 
                  detaylar ve premium materyallerle hayata geçiriyoruz. Amacımız, 
                  gardırobunuzda uzun yıllar kalacak, her kombinle uyum sağlayan 
                  parçalar sunmaktır.
                </p>
                <p>
                  Türkiye'de ürettiğimiz her ürün, çevreye saygılı üretim 
                  süreçlerinden geçer ve sürdürülebilir moda anlayışımızın 
                  bir yansımasıdır.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">👥</div>
                  <p className="text-lg">Ekip Fotoğrafı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Değerlerimiz
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              MÄNN olarak benimsediğimiz değerler, her ürünümüzde ve hizmetimizde kendini gösterir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Sürdürülebilirlik
              </h3>
              <p className="text-gray-600">
                Çevre dostu üretim süreçleri ve geri dönüştürülebilir materyallerle 
                geleceğe saygılı moda üretiyoruz.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Kalite
              </h3>
              <p className="text-gray-600">
                Premium materyaller ve titiz işçilikle, uzun ömürlü ve konforlu 
                giyim parçaları yaratıyoruz.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Minimalizm
              </h3>
              <p className="text-gray-600">
                Gereksiz detaylardan arınmış, zamansız tasarımlarla 
                sadeliğin gücünü yansıtıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🌍</div>
                  <p className="text-lg">Sürdürülebilir Üretim</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Sürdürülebilir Gelecek
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Moda endüstrisinin çevresel etkisini azaltmak için sorumluluğumuzu 
                  ciddiye alıyoruz. Üretim süreçlerimizde su tasarrufu, enerji 
                  verimliliği ve atık azaltma önceliklerimizdir.
                </p>
                
                <h3 className="text-xl font-semibold text-black mt-6 mb-3">
                  Taahhütlerimiz:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    %100 organik pamuk kullanımı
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Su bazlı boyalar ve çevre dostu kimyasallar
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Geri dönüştürülebilir ambalajlar
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Yerel tedarik zinciri ile karbon ayak izini azaltma
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Adil ticaret ve etik üretim koşulları
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Ekibimiz
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              MÄNN&rsquo;ın arkasındaki yaratıcı ve tutkulu ekibimizle tanışın.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍💼</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-1">
                Ahmet Yılmaz
              </h3>
              <p className="text-gray-600 text-sm mb-2">Kurucu & CEO</p>
              <p className="text-gray-600 text-xs">
                15 yıllık moda endüstrisi deneyimi
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
                          <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-1">
                Elif Kaya
              </h3>
              <p className="text-gray-600 text-sm mb-2">Tasarım Direktörü</p>
              <p className="text-gray-600 text-xs">
                Minimal tasarım uzmanı
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍🔬</span>
              </div>
              <h3 className="text-lg font-semibold text-black mb-1">
                Can Demir
              </h3>
              <p className="text-gray-600 text-sm mb-2">Sürdürülebilirlik Uzmanı</p>
              <p className="text-gray-600 text-xs">
                Çevre mühendisi & sürdürülebilir üretim
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            MÄNN Ailesine Katılın
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Zamansız minimal giyim deneyimini keşfetmek ve sürdürülebilir moda 
            hareketinin bir parçası olmak için koleksiyonumuzu inceleyin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
            >
              Koleksiyonu Keşfet
            </Link>
            <Link
              href="/contact"
              className="border border-black text-black px-8 py-3 rounded-md hover:bg-black hover:text-white transition-colors font-medium"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
