import Logo from "@/app/_components/Logo"
import Navigation from "@/app/_components/Navigation"
import "@/app/_styles/globals.css"
export const metadata = {
  // title: 'The wild oasis',
  title: {
    template: "%s / The wild oasis",
    default: "The wild oasis"
  },
  description: "Wild Oasis website for managing customer reservations"


}


// children is current page, similar to outlet
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-primary-100">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main> {children}  </main>
        <footer>footer of wild oasis</footer>
      </body>
    </html>
  )
}
