import { useState, useEffect } from 'react'

export function PageTransition({ children, animation = 'fade' }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const animations = {
    fade: {
      animation: 'fadeIn 0.3s ease-in-out',
      animationFillMode: 'both'
    },
    slide: {
      animation: 'slideIn 0.4s ease-out',
      animationFillMode: 'both'
    },
    scale: {
      animation: 'scaleIn 0.3s ease-out',
      animationFillMode: 'both'
    }
  }

  return (
    <div style={{
      ...animations[animation],
      opacity: isVisible ? 1 : 0
    }}>
      {children}
    </div>
  )
}

export function CardTransition({ children, visible }) {
  return (
    <div style={{
      transition: 'all 0.3s ease-in-out',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)'
    }}>
      {children}
    </div>
  )
}

export function ButtonTransition({ children, loading }) {
  return (
    <div style={{
      transition: 'all 0.2s ease-in-out',
      transform: loading ? 'scale(0.95)' : 'scale(1)',
      opacity: loading ? 0.7 : 1
    }}>
      {children}
    </div>
  )
}

export function ListTransition({ children, index }) {
  return (
    <div style={{
      animation: `listIn 0.3s ease-out ${index * 0.05}s both`,
      transition: 'all 0.2s ease-in-out'
    }}>
      {children}
    </div>
  )
}
