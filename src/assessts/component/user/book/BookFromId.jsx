'use client'
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Cookies from "js-cookie"
import { getBook, getChaperFromBook } from "@/assessts/function/fetch"
import Button from '@mui/material/Button';
import { ButtonBase } from "@mui/material"

export default function BookFromId() {
    const [data, setData] = useState(null)
    const [chapter, setChapter] = useState(null)
    const path = usePathname() 

    useEffect(() => {
        async function foo(book_id) {
            const token = Cookies.get('token')
            const res = await getBook(token, book_id)
            const chapter = await getChaperFromBook(token, book_id)
            let temp = chapter.message
            temp.sort((a, b) => a.chapter_num - b.chapter_num);

            setData(res.message[0])
            setChapter(temp)
        }

        const pathSegments = path.split('/');
        const book_id = pathSegments[pathSegments.length - 1]

        foo(book_id)
    },[])

    useEffect(() => {
        console.log(chapter);
    }, [chapter])

    return (
        <>
            <p
                style={{
                    padding: '5px 10px',   
                    display: 'flex',   
                    alignItems: 'center', 
                    fontSize: '1.5rem'
                }}
            >
                <Link
                    href = "/home"
                >
                    <img src="https://cdn-icons-png.flaticon.com/128/1946/1946436.png" alt="home" 
                        width={25}
                        height={25}
                    />
                </Link>
                &nbsp;
                {data &&  `/ ${data.category} / ${data.name}`}
            </p>
            {data && <div className="book">
                <img
                    src={data.image_url}
                    alt="Logo"
                    width={350} 
                    height={450} 
                    style={{
                        borderRadius: '5px',
                        objectFit: 'cover',
                        transition: "transform 0.6s ease",
                        margin: 'auto',
                        boxShadow: '1px 4px 6px rgba(0, 0, 0, 0.8)'
                    }}
                />

                <div className="right">
                    <h1>{data.name}</h1> 
                    <div className="cate">
                        <div className="type">
                            <img src={"https://cdn-icons-png.flaticon.com/128/15379/15379922.png"} alt="" 
                                width={25} 
                                height={25} 
                            />

                            <span>{data.category}</span>
                        </div>  
                        
                        <div className="type">
                            <img src="https://cdn-icons-png.flaticon.com/128/17844/17844614.png" alt="" 
                                width={25} 
                                height={25} 
                            />

                            <span>{chapter.length} Chapters</span>
                        </div> 

                        <div className="type">
                            <img src="https://cdn-icons-png.flaticon.com/128/709/709612.png" alt="" 
                                width={25} 
                                height={25} 
                            />

                            <span>{data.view} Views</span>
                        </div> 
                    </div>
                    <p style={{ fontSize: '1rem'}}> Author ID: <span style={{ color: '#3795BD' }}>{data.publisher_id}</span></p>

                    <div style={{
                        marginTop: '20%',
                        display: 'flex'
                    }}>
                        <Button size="medium" 
                            sx={{
                                fontSize: '1.6rem',
                                zIndex: 0
                            }}
                        variant="contained">Đọc Từ Đầu</Button>
                        <Button 
                            size="medium"
                            sx={{
                                ml: 5,
                                fontSize: '1.6rem'
                            }}
                        variant="contained">Đọc Mới Nhất</Button>
                    </div>
                </div>
            </div>
            }

            {chapter && 
                <>
                    <h1 style={{
                        marginTop: '60px',
                        borderBottom: '1.5px solid gray',
                        display: 'inline-block',
                        paddingBottom: '5px',
                        paddingRight: '30px'
                    }}>Mục Lục</h1>

                    <div className="table_of_content">
                        {chapter.map((item, index) => {
                            return(
                                <a href={`${path}/${item.chapter_num}`} key={index}>
                                    <div>
                                        <span>{item.chapter_num}</span>
                                    </div>
                                    <div>
                                        <p>{item.chapter_name === '' ? `Chapter ${item.chapter_num}` : item.chapter_name}</p>

                                        <p style={{
                                            fontSize: '0.7rem',
                                            color: '#4A4947',
                                            marginTop: '20px'
                                        }}>Price: <b>{item.price}</b> VNĐ</p>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </>
            }
        </>
    )
}