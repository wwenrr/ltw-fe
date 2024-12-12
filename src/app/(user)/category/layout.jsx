import { headers, cookies } from "next/headers"
import { redirect } from "next/navigation";

export const metadata = {
    title: "Danh Mục Truyện.", 
    description: "Web Novel.",
    icons: {
        icon: "/img/logo.png", 
        shortcut: "/img/logo.png", 
        apple: "/img/logo.png", 
    },
};

export default async function RootLayout({ children }) {
  return (
    <>
        {children}
    </>
  )
}
