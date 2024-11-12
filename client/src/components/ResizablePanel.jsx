import React, {useState, useCallback} from 'react'

/**
 * @param {string} direction - The direction of the resize handle. Can be 'left', 'right', 'top', or 'bottom'
 * @param {number} initialWidth - The initial width of the resizable panel as a percentage
 * @param {number} initialHeight - The initial height of the resizable panel as a percentage
 * @param {string} className - The class names of the resizable panel
 * @param {string} resizeStyle - The class names of the resize handle
 * @returns
 */
const ResizablePanel = ({
  children,
  direction = 'right',
  initialWidth = 100,
  initialHeight = 100,
  className = "",
  resizeStyle = ""
}) => {
  const [dimensions, setDimensions] = useState({width: initialWidth, height: initialHeight})
  const [isDragging, setIsDragging] = useState(false)

  const isHorizontal = direction === 'left' || direction === 'right'
  const isVertical = direction === 'top' || direction === 'bottom'

  const startResize = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)

    const startX = e.clientX
    const startY = e.clientY
    const rect = e.currentTarget.parentElement.getBoundingClientRect()
    const parentRect = e.currentTarget.parentElement.parentElement.getBoundingClientRect()

    const onMouseMove = (e) => {
      if (isHorizontal) {
        const dx = e.clientX - startX
        const multiplier = direction === 'left' ? -1 : 1
        const containerWidth = parentRect.width
        const newWidth = rect.width + (dx * multiplier)
        const widthPercentage = (newWidth / containerWidth) * 100

        setDimensions(prev => ({
          ...prev,
          width: Math.min(Math.max(10, widthPercentage), 90) // keep between 10% and 90%
        }))
      }

      if (isVertical) {
        const dy = e.clientY - startY
        const multiplier = direction === 'top' ? -1 : 1
        const containerHeight = parentRect.height
        const newHeight = rect.height + (dy * multiplier)
        const heightPercentage = (newHeight / containerHeight) * 100

        setDimensions(prev => ({
          ...prev,
          height: Math.min(Math.max(10, heightPercentage), 90) // keep between 10% and 90%
        }))
      }
    }

    const onMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = 'default'
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.body.style.cursor = isHorizontal ? 'ew-resize' : 'ns-resize'
  }, [direction, isHorizontal])

  const getResizeHandleStyle = () => ({
    position: 'absolute',
    backgroundColor: isDragging ? '#666' : '#999',
    opacity: isDragging ? 1 : 0.3,
    transition: 'opacity 0.2s',
    zIndex: 10,
    ...(direction === 'left' && {
      left: 0,
      top: 0,
      width: '4px',
      height: '100%',
      cursor: 'ew-resize'
    }),
    ...(direction === 'right' && {
      right: 0,
      top: 0,
      width: '4px',
      height: '100%',
      cursor: 'ew-resize'
    }),
    ...(direction === 'top' && {
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      cursor: 'ns-resize'
    }),
    ...(direction === 'bottom' && {
      bottom: 0,
      left: 0,
      width: '100%',
      height: '4px',
      cursor: 'ns-resize'
    })
  })

  return (
    <div
      style={{
        position: 'relative',
        width: isHorizontal ? `${dimensions.width}%` : '100%',
        height: isVertical ? `${dimensions.height}%` : '100%',
        minWidth: '50px',
        minHeight: '50px'
      }}
      className={className}
    >
      <div className="w-full h-full overflow-auto">
        {children}
      </div>
      <div
        style={getResizeHandleStyle()}
        className={`${resizeStyle} hover:opacity-100`}
        onMouseDown={startResize}
      
      />
    </div>
  )
}

export default ResizablePanel