"use client"

import { useState, useRef } from "react"
import Toast from "@/components/toast"
import RatingDialog from "@/components/rating-dialog"
import SocialButton from "@/components/social-button"
import GoogleReviews from "@/components/google-reviews"

export default function Home() {
  const [toastMessage, setToastMessage] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const ratingDialogRef = useRef<HTMLDialogElement>(null)

  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleRatingComplete = (avg: number) => {
    if (hasSubmitted) return
    setHasSubmitted(true)
    if (avg >= 4) {
      // Open Google review form directly in new tab
      window.open(
        "https://www.google.com/search?sca_esv=2d910e10f9e5456a&sxsrf=AE3TifPArvlJnTbAMZXkp4xasWA9D-VlMg:1763899836858&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-OVol2rWfC7DBmvEQ71yl5V0Q7NJC7xeESmynejBoqY7IZnhaR9gAvXnhqGJIJlQO6ShZ0iLd-QpFA32esRzNNHLH0YKo1-62uNQLiXitEFF38CyA%3D%3D&q=%D7%90%D7%95%D7%9C%D7%9E%D7%99+%D7%9C%D7%91%D7%9F+%D7%91%D7%99%D7%A7%D7%95%D7%A8%D7%95%D7%AA&sa=X&ved=2ahUKEwiV2sf5noiRAxWOQfEDHdBUHyQQ0bkNegQIIRAE&biw=1366&bih=607&dpr=1#lrd=0x151db0d03ede08cd:0x52957213cfa03afd,3,,,,",
        "_blank"
      )
      showToastMessage("תודה! הביקורה שלך תעזור לנו")
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: "סטודיו לבן",
      text: "ממליץ לבדוק את הסטודיו!",
      url: "https://lavan.co.il/",
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
    <main className="fixed inset-0 flex items-center justify-center" style={{direction: 'ltr'}}>
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 w-full h-full" 
        style={{
          backgroundImage: 'url(/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          zIndex: 0,
        }} 
      />
      
      {/* Content - Centered */}
      <div className="relative z-10" style={{direction: 'rtl'}}>
        {/* Card */}
        <div className="w-[min(420px,90vw)] overflow-hidden rounded-3xl shadow-2xl" style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          border: '2px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}>
        {/* Header */}
        <div className="px-[18px] py-6">
          <div className="flex flex-col items-center justify-center mb-3" style={{backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.3)'}}>
            <img src="/lavan-logo.svg" alt="Lavan Logo" className="h-16 sm:h-20 object-contain mb-2" />
            <p style={{margin: '0 0 6px 0', fontSize: '11px', fontWeight: '600', letterSpacing: '0.8px', color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.3)'}}>הבחירה הנכונה</p>
            <svg width="70" height="2" viewBox="0 0 70 2" style={{opacity: 0.8}}>
              <line x1="0" y1="1" x2="25" y2="1" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="4,3" />
              <line x1="45" y1="1" x2="70" y2="1" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="4,3" />
            </svg>
          </div>
          <h1 className="text-center font-bold text-2xl sm:text-3xl m-0 mb-2.5 tracking-wide" style={{color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.3)'}}>
            אולמי לבן
          </h1>
          <p className="text-center text-sm text-gray-600 opacity-90 m-0 mb-3.5">
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
        <div className="border-t border-white/20 px-3.5 py-3" style={{backgroundColor: 'rgba(255,255,255,0.05)'}}>
          <h3 className="text-center m-0 mb-2.5 text-sm font-semibold" style={{color: '#ffffff'}}>עקבו אחרינו</h3>
          <div className="grid grid-cols-4 gap-2.5">
            <SocialButton
              href="https://www.instagram.com/lavaneruim/"
              label="Instagram"
              style={{ background: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)" }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              }
            />
            <SocialButton
              href="https://www.facebook.com/p/%D7%90%D7%95%D7%9C%D7%9E%D7%99-%D7%9C%D7%91%D7%9F-100063862635937/?locale=he_IL"
              label="Facebook"
              className="bg-blue-600"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6" aria-hidden="true">
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.18 10.44 21.95v-7.01H8.08v-2.87h2.36V9.41c0-2.33 1.39-3.61 3.51-3.61.99 0 2.03.18 2.03.18v2.24h-1.15c-1.13 0-1.48.7-1.48 1.42v1.7h2.52l-.4 2.87h-2.12v7.01C18.34 21.18 22 17.09 22 12.07z" />
                </svg>
              }
            />
            <SocialButton
              href="https://www.tiktok.com/@lavan_events"
              label="TikTok"
              className="bg-black"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              }
            />
            <SocialButton
              href="https://wa.me/972548101622"
              label="WhatsApp"
              style={{ background: "#25D366" }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-3.5 py-2.5 text-center text-xs font-medium" style={{borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#ffffff'}}>
          DESIGNED FOR LAVAN ERUIM © {new Date().getFullYear()}
        </div>
        </div>
      </div>

      {/* Toast */}
      <Toast message={toastMessage} isVisible={showToast} />

      {/* Rating Dialog */}
      <RatingDialog ref={ratingDialogRef} onComplete={handleRatingComplete} />
    </main>
  )
}
