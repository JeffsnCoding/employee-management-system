import { useState, useEffect } from 'react'
import { breakpoints } from '../constants/breakpoints'

export function useBreakpoint() {
  const [screen, setScreen] = useState({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false
  })

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth
      setScreen({
        xs: width < breakpoints.sm,
        sm: width >= breakpoints.sm && width < breakpoints.md,
        md: width >= breakpoints.md && width < breakpoints.lg,
        lg: width >= breakpoints.lg && width < breakpoints.xl,
        xl: width >= breakpoints.xl && width < breakpoints.xxl,
        xxl: width >= breakpoints.xxl
      })
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  return screen
}

export function useIsMobile() {
  const screen = useBreakpoint()
  return screen.xs || screen.sm
}

export function useIsTablet() {
  const screen = useBreakpoint()
  return screen.md
}

export function useIsDesktop() {
  const screen = useBreakpoint()
  return screen.lg || screen.xl || screen.xxl
}

export function useScreenSize() {
  const screen = useBreakpoint()
  
  if (screen.xs) return 'xs'
  if (screen.sm) return 'sm'
  if (screen.md) return 'md'
  if (screen.lg) return 'lg'
  if (screen.xl) return 'xl'
  return 'xxl'
}
