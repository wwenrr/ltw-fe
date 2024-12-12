'use client'
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getBookWithCategory } from "@/assessts/function/fetch";
import Image from "next/image";

export default function Page() {
    const path = usePathname() 
    const pathSegments = path.split('/');
    const cate = decodeURIComponent(pathSegments[pathSegments.length - 1])
    const token = Cookies.get('token')

    const [data, setData] = useState(null)

    async function loadData() {
        try {
            const res = await getBookWithCategory(token, cate)
            setData(res.message)
        } catch(e) {
            // alert(e.message)
        }
    }

    useEffect(() => {
        document.title = `Thể Loại: ${cate}`
    }, [cate])

    useEffect(() => {
        loadData()
    }, [])

    if(data == false) {
        return(
            <>
                <h1 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15
                }}>
                <img src="https://cdn-icons-png.flaticon.com/128/11514/11514503.png" width={35} height={35} alt="" />
                Thể Loại: {cate}</h1>

                <div className="content_box">
                    <h2>Không tìm thấy truyện</h2>
                </div>
            </>
        )
    }

    if(data == null) {
        return(
            <>
                <h1 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15
                }}>
                <img src="https://cdn-icons-png.flaticon.com/128/11514/11514503.png" width={35} height={35} alt="" />
                Thể Loại: {cate}</h1>

                <div className="content_box skeleton"></div>
            </>
        )
    }

    return(
        <>
            <h1 style={{
                display: 'flex',
                alignItems: 'center',
                gap: 15
            }}>
            <img src="https://cdn-icons-png.flaticon.com/128/11514/11514503.png" width={35} height={35} alt="" />
            Thể Loại: {cate}</h1>

            <div className="content_box">
                {
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
                    })
                }
            </div>
        </>
    )
}