'use client'
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Cookies from "js-cookie"
import { addComment, getBook, getChaperFromBook, loadComment } from "@/assessts/function/fetch"
import Button from '@mui/material/Button';
import { ButtonBase, Input, useForkRef } from "@mui/material"
import { Public } from "@mui/icons-material"

function MyComment({token, book_id, loadData}) {
    const [loading, setLoading] = useState(false)

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const data = e.target.value
            
            setLoading(true)
            try {
                if(data.length < 5) throw new Error("Hơn 5 ký tự đi cu")
                const res = await addComment(token, book_id, data);
                await loadData()
            } catch(e) {
                alert(e.message)
            }
            setLoading(false)
        }
    };

    return(
        <div style={{
            marginTop: 50,
            border: '1px solid black',
            padding: 15
        }}>
            <h2 style={{color: '#C1BAA1'}}>Bình Luận Từ Tôi</h2>
            <Input variant="outlined"
                required
                disabled={loading}
                style={{
                    width: '100%',
                    paddingBottom: 50
                }}
                onKeyDown={handleKeyDown}
            > </Input> 
        </div>
    )
}

function LoadComment({data, prevOffset, nextOffset, loading}) {
    if(data)
        return(
            <>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 25,
                    marginTop: 50
                }}>
                    {data.map((item, index) => {
                        return(
                            <div key={index} style={{borderTop: '1px solid lightgray', paddingTop: 25, width: '70%'}}>
                                <h3 style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: '1.4rem'}}>
                                    <img width={20} height={20} src="https://cdn-icons-png.flaticon.com/128/456/456212.png" 
                        
                                    /> {item.username} <span style={{color: '#A6AEBF', fontSize: '0.8rem'}}> {item.cmt_date} </span>
                                </h3>

                                <div style={{marginTop: 15}}><span>{item.content}</span></div>
                        
                            </div>
                        )
                    }) 
                    }

                    <div style={{display: 'flex', justifyContent: 'center', gap: 45, marginTop: 45}}> 
                        <Button variant="outlined" disabled={loading} onClick={prevOffset}><img src="https://cdn-icons-png.flaticon.com/128/271/271220.png" width={25} height={25} alt="" /></Button>
                        <Button variant="outlined" disabled={loading} onClick={nextOffset}><img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" width={25} height={25} alt="" /></Button>
                    </div>
                </div>
            </>
        )
}

function Comment({token, book_id}) {
    const [data, setData] = useState(null)
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        setLoading(true)
        try {
            const res = await loadComment(token, book_id, offset)
            setData(res.message)
        } catch(e) {
            alert(e.message)
        }
        setLoading(false)
    }

    async function prevOffset() {
        setLoading(true)
        try {
            if(offset === 0)
                throw new Error("Hết nội dung rồi bạn ơi")
            const res = await loadComment(token, book_id, offset-1)
            if(!res.message || offset == 0)
                throw new Error("Hết nội dung rồi bạn ơi")
            setData(res.message)
            setOffset(prev => prev-1)
        } catch(e) {
            alert(e.message)
        }
        setLoading(false)
    }

    async function nextOffset() {
        setLoading(true)
        try {
            const res = await loadComment(token, book_id, offset+1)
            if(!res.message)
                throw new Error("Hết nội dung rồi bạn ơi")

            setData(res.message)
            setOffset(prev => prev+1)
        } catch(e) {
            alert(e.message)
        }
        setLoading(false)
    }

    return(
        <>
            <h1 style={{
                borderBottom: '1.5px solid gray',
                display: 'inline-block',
                paddingBottom: '5px',
                paddingRight: '30px'
            }}>Bình Luận</h1>

            <MyComment token={token} book_id={book_id}  loadData={loadData}/>
            <LoadComment data={data} loadData={loadData} prevOffset={prevOffset} nextOffset={nextOffset} loading={loading}/>
        </>
    )
}

export default function  BookFromId() {
    const token = Cookies.get('token')
    const [data, setData] = useState(null)
    const [chapter, setChapter] = useState(null)
    const path = usePathname() 
    const pathSegments = path.split('/');
    const book_id = pathSegments[pathSegments.length - 1]

    useEffect(() => {
        async function foo(book_id) {
            const res = await getBook(token, book_id)
            const chapter = await getChaperFromBook(token, book_id)
            let temp = chapter.message
            temp.sort((a, b) => a.chapter_num - b.chapter_num);

            setData(res.message[0])
            setChapter(temp)
        }

        

        foo(book_id)
    },[])

    useEffect(() => {
        console.log(data);
    }, [data])

    if(data)
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
                    <a
                        href = "/home"
                    >
                        <img src="https://cdn-icons-png.flaticon.com/128/1946/1946436.png" alt="home" 
                            width={25}
                            height={25}
                        />
                    </a>
                    &nbsp;
                    {data &&  `/ ${data.category} / ${data.name}`}
                </p>

                <div className="book">
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
                    </div>
                </div>

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

                <Comment token={token} book_id={book_id}/>
            </>
        )

    else {
        return(
            <>
                <p
                    style={{
                        padding: '5px 10px',   
                        display: 'flex',   
                        alignItems: 'center', 
                        fontSize: '1.5rem'
                    }}
                >
                    <a
                        href = "/home"
                    >
                        <img src="https://cdn-icons-png.flaticon.com/128/1946/1946436.png" alt="home" 
                            width={25}
                            height={25}
                        />
                    </a>
                    &nbsp;
                    loading...
                </p>
                <div className="book">
                    <img
                        width={350} 
                        height={450} 
                        style={{
                            borderRadius: '5px',
                            objectFit: 'cover',
                            transition: "transform 0.6s ease",
                            margin: 'auto',
                            boxShadow: '1px 4px 6px rgba(0, 0, 0, 0.8)'
                        }}
                        className="skeleton"
                    />

                    <div className="right">
                        <h1 className="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1> 
                        <div className="cate">
                            <div className="type">
                                <img src={"https://cdn-icons-png.flaticon.com/128/15379/15379922.png"} alt="" 
                                    width={25} 
                                    height={25} 
                                />

                                <span className="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>  
                            
                            <div className="type">
                                <img src="https://cdn-icons-png.flaticon.com/128/17844/17844614.png" alt="" 
                                    width={25} 
                                    height={25} 
                                />

                                <span className="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div> 

                            <div className="type">
                                <img src="https://cdn-icons-png.flaticon.com/128/709/709612.png" alt="" 
                                    width={25} 
                                    height={25} 
                                />

                                <span className="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div> 
                        </div>
                        <p style={{ fontSize: '1rem'}}> Author ID: <span className="skeleton" style={{ color: '#3795BD' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
                    </div>
                </div>
            </>
        )
    }
}