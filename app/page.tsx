"use client"

import { useState, useRef } from "react"
import Toast from "@/components/toast"
import RatingDialog from "@/components/rating-dialog"

export default function Home() {
  const [toastMessage, setToastMessage] = useState("")
  const [showToast, setShowToast] = useState(false)
  const ratingDialogRef = useRef<HTMLDialogElement>(null)

  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleRatingComplete = (avg: number) => {
    showToastMessage("תודה רבה, דעתך חשובה לנו")
    if (avg > 4) {
      setTimeout(() => {
        window.location.href = "https://search.google.com/local/writereview?placeid=ChIJZ2KSBii7HRURMTKVTdJGT8w"
      }, 1000)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: "סטודיו דוראל אזולאי",
      text: "ממליץ לבדוק את הסטודיו!",
      url: "https://dorelazulay.co.il/?fbclid=PAZXh0bgNhZW0CMTEAAaZlRCLmopF17q5inc4w2-ZZ6aBuzcf2BE8Jk_rh0GRn6ciQW5Y2vpF1ISw_aem_eeCSzS95UJc1hSvBD5Q6Dg",
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (e) {
        // User cancelled share
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url)
        showToastMessage("הקישור הועתק 🙂")
      } catch (e) {
        showToastMessage("לא הצלחתי להעתיק, אפשר להעתיק ידנית.")
      }
    } else {
      showToastMessage("הדפדפן לא תומך בשיתוף. העתק/י את הכתובת מהשורת כתובת.")
    }
  }

  return (
    <main
      className="min-h-dvh flex items-center justify-center relative bg-cover bg-center site-bg"
      dir="rtl"
      lang="he"
    >
      {/* Clickable background link (fills the viewport) */}
      <a
        href="https://dorelazulay.co.il"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open site"
        className="absolute inset-0 z-0 site-bg-link"
      />

      {/* Background overlay (non-blocking so clicks reach the link) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent z-0 pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-[min(420px,92vw)] bg-white/92 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-[18px] py-6">
          <h1 className="text-center font-bold text-2xl sm:text-3xl m-0 mb-2.5 text-gray-900 tracking-wide">
            סטודיו דוראל אזולאי
          </h1>
          <p className="text-center text-sm text-gray-600 opacity-90 m-0 mb-3.5">
            אימון אישי וקבוצות — תוצאות שמרגישים
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid gap-2.5 px-4 pb-3.5 sm:grid-cols-2">
          <button
            onClick={() => ratingDialogRef.current?.showModal()}
            className="flex items-center justify-center gap-2.5 border-0 rounded-full px-4.5 py-3.5 font-bold bg-gradient-to-br from-gray-900 to-gray-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150"
          >
            ⭐ דרגו אותנו!
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2.5 border-0 rounded-full px-4.5 py-3.5 font-bold bg-white text-gray-900 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150"
          >
            💖 ספרו לחבר
          </button>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-200 bg-gray-50 px-3.5 py-3">
          <h3 className="text-center m-0 mb-2.5 text-sm text-gray-600">עקבו אחרינו</h3>
          <div className="grid grid-cols-3 gap-2.5">
            <a
              href="https://www.instagram.com/dorelazulay/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center py-3 px-3.5 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-shadow"
              style={{
                background: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
              }}
            >
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/share/1Vr3zZbWQt/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex items-center justify-center py-3 px-3.5 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-shadow bg-blue-600"
            >
              <span>Facebook</span>
            </a>
            <a
              href="https://www.tiktok.com/@dorel_azulay?lang=he-IL"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex items-center justify-center py-3 px-3.5 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-shadow bg-black"
            >
              <span>TikTok</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-3.5 py-2.5 text-center text-xs text-gray-600 bg-gray-100">
          © {new Date().getFullYear()} סטודיו דוראל אזולאי
        </div>
      </div>

      {/* Toast */}
      <Toast message={toastMessage} isVisible={showToast} />

      {/* Rating Dialog */}
      <RatingDialog ref={ratingDialogRef} onComplete={handleRatingComplete} />
    </main>
  )
}
