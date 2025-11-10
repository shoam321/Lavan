"use client"

import type React from "react"

import { forwardRef, useState } from "react"
import StarRating from "./star-rating"

interface RatingDialogProps {
  onComplete: (average: number) => void
}

const RatingDialog = forwardRef<HTMLDialogElement, RatingDialogProps>(({ onComplete }, ref) => {
  const [ratings, setRatings] = useState({
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const ratingValues = Object.values(ratings)
  const completedRatings = ratingValues.filter((n) => n > 0)

  const handleStarClick = (question: keyof typeof ratings, value: number) => {
    setRatings((prev) => ({ ...prev, [question]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (completedRatings.length < 5) {
      alert("נא לדרג את כל 5 השאלות")
      return
    }

    const average = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length

    setIsLoading(true)
    try {
      const response = await fetch("/api/send-rating-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ratings, average }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Email send error:", data.error)
        alert("אירעה שגיאה בשליחת הדעה")
        setIsLoading(false)
        return
      }

      console.log("[v0] Email sent successfully:", data)
    } catch (error) {
      console.error("[v0] Error sending email:", error)
      alert("אירעה שגיאה בשליחת הדעה")
      setIsLoading(false)
      return
    } 
    setIsLoading(false)

    if (ref && "current" in ref && ref.current?.open) {
      ref.current.close()
    }

    onComplete(average)
  }

  const questions = [
    "איך היית מדרג/ת את החוויה הכללית שלך אצלנו?",
    "איך היית מדרג/ת את איכות ההדרכה של המדריכים?",
    "איך היית מדרג/ת את רמת השירות והיחס שקיבלת?",
    "איך היית מדרג/ת את האווירה והניקיון במתחם?",
    "באיזו מידה היית ממליץ/ה על הסטודיו לחבר או קולגה?",
  ]

  return (
    <dialog
      ref={ref}
      className="border-2 border-gray-900 rounded-2xl p-4 w-[min(92vw,720px)] shadow-2xl backdrop:bg-black/45 self-center"
    >
      <h3 className="m-0 mb-2.5 text-base font-bold">דעתכם חשובה לנו</h3>
      <p className="m-0 mb-2 text-sm text-gray-600">דרגו כל סעיף בין ⭐1 ל-⭐5</p>

      <form onSubmit={handleSubmit} className="space-y-2">
        {questions.map((question, idx) => {
          const qKey = `q${idx + 1}` as keyof typeof ratings
          return (
            <div key={qKey} className="grid gap-2 my-2].5 border border-gray-200 rounded-3xl p-2.5 bg-white">
              <label className="text-sm text-gray-600">{question}</label>
              <StarRating value={ratings[qKey]} onChange={(value) => handleStarClick(qKey, value)} />
            </div>
          )
        })}

        <div className="flex gap-2 flex-wrap mt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2.5 border-0 rounded-full px-4.5 py-3.5 font-bold bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "שולח..." : "שליחה"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (ref && "current" in ref) {
                ref.current?.close()
              }
            }}
            disabled={isLoading}
            className="flex items-center justify-center gap-2.5 border-0 rounded-full px-4.5 py-3.5 font-bold bg-white text-gray-900 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            סגירה
          </button>
        </div>
      </form>

      {completedRatings.length == 5 && <iframe src=""/>}
    </dialog>
  )
})

RatingDialog.displayName = "RatingDialog"

export default RatingDialog
