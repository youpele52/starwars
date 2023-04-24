import React, { ReactNode } from "react"

interface Props<T> {
  icon: ReactNode
  data: T
}
export default function Card<T>({ icon, data }: Props<T>) {
  return (
    <div id="card">
      <div className="icon">{icon}</div>
      <div className="data">
        <>{data}</>
      </div>
    </div>
  )
}
