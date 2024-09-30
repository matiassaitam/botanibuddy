'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface HistoryItem {
  id: string
  plantName: string
  date: string
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const mockHistory: HistoryItem[] = [
      { id: '1', plantName: 'Monstera Deliciosa', date: '2024-03-15' },
      { id: '2', plantName: 'Fiddle Leaf Fig', date: '2024-03-14' },
      { id: '3', plantName: 'Snake Plant', date: '2024-03-13' },
    ]
    setHistory(mockHistory)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Identification History</h1>
        <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
          {history.length > 0 ? (
            <ul className="divide-y divide-green-200">
              {history.map((item) => (
                <li key={item.id} className="py-4">
                  <p className="text-lg font-semibold text-green-700">{item.plantName}</p>
                  <p className="text-sm text-green-500">{item.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-green-700">No identification history available</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}