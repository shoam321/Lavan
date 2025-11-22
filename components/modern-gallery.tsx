'use client'

import React, { useEffect, useRef, useState } from 'react'
import './gallery.css'

interface GalleryImage {
  id?: string | number
  src: string
  title?: string
  subtitle?: string
}

interface ModernGalleryProps {
  images?: GalleryImage[]
  autoplay?: boolean
}

export default function ModernGallery({ images = [], autoplay = true }: ModernGalleryProps) {
  const items = images
  const containerRef = useRef<HTMLDivElement>(null)
  const tilesRef = useRef<(HTMLElement | null)[]>([])
  const rafRef = useRef<number | null>(null)
  const [active, setActive] = useState(0)
  const pauseUntil = useRef(0)
  const [isAutoplay, setIsAutoplay] = useState(Boolean(autoplay))

  // Compute transforms (horizontal on wide screens)
  function updateTransforms() {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const horizontal = window.innerWidth >= 900
    const center = horizontal ? rect.left + rect.width / 2 : rect.top + rect.height / 2
    const size = horizontal ? rect.width : rect.height

    let best = { idx: 0, dist: Infinity }
    tilesRef.current.forEach((tile, i) => {
      if (!tile) return
      const r = tile.getBoundingClientRect()
      const tileCenter = horizontal ? r.left + r.width / 2 : r.top + r.height / 2
      const norm = (tileCenter - center) / size
      const abs = Math.min(Math.abs(norm), 1)

      if (horizontal) {
        const rotate = -norm * 12
        const tx = -norm * 18
        const sc = 1 - abs * 0.12
        tile.style.transform = `perspective(900px) translateX(${tx}px) rotateY(${rotate}deg) scale(${sc})`
      } else {
        const ty = norm * 22
        const sc = 1 - abs * 0.08
        tile.style.transform = `translateY(${ty}px) scale(${sc})`
      }
      tile.style.opacity = String(1 - Math.min(abs * 0.28, 0.9))
      tile.style.zIndex = String(Math.round((1 - abs) * 100))

      const img = tile.querySelector('img')
      if (img) {
        const imgScale = 1 + Math.max(0.06 * (1 - abs), 0)
        if (horizontal) img.style.transform = `scale(${imgScale}) translateY(${norm * 8}px)`
        else img.style.transform = `translateY(${norm * 14}px) scale(${imgScale})`
      }

      const d = Math.abs(tileCenter - center)
      if (d < best.dist) best = { idx: i, dist: d }
    })

    if (best.idx !== active) setActive(best.idx)
  }

  function schedule() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      updateTransforms()
      rafRef.current = null
    })
  }

  useEffect(() => {
    schedule()
    const onResize = () => schedule()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // autoplay
  useEffect(() => {
    if (!isAutoplay) return
    const id = setInterval(() => {
      if (Date.now() < pauseUntil.current) return
      const next = (active + 1) % items.length
      scrollToIndex(next)
    }, 3600)
    return () => clearInterval(id)
  }, [isAutoplay, active, items.length])

  // scroll to center item (works vert/horiz)
  function scrollToIndex(i: number, smooth = true) {
    const container = containerRef.current
    const tile = tilesRef.current[i]
    if (!container || !tile) return
    const tileRect = tile.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    if (window.innerWidth >= 900) {
      const current = container.scrollLeft
      const target = current + (tileRect.left + tileRect.width / 2) - (containerRect.left + container.clientWidth / 2)
      container.scrollTo({ left: target, behavior: smooth ? 'smooth' : 'auto' })
    } else {
      const current = container.scrollTop
      const target = current + (tileRect.top + tileRect.height / 2) - (containerRect.top + container.clientHeight / 2)
      container.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'auto' })
    }
    pauseUntil.current = Date.now() + 1600
    schedule()
  }

  // get closest index to center
  function getClosestIndex() {
    const container = containerRef.current
    if (!container) return 0
    const rect = container.getBoundingClientRect()
    const horizontal = window.innerWidth >= 900
    const center = horizontal ? rect.left + rect.width / 2 : rect.top + rect.height / 2
    let min = Infinity, idx = 0
    tilesRef.current.forEach((t, i) => {
      if (!t) return
      const r = t.getBoundingClientRect()
      const tileCenter = horizontal ? r.left + r.width / 2 : r.top + r.height / 2
      const d = Math.abs(tileCenter - center)
      if (d < min) { min = d; idx = i }
    })
    return idx
  }

  // pointer drag + keyboard + scroll sync
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let down = false
    let start = 0
    let startScroll = 0
    const onDown = (e: PointerEvent) => {
      down = true
      start = window.innerWidth >= 900 ? e.clientX : e.clientY
      startScroll = window.innerWidth >= 900 ? container.scrollLeft : container.scrollTop
      container.setPointerCapture?.(e.pointerId)
      pauseUntil.current = Date.now() + 1200
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      const curr = window.innerWidth >= 900 ? e.clientX : e.clientY
      const delta = start - curr
      if (window.innerWidth >= 900) container.scrollLeft = startScroll + delta
      else container.scrollTop = startScroll + delta
      schedule()
    }
    const onUp = (e: PointerEvent) => {
      down = false
      try { container.releasePointerCapture?.(e.pointerId) } catch {}
      const idx = getClosestIndex()
      scrollToIndex(idx, true)
    }
    const onScroll = () => schedule()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') scrollToIndex(Math.min(items.length - 1, active + 1))
      if (e.key === 'ArrowLeft') scrollToIndex(Math.max(0, active - 1))
      if (e.key === 'ArrowDown') scrollToIndex(Math.min(items.length - 1, active + 1))
      if (e.key === 'ArrowUp') scrollToIndex(Math.max(0, active - 1))
    }

    container.addEventListener('pointerdown', onDown as EventListener)
    container.addEventListener('pointermove', onMove as EventListener)
    container.addEventListener('pointerup', onUp as EventListener)
    container.addEventListener('pointercancel', onUp as EventListener)
    container.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey as EventListener)

    return () => {
      container.removeEventListener('pointerdown', onDown as EventListener)
      container.removeEventListener('pointermove', onMove as EventListener)
      container.removeEventListener('pointerup', onUp as EventListener)
      container.removeEventListener('pointercancel', onUp as EventListener)
      container.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey as EventListener)
    }
  }, [active, items.length])

  // initial center
  useEffect(() => {
    setTimeout(() => scrollToIndex(0, false), 60)
  }, [])

  if (!items || items.length === 0) return null

  return (
    <div className="mg-root" aria-label="Image gallery">
      <div className="mg-top">
        <button className="mg-btn" onClick={() => setIsAutoplay(v => !v)} aria-hidden> </button>
        <div className="mg-counter"><strong>{String(active + 1).padStart(2, '0')}</strong> / {String(items.length).padStart(2, '0')}</div>
        <button className="mg-play" onClick={() => { setIsAutoplay((v) => !v); pauseUntil.current = Date.now() + 800 }}>
          {isAutoplay ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="mg-tiles" ref={containerRef} tabIndex={0}>
        {items.map((it, i) => (
          <article
            key={it.id || i}
            ref={(el) => {
              if (el) tilesRef.current[i] = el
            }}
            className={`mg-tile ${i === active ? 'active' : ''}`}
            onClick={() => scrollToIndex(i)}
            role="listitem"
            aria-label={it.title}
          >
            <div className="mg-media">
              <img src={it.src} alt={it.title || ''} loading="lazy" onError={(e) => { e.currentTarget.style.filter = 'grayscale(30%)'; }} />
              <div className="mg-gradient" aria-hidden="true" />
            </div>

            <div className="mg-footer">
              <div className="mg-meta">
                <div className="mg-title">{it.title}</div>
                {it.subtitle && <div className="mg-sub">{it.subtitle}</div>}
              </div>
              <div className="mg-actions">
                <button className="mg-icon" onClick={(e) => { e.stopPropagation(); window.open(it.src, '_blank') }} aria-label="Open image">⤓</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mg-bottom">
        <div className="mg-dots" role="tablist" aria-label="Gallery position">
          {items.map((_, i) => (
            <button key={i} className={`mg-dot ${i === active ? 'on' : ''}`} onClick={() => scrollToIndex(i)} aria-pressed={i === active} aria-label={`Go to ${i+1}`} />
          ))}
        </div>

        <div className="mg-thumbs">
          {items.map((it, i) => (
            <button
              key={it.id || i}
              className={`mg-thumb ${i === active ? 'active' : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={it.title || ''}
              type="button"
            >
              <img src={it.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
