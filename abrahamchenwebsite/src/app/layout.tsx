import './globals.css'

export const metadata = {
  title: 'Abraham Chen | Developer',
  description: 'Personal website for Abraham Chen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
