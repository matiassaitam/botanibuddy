import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">About BotaniBuddy</h1>
        <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
          <p className="text-green-700 mb-4">
            BotaniBuddy is your AI-powered plant identification companion. Our mission is to help plant enthusiasts,
            gardeners, and nature lovers quickly and accurately identify plants using cutting-edge artificial intelligence.
          </p>
          <p className="text-green-700 mb-4">
            Simply upload a photo of any plant, and our advanced AI, powered by Google's Gemini API, will analyze the image
            and provide you with detailed information about the plant, including its common name, scientific name, care
            instructions, and interesting facts.
          </p>
          <p className="text-green-700 mb-4">
            But we don't stop there! BotaniBuddy also generates unique, AI-created artwork inspired by the identified plant,
            giving you a beautiful visual representation to accompany the information.
          </p>
          <p className="text-green-700">
            Whether you're a seasoned botanist or just starting your plant journey, BotaniBuddy is here to help you
            learn more about the fascinating world of plants. Happy plant identifying!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}