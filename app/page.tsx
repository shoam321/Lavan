"use client"

import { useState, useRef } from "react"
import Toast from "@/components/toast"
import RatingDialog from "@/components/rating-dialog"
import SocialButton from "@/components/social-button"

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
      className="min-h-dvh flex items-center justify-center relative"
      dir="rtl"
      lang="he"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent z-0" />

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
          <div className="grid grid-cols-4 gap-2.5">
            <SocialButton
              href="https://www.instagram.com/dorelazulay/"
              label="Instagram"
              style={{ background: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)" }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zm6.4-.8a1.12 1.12 0 1 1-1.12-1.12A1.12 1.12 0 0 1 18.4 7.4zM12 10.4A1.6 1.6 0 1 1 10.4 12 1.6 1.6 0 0 1 12 10.4z" />
                </svg>
              }
            />
            <SocialButton
              href="https://www.facebook.com/share/1Vr3zZbWQt/?mibextid=wwXIfr"
              label="Facebook"
              className="bg-blue-600"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.18 10.44 21.95v-7.01H8.08v-2.87h2.36V9.41c0-2.33 1.39-3.61 3.51-3.61.99 0 2.03.18 2.03.18v2.24h-1.15c-1.13 0-1.48.7-1.48 1.42v1.7h2.52l-.4 2.87h-2.12v7.01C18.34 21.18 22 17.09 22 12.07z" />
                </svg>
              }
            />
            <SocialButton
              href="https://www.tiktok.com/@dorel_azulay?lang=he-IL"
              label="TikTok"
              className="bg-black"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M16.5 3.5h2.5v3.7A6 6 0 0 1 12 13v4a4 4 0 1 0 4-4v-6.5z" />
                </svg>
              }
            />
            <SocialButton
              href="https://wa.me/972XXXXXXXXX"
              label="WhatsApp"
              style={{ background: "#25D366" }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M20.52 3.48A11.92 11.92 0 0 0 12.02 1C6.48 1 2 5.48 2 11c0 1.95.51 3.77 1.4 5.35L2 23l6.87-1.42A10.96 10.96 0 0 0 12.02 23C17.56 23 22.02 18.52 22.02 13c0-1.6-.36-3.12-1-4.52zM12.02 20.5c-1.8 0-3.56-.47-5.07-1.36l-.36-.21-4.08.84.86-3.96-.23-.37A9.02 9.02 0 0 1 3 11c0-4.97 4.05-9 9.02-9 2.4 0 4.64.94 6.32 2.62A8.92 8.92 0 0 1 21.02 11c0 4.97-4.05 9.5-9 9.5zM16.08 14.13c-.26-.13-1.55-.76-1.79-.85-.24-.09-.42-.13-.6.13-.18.26-.72.85-.88 1.03-.16.18-.32.2-.58.07-.26-.13-1.1-.4-2.09-1.29-.77-.67-1.29-1.5-1.44-1.76-.16-.26-.02-.4.12-.53.12-.12.26-.32.39-.49.13-.16.17-.27.26-.45.09-.18.05-.34-.03-.47-.09-.13-.6-1.45-.82-1.99-.22-.52-.45-.45-.62-.46-.16-.01-.35-.01-.53-.01-.18 0-.47.07-.72.35-.24.28-.93.9-.93 2.2 0 1.3.95 2.56 1.08 2.74.12.18 1.86 2.86 4.52 3.89 1.06.45 1.88.72 2.52.92.84.27 1.61.23 2.22.14.68-.11 1.55-.63 1.77-1.24.22-.61.22-1.13.16-1.24-.06-.11-.23-.18-.49-.31z" />
                </svg>
              }
            />
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
