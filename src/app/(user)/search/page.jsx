'use client'

import { searchBook } from "@/assessts/function/fetch";
import { TextField, useScrollTrigger } from "@mui/material"
import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import Image from "next/image";

export default function Page() {
    const [data, setData] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false)
    const token = Cookies.get('token')

    useEffect(() => {
        document.title = "Tìm Kiếm"
    }, [])

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            setLoading(true)
            try {
                const res = await searchBook(token, searchTerm)
                setData(res.message)
            } catch(e) {
                alert(e.message)
            }
            setLoading(false)
        }
      };

    return(
        <>
            <h1 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15
                }}>
                <img src="https://cdn-icons-png.flaticon.com/128/1321/1321029.png" width={35} height={35} alt="" />

                <TextField 
                    disabled={loading}
                    placeholder="Tìm Kiếm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                >
                    Tìm Kiếm
                </TextField>
            </h1>

            {
                loading && 
                <> 
                    <div className="content_box skeleton">

                    </div>
                </>
            }

            <div className={loading ? "content_box skeleton" : "content_box"}>
                {!loading && data ?
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
                    : <h2>Không Có Kết Quả</h2>
                }
            </div>
        </>
    )
}