"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ReviewPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const reviewData = {
      name: formData.get('name'),
      email: formData.get('email'),
      rating: formData.get('rating'),
      comment: formData.get('comment'),
      timestamp: new Date().toISOString(),
    }

    try {
      await fetch("https://shairouvinov78.app.n8n.cloud/webhook/submit-rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      })
      
      // Success - redirect back
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-center">
          <h1 className="text-3xl font-bold text-white m-0 mb-2">אנחנו מעריכים את התמיכה שלך!</h1>
          <p className="text-blue-100 m-0">השאר לנו ביקורה ועזור לנו להשתפר</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                שם מלא *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="הכנס/י את השם שלך"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                אימייל *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="הכנס/י את האימייל שלך"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            {/* Rating Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                דירוג *
              </label>
              <select
                name="rating"
                required
                defaultValue=""
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              >
                <option value="">בחרו דירוג</option>
                <option value="5">⭐⭐⭐⭐⭐ מעולה</option>
                <option value="4">⭐⭐⭐⭐ טוב מאוד</option>
                <option value="3">⭐⭐⭐ טוב</option>
                <option value="2">⭐⭐ בסדר</option>
                <option value="1">⭐ לא טוב</option>
              </select>
            </div>

            {/* Comment Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                הביקורה שלך (לא חובה)
              </label>
              <textarea
                name="comment"
                placeholder="כתבו את הערותיכם כאן... אנחנו מעוניינים לשמוע את דעתכם!"
                rows={6}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-full transition-all text-lg"
              >
                {isSubmitting ? "שולח..." : "שליחת הביקורה"}
              </button>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-4 rounded-full transition-all text-lg"
              >
                ביטול
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            הביקורה שלך תעזור לנו להשתפר ולספק שירות טוב יותר
          </p>
        </div>
      </div>
    </main>
  )
}
