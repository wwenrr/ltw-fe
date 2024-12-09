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
              <div className="browse">
                <div className="logo">
                  <Image
                    src={"/img/compass.png"}
                    alt="Logo"
                    width={25} 
                    height={25} 
                    style={{
                      filter: 'sepia(100%) saturate(400%) brightness(60%) contrast(70%)',
                    }}
                  />
                </div>
                <div className="span">
                  Browse
                </div>
              </div>

              <div className="browse">
                <div className="logo">
                  <Image
                    src={"/img/compass.png"}
                    alt="Logo"
                    width={25} 
                    height={25} 
                  />
                </div>
                <div className="span">
                  Browse
                </div>
              </div>

              <Link href="/account" className="browse">
                <div className="logo">
                  <img src="https://cdn-icons-png.flaticon.com/128/18525/18525601.png" alt="" 
                      width={35}
                      height={35}
                  />
                </div>
              </Link>
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