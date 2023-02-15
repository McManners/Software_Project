import { useRef, useEffect } from 'react'

const useCanvas = (draw, options={}) => {
  
  const canvasRef = useRef(null)
  const postdraw = () => {
    index++
    ctx.restore()
   }

   const predraw = (context, canvas) => {
    context.save()
    resizeCanvasToDisplaySize(context, canvas)
    const { width, height } = context.canvas
    context.clearRect(0, 0, width, height)
  }

  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext(options.context || '2d')
    let frameCount = 0
    let animationFrameId
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  return canvasRef
}

export default useCanvas