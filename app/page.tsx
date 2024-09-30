import ImageUpload from './components/ImageUpload'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          BotaniBuddy
        </h1>
        <p className="text-center text-green-700 mb-8">
          Your AI-powered plant identification companion
        </p>
        <ImageUpload />
      </main>
      <Footer />
    </div>
  )
}