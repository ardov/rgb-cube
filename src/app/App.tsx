import React, { useState } from 'react'
import { useControls } from 'leva'
import './reset.scss'
import './styles.scss'
import { Matrix } from '../lib/Matrix'
import { useDragRotation } from '../lib/useDragRotation'
import { Canvas } from './Canvas'
import { GradientLine } from './GradientLine'

const initialMatrix = new Matrix()
const fromTop = new Matrix().rotateY(-45).rotateX(-35)
const onCorner = new Matrix().rotateY(-45).rotateX(55)

export default function App() {
  const { bits, opacity } = useControls('Cube', {
    bits: { value: 8, min: 1, max: 8, step: 1 },
    opacity: { value: 1, min: 0, max: 1, step: 0.1 },
  })
  const { showGradient, color1, color2 } = useControls('Gradient', {
    showGradient: { label: 'Visible', value: true },
    color1: { r: 0, g: 0, b: 0 },
    color2: { r: 255, g: 255, b: 255 },
  })

  const { sceneRef, matrix, setMatrix } = useDragRotation(initialMatrix)
  const [transition, setTransition] = useState(0)

  const withTransition = (fn: () => void) => () => {
    setTransition(500)
    setTimeout(() => setTransition(0), 500)
    fn()
  }

  const reset = withTransition(() => setMatrix(initialMatrix))
  const rotate = withTransition(() => setMatrix(m => m.rotateY(45)))
  const putOnCorner = withTransition(() => setMatrix(onCorner))
  const viewFromTop = withTransition(() => setMatrix(fromTop))

  return (
    <div className="App">
      <div className="controlls">
        <button onClick={putOnCorner}>On corner</button>
        <button onClick={viewFromTop}>From white</button>
        <button onClick={rotate}>Rotate</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div className="scene" ref={sceneRef}>
        <div
          className="cube"
          style={{
            transform: matrix.toCss(),
            transition: `transform ${transition}ms`,
          }}
        >
          {showGradient && <GradientLine from={color1} to={color2} />}

          <Canvas
            className="face x"
            height={256}
            width={256}
            r={0}
            g="y"
            b="-x"
            bits={bits}
            opacity={opacity}
            style={{ '--r': '0px' } as React.CSSProperties}
          />
          <Canvas
            className="face x"
            height={256}
            width={256}
            r={255}
            g="y"
            b="-x"
            bits={bits}
            opacity={opacity}
            style={{ '--r': '255px' } as React.CSSProperties}
          />
          <Canvas
            className="face y"
            height={256}
            width={256}
            r="-y"
            g={0}
            b="-x"
            bits={bits}
            opacity={opacity}
            style={{ '--g': 0 + 'px' } as React.CSSProperties}
          />
          <Canvas
            className="face y"
            height={256}
            width={256}
            r="-y"
            g={255}
            b="-x"
            bits={bits}
            opacity={opacity}
            style={{ '--g': 255 + 'px' } as React.CSSProperties}
          />
          <Canvas
            className="face z"
            height={256}
            width={256}
            r="y"
            g="-x"
            b={0}
            bits={bits}
            opacity={opacity}
            style={{ '--b': 0 + 'px' } as React.CSSProperties}
          />
          <Canvas
            className="face z"
            height={256}
            width={256}
            r="y"
            g="-x"
            b={255}
            bits={bits}
            opacity={opacity}
            style={{ '--b': 255 + 'px' } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  )
}
