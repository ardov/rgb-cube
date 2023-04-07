import React from 'react'
import { Vec3, cross, distance, normalize, substract } from '../lib/vectors'

type GradientLineProps = {
  from: { r: number; g: number; b: number }
  to: { r: number; g: number; b: number }
}

export function GradientLine(props: GradientLineProps) {
  const { from, to } = props
  const v1: Vec3 = [from.b, from.r, from.g]
  const v2: Vec3 = [to.b, to.r, to.g]
  const mx = getMatrixForLine(v1, v2)
  const length = distance(substract(v1, v2))

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d',
        width: length,
        height: 10,
        background: `linear-gradient(to right, rgb(${from.r},${from.g},${from.b}), rgb(${to.r},${to.g},${to.b}))`,
        transform: `translateZ(${-256 / 2}px) translateY(${
          256 - 5
        }px) matrix3d(${mx.join(',')})`,
        borderRadius: 8,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'inherit',
          transform: `rotateX(90deg)`,
          borderRadius: 'inherit',
        }}
      />
    </div>
  )

  function getMatrixForLine(a: Vec3, b: Vec3) {
    const vec = substract(b, a)
    const xDir = normalize(vec)
    const zDir = normalize([-xDir[1], xDir[0], -xDir[2]])
    const yDir = normalize(cross(xDir, zDir))
    // prettier-ignore
    return [
      xDir[0], -xDir[1], xDir[2], 0,
      yDir[0], -yDir[1], yDir[2], 0,
      zDir[0], -zDir[1], zDir[2], 0,
      a[0], -a[1], a[2], 1,
    ];
  }
}
