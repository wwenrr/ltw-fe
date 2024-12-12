'use client'

import { getBook } from "@/assessts/function/fetch";
import { redirect } from "next/navigation";
import Image from 'next/image'
import Next from "@/assessts/component/home/Next";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function Waiting() {
    const repeatItems = Array(20).fill({});

    return(
        <>
            {repeatItems.map((_, index) => {
                return(
                    <a key={index} 
                        className="content skeleton"
                        title="{item.name}"
                    >
                    <div className="img_warp"
                    style={{
                        overflow: 'hidden'
                    }}  
                        >
                            <img
                                className="skeleton"
                                width='100%' 
                                height={150} 
                                style={{
                                    borderRadius: '5px',
                                    objectFit: 'cover',
                                    transition: "transform 0.6s ease"
                                }}
                            />
                        </div>
                    </a>
                )
            })}
        </>
    )
}

function Content({data}) {
    return(
        <>
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
                })
                : <h2>Bạn Ơi Chưa Có Truyện Gì Để Đọc</h2>
            }
        </>
    )
}

export default function Page({ params }) {
    const token = Cookies.get('token');
    const [data, setData] = useState(null)
    const [off, setOff] = useState(0)
    const [loading, setLoading] = useState(true)

    async function loadData(of) {
        setLoading(true)
        try {
            const res = await getBook(token,null, of)
            setData(res.message)
        } catch(e) {
            redirect('/')
        }
        setLoading(false)
    }

    async function changePage(action) {
        setLoading(true)
        try {
            if(action === 'next') {
                const res = await getBook(token, null, off+1)
                if(res.message === false) throw new Error("Không Có Nội Dung")
                setOff(prev => prev + 1)
                setData(res.message)
            } else if(action === 'prev') {
                const res = await getBook(token, null, off-1)
                if(res.message === false) throw new Error("Không Có Nội Dung")
                setOff(prev => prev - 1)
                setData(res.message)
            }
        } catch(e) {
            alert(e.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadData(off)
    }, [])

    useEffect(() => {
        if(off > 0)
            document.title = `Trang ${off}`
        else {
            document.title = `Trang Chủ`
        }
    }, [off])

    return (
        <>
            <h1 style={{
                display: 'flex',
                alignItems: 'center',
                gap: 15
            }}>
            <img src="https://cdn-icons-png.flaticon.com/128/18114/18114451.png" width={35} height={35} alt="" />
            Truyện Mới Cập Nhật</h1>

            <div className="content_box">
                {!loading ? <Content data={data} /> : <Waiting />}
            </div>

            <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                marginTop: 45
            }}>
                <Next off={off} setOff={setOff} changePage={changePage} loading={loading}/>
            </div> 
        </>
    )
}