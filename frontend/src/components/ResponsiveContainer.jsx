import { useIsMobile, useIsTablet, useIsDesktop } from '../hooks/useBreakpoint'

export function PageContainer({ children, style }) {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()

  const containerStyle = {
    padding: isMobile ? '12px' : isTablet ? '16px' : '24px',
    maxWidth: isMobile ? '100%' : '1200px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 120px)',
    ...style
  }

  return (
    <div style={containerStyle}>
      {children}
    </div>
  )
}

export function CardContainer({ children, style }) {
  const isMobile = useIsMobile()

  const containerStyle = {
    marginBottom: isMobile ? 12 : 16,
    ...style
  }

  return (
    <div style={containerStyle}>
      {children}
    </div>
  )
}

export function ResponsiveGrid({ children, gutter }) {
  const isMobile = useIsMobile()

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: gutter || (isMobile ? 12 : 16)
  }

  return (
    <div style={gridStyle}>
      {children}
    </div>
  )
}
