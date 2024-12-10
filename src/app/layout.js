import { headers, cookies } from "next/headers"
import { redirect } from "next/navigation";

export const metadata = {
    title: "Web Novel", 
    description: "Đây là trang chủ của ứng dụng.",
    icons: {
        icon: "/img/logo.png", 
        shortcut: "/img/logo.png", 
        apple: "/img/logo.png", 
    },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
        <body style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          maxHeight: '10000px',
          overflow: 'auto'
        }}>
            {children}
        </body>
    </html>
  )
}
