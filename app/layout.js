import Header from "@/app/_components/Header";
import Logo from "@/app/_components/Logo"
import Navigation from "@/app/_components/Navigation"
import "@/app/_styles/globals.css"
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  display: "swap",
  subsets: ["latin"],
})
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
      <body className={`flex flex-col bg-primary-950 text-primary-100 min-h-screen  ${josefin.className}`}>
        <Header />
        <div className=" px-8 py-12 grid flex-1">

          <main className="max-w-7xl mx-auto w-full" > {children}  </main>
        </div>
      </body>
    </html>
  )
}
