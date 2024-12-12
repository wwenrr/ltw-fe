import { headers, cookies } from "next/headers"
import { redirect } from "next/navigation";
import Image from 'next/image'
import '@/assessts/styles/globalStyle.scss'
import Link from "next/link";

export const metadata = {
  title: "Trang chủ", 
  description: "Đây là trang chủ của ứng dụng.",
  keywords: ["Next.js", "Trang chủ", "Ứng dụng"],
  icons: {
        icon: "/img/logo.png", 
        shortcut: "/img/logo.png", 
        apple: "/img/logo.png", 
    },
};

export default async function RootLayout({ children }) {
    const headerlist = headers()
    const cookieStore = await cookies();
    const token = await cookieStore.get("token");

    if(!token)
        redirect('/login')

    return (
        <>
          <header>
            <a href="/home" className="logo"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 15
              }}
            >
              <Image
                src={"/img/logo.png"}
                alt="Logo"
                width={50} 
                height={50}
              />

              <h1 style={{fontSize: '2.6vw', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold'}}>Web Novel</h1>
            </a>

            <nav>
            <a href="/search" >
                <div>
                  <img src="https://cdn-icons-png.flaticon.com/128/954/954591.png" alt="" 
                      width={35}
                      height={35}
                      title="Truyện Theo Dõi"
                  />
                  <span>Tìm Kiếm</span>
                </div>
              </a>

              <a href="/category" >
                <div>
                  <img src="https://cdn-icons-png.flaticon.com/128/718/718970.png" alt="" 
                      width={35}
                      height={35}
                      title="Truyện Theo Dõi"
                  />
                  <span>Thể Loại</span>
                </div>
              </a>

              <a href="/follow" >
                <div>
                  <img src="https://cdn-icons-png.flaticon.com/128/3893/3893258.png" alt="" 
                      width={35}
                      height={35}
                      title="Truyện Theo Dõi"
                  />
                  <span>Theo Dõi</span>
                </div>
              </a>

              <a href="/account" >
                <div>
                  <img src="https://cdn-icons-png.flaticon.com/128/1077/1077012.png" alt="" 
                      width={35}
                      height={35}
                      title="Thông tin tài khoản"
                  />
                  <span>Tài Khoản</span>
                </div>
              </a>

              <a href="/login">
                <div>
                  <img src="https://cdn-icons-png.flaticon.com/128/992/992680.png" alt="" 
                      width={35}
                      height={35}
                      title="Đăng Xuất"
                  />
                </div>
              </a>
            </nav>
          </header>


          <section>
            {children}
          </section>

        <footer>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20
            }}>
              <Image src="/img/logo.png" alt="" width={50} height={50}/>
              <h3 style={{
                fontFamily: '"Indie Flower", cursive',
                fontSize: '2.5rem',
                fontWeight: '200'
              }}>WEBNOVEL</h3>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 20
            }}>
              <h3 style={{
                fontFamily: '"Caveat Brush", cursive',
                fontStyle: 'italic',
                textDecoration: 'underline'
              }}>Contacts:</h3>
                <div style={{
                  fontFamily: '"Indie Flower", cursive',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  Email: qscvdefb@gmail.com
                </div>
                <div style={{
                  fontFamily: '"Indie Flower", cursive',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  Phone: 113
                </div>
                <div style={{
                  fontFamily: '"Indie Flower", cursive',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  Address: abcxyz
                </div>
              </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 20
            }}>
              <h3 style={{
                fontFamily: '"Caveat Brush", cursive',
                fontStyle: 'italic',
                textDecoration: 'underline'
              }}>RESOURCES:</h3>
                <div style={{
                  fontFamily: '"Indie Flower", cursive',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  Be an Author
                </div>
                <div style={{
                  fontFamily: '"Indie Flower", cursive',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  Terms of Service
                </div>
                <div style={{
                  fontFamily: '"Indie Flower", cursive',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  Affiliate
                </div>
              </div>
        </footer>

        </>
    );
}