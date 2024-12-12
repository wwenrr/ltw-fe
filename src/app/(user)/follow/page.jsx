import { getBook, getFollowedBook } from "@/assessts/function/fetch";
import { redirect } from "next/navigation";
import { headers, cookies } from "next/headers"
import Image from 'next/image'
import Link from "next/link";

export default async function Page() {
    const headerlist = await headers()
    const cookieStore = await cookies();
    const token = await cookieStore.get("token");

    try {
        const res = await getFollowedBook(token.value, null)
        const data = res.message

        return (
            <>
                <h1 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15
                }}>
                <img src="https://cdn-icons-png.flaticon.com/128/18416/18416001.png" width={35} height={35} alt="" />
                Truyện Đang Theo Dõi</h1>
    
                <div className="content_box">
                    {data ?
                        data.map((item, index) => {
                            return <a key={index} 
                                        className="content"
                                        href={`/${item.id}`}
                                        title={item.name}
                                    >
                                    <div className="img_warp"
                                    style={{
                                        overflow: 'hidden'
                                    }}  
                                        >
                                            <img
                                                src={item.image_url}
                                                alt="Logo"
                                                width='100%' 
                                                height={150} 
                                                style={{
                                                    borderRadius: '5px',
                                                    objectFit: 'cover',
                                                    transition: "transform 0.6s ease"
                                                }}
                                            />
                                        </div>
    
                                        <h2>{item.name}</h2>
                                        <div className="box">
                                            <span>{item.category}</span>
    
                                            <div className="view">
                                                <span>{item.view}</span>
                                                <Image
                                                    src="/img/eye.png"
                                                    width={20}
                                                    height={20}
                                                    alt="view"
                                                    style={{
                                                        filter: 'invert(0.8)',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </a>
                        }) :
                        <h2 style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 35, width: '100%'}}>Không Có Truyện Nào Đang Theo Dõi <img src="https://cdn-icons-png.flaticon.com/128/10851/10851491.png" width={45} height={45} alt="" /></h2>
                    }
                </div> 
            </>
        )
    } catch(e) {
        console.log(e.message)
        // redirect('/login')
    }
}