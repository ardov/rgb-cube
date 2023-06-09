export type Vec3 = [number, number, number]

export function substract([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3): Vec3 {
  return [x1 - x2, y1 - y2, z1 - z2]
}

export function distance([x, y, z]: Vec3) {
  return Math.sqrt(x * x + y * y + z * z)
}

export function normalize(v: Vec3): Vec3 {
  let d = distance(v)
  return [v[0] / d, v[1] / d, v[2] / d]
}

export function dot([x1, y1, z1]: Vec3, [x2, y2, z2]: Vec3) {
  return x1 * x2 + y1 * y2 + z1 * z2
}

export function cross([a1, a2, a3]: Vec3, [b1, b2, b3]: Vec3): Vec3 {
  return [a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1]
}
