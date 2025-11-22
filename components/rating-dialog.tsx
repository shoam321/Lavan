"use client"

import type React from "react"

import { forwardRef, useState } from "react"

// Central business identifier (used in payload + UI + potential fallbacks)
const BUSINESS_NAME = "dorel-studio"
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

  // Helper: build enriched payload
  const buildPayload = (average: number) => {
    const starDisplay = (r: number) => '⭐'.repeat(r) + ` (${r}/5)`
    return {
      businessName: BUSINESS_NAME,
      ratings,
      ratingsStarDisplay: {
        overallExperience: starDisplay(ratings.q1),
        coachingQuality: starDisplay(ratings.q2),
        serviceLevel: starDisplay(ratings.q3),
        atmosphereCleanliness: starDisplay(ratings.q4),
        recommendationLikelihood: starDisplay(ratings.q5),
      },
      average: average.toFixed(1),
      averageStarDisplay: `⭐ ${average.toFixed(1)}/5 ${average >= 4 ? '🎉' : ''}`,
      timestamp: new Date().toISOString(),
      locale: typeof navigator !== 'undefined' ? navigator.language : 'he-IL',
      timezoneOffsetMinutes: new Date().getTimezoneOffset(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
    }
  }

  // Helper: retry logic for fetch
  const postWithRetry = async (url: string, options: RequestInit, retries = 2, delay = 800): Promise<Response> => {
    try {
      return await fetch(url, options)
    } catch (err) {
      if (retries <= 0) throw err
      await new Promise(r => setTimeout(r, delay))
      return postWithRetry(url, options, retries - 1, delay * 2)
    }
  }

  // Submit handler: primary to n8n webhook, fallback to Formspree if it fails
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (completedRatings.length < 5) {
      alert("נא לדרג את כל 5 השאלות")
      return
    }

    const average = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length
    const payload = buildPayload(average)

    setIsLoading(true)
    let n8nOk = false
    try {
      const WEBHOOK_URL = "https://shairouvinov78.app.n8n.cloud/webhook/submit-rating"
      const response = await postWithRetry(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        console.error("Webhook error status:", response.status)
      } else {
        n8nOk = true
        console.log("Sent to n8n successfully")
      }
    } catch (error) {
      console.error("Error sending to n8n after retries:", error)
    }

    // Optional secondary delivery to Formspree (only if n8n failed OR for redundancy)
    if (!n8nOk) {
      try {
        const formData = new FormData()
        formData.append('overall_experience', payload.ratingsStarDisplay.overallExperience)
        formData.append('coaching_quality', payload.ratingsStarDisplay.coachingQuality)
        formData.append('service_level', payload.ratingsStarDisplay.serviceLevel)
        formData.append('atmosphere_cleanliness', payload.ratingsStarDisplay.atmosphereCleanliness)
        formData.append('recommendation_likelihood', payload.ratingsStarDisplay.recommendationLikelihood)
        formData.append('average', payload.averageStarDisplay)
        formData.append('business_name', payload.businessName)
        formData.append('timestamp', payload.timestamp)
        formData.append('locale', payload.locale)
        formData.append('tz_offset_minutes', payload.timezoneOffsetMinutes.toString())
        formData.append('user_agent', payload.userAgent)
        await fetch('https://formspree.io/f/xdkbkoel', { method: 'POST', body: formData })
        console.log('Fallback sent to Formspree')
      } catch (err) {
        console.error('Fallback Formspree failed:', err)
      }
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
      <h3 className="m-0 mb-1.5 text-base font-bold">דעתכם חשובה לנו</h3>
      <p className="m-0 mb-2 text-[11px] tracking-wide text-gray-500 font-medium">{BUSINESS_NAME}</p>
      <p className="m-0 mb-2 text-sm text-gray-600">דרגו כל סעיף בין ⭐1 ל-⭐5</p>

      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Hidden business name for any non-JS / fallback capture */}
        <input type="hidden" name="businessName" value={BUSINESS_NAME} />
        {questions.map((question, idx) => {
          const qKey = `q${idx + 1}` as keyof typeof ratings
          return (
            <div key={qKey} className="grid gap-2 my-2].5 border border-gray-200 rounded-3xl p-2.5 bg-white">
              <label className="text-sm text-gray-600">{question}</label>
              <StarRating value={ratings[qKey]} onChange={(value) => handleStarClick(qKey, value)} />
              {/* Hidden inputs preserved if later you want progressive enhancement / fallback */}
              <input type="hidden" name={`rating_${qKey}`} value={ratings[qKey]} />
            </div>
          )
        })}
        
        {/* Formspree hidden fields no longer required for n8n; keep if you need dual delivery */}
        {/* <input type="hidden" name="average_rating" value={(ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1)} /> */}
        {/* <input type="hidden" name="studio_name" value="סטודיו דוראל אזולאי" /> */}
        {/* <input type="hidden" name="submission_date" value={new Date().toLocaleString("he-IL")} /> */}
        
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
