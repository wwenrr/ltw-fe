'use client'
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { checkFollowedBook, fetchCancelFollow, fetchFollow, getBook, getChaperFromBook, loadComment } from "@/assessts/function/fetch"
import Button from '@mui/material/Button';
import Comment from "./Comment"
import { CircularProgress } from "@mui/material"

function Following({token, book_id}) {
    const [follow, setFollow] = useState('-1')
    const [loading, setLoading] = useState(true)

    async function loadData() {
        try {
            const res = await checkFollowedBook(token, book_id);
            setFollow(res.message)
        } catch(e) {
            // alert(e.message)
        }
    }

    async function Onfollow() {
        setLoading(true)
        try {
            await fetchFollow(token, book_id);
            await loadData()
        } catch(e) {
            // alert(e.message)
        } 
        setLoading(false)
    }

    async function cancelFolow() {
        setLoading(true)
        try {
            await fetchCancelFollow(token, book_id);
            await loadData()
        } catch(e) {
            // alert(e.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        async function foo() {
            await loadData()
        }

        foo()
        setLoading(false)
    }, [])

    if(loading || follow === '-1')
        return(
            <>
                <Button disabled={true} style={{
                    marginTop: 35
                }} ><CircularProgress /></Button>
            </>
        )

    if(follow !== '-1') {
        if(!follow) {
            return(
                <>
                    <Button disabled={loading} style={{
                        marginTop: 35
                    }} onClick={Onfollow}>Theo Dõi</Button>
                </>
            )
        } else {
            return(
                <>
                    <Button disabled={loading} style={{
                        marginTop: 35
                    }} color="error" onClick={cancelFolow}>Hủy Theo Dõi</Button>
                </>
            )
        }
    }
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
            try {
                const res = await getBook(token, book_id)
                const chapter = await getChaperFromBook(token, book_id)

                let temp = chapter.message
                temp.sort((a, b) => a.chapter_num - b.chapter_num);

                setData(res.message[0])
                setChapter(temp)
            } catch(e) {
                console.log(e.message)
            }
        }

        foo(book_id)
    },[])

    useEffect(() => {
        if (data) {
            console.log(data)
            document.title = data.name;
        }
    }, [data]);

    useEffect(() => {
        console.log(data);
    }, [data])

    if(data && book_id)
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
                    
                    {data &&  
                        <>
                            /&nbsp;<a style={{color: 'blue'}} href={`/category/${data.category}`}>{data.category}</a>&nbsp; /&nbsp;{data.name}
                        </>
                    }
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

                        <Following token={token} book_id={book_id}>Theo Dõi</Following>
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