'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface PlantInfo {
  result: string
  artImage: string
}

export default function Results() {
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/results')
        if (response.ok) {
          const data = await response.json()
          setPlantInfo(data)
        } else {
          setError('Failed to fetch results')
        }
      } catch (error) {
        setError('An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Plant Identification Results</h1>
        {loading ? (
          <p className="text-center text-green-700">Loading plant information...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : plantInfo ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <pre className="whitespace-pre-wrap text-green-700">{plantInfo.result}</pre>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4">AI-Generated Plant Art</h2>
              <Image
                src={`data:image/png;base64,${plantInfo.artImage}`}
                alt="AI-generated plant art"
                width={512}
                height={512}
                className="rounded-lg"
              />
              <p className="mt-4 text-green-700">This unique artwork was generated based on the identified plant.</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-green-700">No plant information available</p>
        )}
        <div className="mt-8 text-center">
          <Link href="/" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Identify Another Plant
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}