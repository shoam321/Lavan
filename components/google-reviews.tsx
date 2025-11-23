"use client"

import { useEffect } from "react"

export default function GoogleReviews() {
  useEffect(() => {
    // Load the TrustIndex widget script
    if (window.tustindex === undefined) {
      const script = document.createElement("script")
      script.src = "https://cdn.trustindex.io/loader.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="w-full bg-white/95 rounded-2xl p-4 shadow-lg border border-gray-200">
      <h2 className="text-center font-bold text-xl mb-4 text-gray-900">ביקורות מ-Google</h2>
      
      {/* TrustIndex Widget Container */}
      <div
        className="trustindex-widget"
        data-businesstype="LocalBusiness"
        data-businessurl="https://www.google.com/search?q=%D7%90%D7%95%D7%9C%D7%9E%D7%99+%D7%9C%D7%91%D7%9F&sca_esv=2d910e10f9e5456a"
        data-locale="he"
        data-templateid="51fb59c4ab48b6002400001d"
        data-businessid="ChIJzQjePtCwHRUR_TqgzxNylVI"
        data-reviewsperpage="10"
        data-companyname="אולמי לבן"
      >
        <a href="https://www.trustindex.io/reviews/google/ChIJzQjePtCwHRUR_TqgzxNylVI" target="_blank" rel="noopener noreferrer">
          הצג ביקורות בgoogle
        </a>
      </div>
    </div>
  )
}
