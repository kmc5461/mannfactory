export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl text-gray-600">
              MÄNN olarak zamansız minimal giyimin gücüne inanıyoruz.
            </p>
          </div>
        </div>
      </div>
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-black mb-6">Hikayemiz</h2>
            <p className="text-gray-600 mb-4">
              2024 yılında modern erkeğin giyim ihtiyaçları için kurulduk.
            </p>
            <p className="text-gray-600 mb-4">
              Minimal tasarım ve premium kalite odaklı çalışıyoruz.
            </p>
            <p className="text-gray-600">
              Türkiye&rsquo;de sürdürülebilir üretim yapıyoruz.
            </p>
          </div>
        </div>
      </div>
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-8">Değerlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Sürdürülebilirlik</h3>
              <p className="text-gray-600">Çevre dostu üretim</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Kalite</h3>
              <p className="text-gray-600">Premium materyaller</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Minimalizm</h3>
              <p className="text-gray-600">Zamansız tasarım</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
