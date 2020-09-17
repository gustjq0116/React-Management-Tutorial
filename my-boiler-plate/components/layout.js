import Head from 'next/head'
import Menu from './menu'

export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {

  return (
    <div>
        <Head></Head>
        <header> 
            <Menu />
        </header>
        <main>{children}</main>
        <footer></footer>
    </div>
  )
}
