// import '@/styles/globals.css'
import '@/styles/global.scss'
import '@/styles/home.scss'
import '@/styles/SearchBar.scss'
import '@/styles/Card.scss'
import '@/styles/SearchableFields.scss'
import '@/styles/Detail.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
