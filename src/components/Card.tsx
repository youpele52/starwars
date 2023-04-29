import React, { ReactNode } from "react";
import Link from "next/link";

interface Props<T> {
  icon: ReactNode;
  data: T;
  url: string;
}
export default function Card<T>({ icon, data, url }: Props<T>) {
  return (
    <Link href={url}>
      <div id="card">
        <div className="icon">{icon}</div>
        <div className="data">
          <>{data}</>
        </div>
      </div>
    </Link>
  );
}
