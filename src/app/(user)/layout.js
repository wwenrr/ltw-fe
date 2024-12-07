import { headers, cookies } from "next/headers"
import { redirect } from "next/navigation";
import Image from 'next/image'
import '@/assessts/styles/globalStyle.scss'

export default async function RootLayout({ children }) {
    const headerlist = headers()
    const cookieStore = await cookies();
    const token = await cookieStore.get("token");

    if(!token)
        redirect('/login')

    return (
        <>
          <header>
            <div className="logo">
              <Image
                src={"/img/logo.png"}
                alt="Logo"
                width={50} 
                height={50}
              />
            </div>

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