import { headers, cookies } from "next/headers"
import { redirect } from "next/navigation";
import Image from 'next/image'
import '@/assessts/styles/globalStyle.scss'
import Link from "next/link";

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
                alignContent: 'center',
                gap: 8
              }}
            >
              <Image
                src={"/img/logo.png"}
                alt="Logo"
                width={50} 
                height={50}
              />

              <h1 style={{marginTop: 7}}>Web Novel</h1>
            </a>

            <nav>
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

          </footer>
        </>
    );
}