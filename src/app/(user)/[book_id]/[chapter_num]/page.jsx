'use client'
import { getChaperFromBook, getChaperFromBookWithChapterNum } from "@/assessts/function/fetch"
import { redirect, usePathname } from "next/navigation"
import React, { useEffect, useState, useRef } from "react"
import Cookies from "js-cookie"
import Link from "next/link"
import { CircularProgress } from "@mui/material"

function Menu({chapter, mark, bookId}) {
    const [menu, setMenu] = useState(false)
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenu(p => !p)
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menu]);

    return(
        <>
            <div style={{
                position: 'fixed',
                top: '110px',
                right: '40px',
                zIndex: 9999,
            }} className="canClick" onClick={() => {setMenu(p => !p)}}>
                <img src="https://cdn-icons-png.flaticon.com/128/18472/18472616.png" width={75} height={75} alt="" />
            </div>

            {menu &&
            <div style={{
                position: 'fixed',
                top: '100px',
                right: '130px',
                zIndex: 8888,
                width: '25vw',
                height: '80vh',
                backgroundColor: 'white',
                borderRadius: 5,
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '10px 25px',
                overflow: 'auto',
                minWidth: '250px'
            }} ref={menuRef}>
                <h2>Danh Sách Chương</h2>

                <div
                    style={{
                        paddingTop: 35,
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr 1fr',
                        gap: 15,
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                        paddingBottom: 5
                    }}
                >
                    <h3>Chapter</h3>
                    <h3>Tên</h3>
                    <h3>Giá</h3>
                </div>

                {
                    chapter.map((item, index) => {
                        const title = `Chapter ${item.chapter_num}: ${item.chapter_name}`

                        return(
                            <Link  key={index} href={`/${item.book_id}/${item.chapter_num}`}
                                style={{
                                    paddingTop: 15,
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 2fr 1fr',
                                    gap: 15,
                                    paddingBottom: 5,
                                    backgroundColor: index === mark ? '#FFE893' : 'transparent'
                                }}
                                className="chapterMenu">
                                <h3 style={{
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden',  
                                    textOverflow: 'ellipsis',
                                    margin: 0            
                                }}>{item.chapter_num}</h3>
                                <h3 style={{
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden',    
                                    textOverflow: 'ellipsis',
                                    margin: 0         
                                }} title={title}>{title}</h3>
                                <h3 style={{
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden',    
                                    textOverflow: 'ellipsis',
                                    margin: 0             
                                }}>{item.price}</h3>
                            </Link>
                        )
                    })
                }
            </div>
            }
        </>
    )
}

export default function Page() {
    const [chapter, setChapter] = useState(null)
    const path = usePathname()
    const pathSegment = path.split('/')
    const [chapterOnLoad, setOnLoad] = useState([])
    const [index, setIndex] = useState(-1)
    const [bottom, setBottom] = useState(false)
    const [loading, setLoading] = useState(true)

    const handleScroll = () => {
        if(window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 200) {
            setBottom(true)
        }
    };

    useEffect(() => {
        async function foo() {
            setLoading(true)
            const bookId = pathSegment[1]
            const chapterId = pathSegment[2]

            const token = Cookies.get('token')
            
            try {
                const res = await getChaperFromBook(token, bookId)
                const data = res.message
                data.sort((a, b) => a.chapter_num - b.chapter_num)
                setChapter(data)
                setLoading(false)
            } catch(e) {
                if (typeof window !== "undefined") {
                    alert(e.message);
                }
            }
        }
            
        foo()

        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [path])

    useEffect(() => {
        const bookId = pathSegment[1]
        const chapter_num = pathSegment[2]

        if(chapter) {
            console.log(chapter)
            setIndex(chapter.findIndex(item => item.chapter_num === parseInt(chapter_num, 10)));
        }
    }, [chapter])

    useEffect(() => {
        async function foo(chapterId) {
            setLoading(true)
            const bookId = pathSegment[1]
            const token = Cookies.get('token')

            try {
                const res = await getChaperFromBookWithChapterNum(token, bookId, chapterId)
                const data = res.message
                setOnLoad(prev => [...prev, data[0]])
                setBottom(false)
                setLoading(false)
            } catch(e) {
                alert(e.message)
            }
        }

        if(index != -1) {
            console.log('index=', index)

            const chapter_num = chapter[index].chapter_num
            foo(chapter_num)
        }
    }, [index])

    useEffect(() => {
        if(chapterOnLoad.length) {
            console.log(chapterOnLoad)
            if (typeof window !== 'undefined') {
                document.title = `Chapter ${chapterOnLoad[chapterOnLoad.length - 1].chapter_num}: ${chapterOnLoad[chapterOnLoad.length - 1].chapter_name}`
            }
        }
    }, [chapterOnLoad])

    useEffect(() => {
        if(bottom && chapter) {
            if(index == chapter.length - 1) {
                alert("Chương cuối rồi bạn ơi")
            }
            else {
                const chapterNum = chapter[index+1].chapter_num

                if(chapter[index+1].price > 0) {
                    let result = window.confirm(`Chương Tiếp Yêu Cầu ${chapter[index+1].price} VNĐ để thanh toán, chắc chắn muốn tiếp tục đọc?`);

                    if(result) {
                        window.history.pushState(null, '', `/${pathSegment[1]}/${chapterNum}`);
                        setIndex(index => index+1)
                    }
                } else {
                    window.history.pushState(null, '', `/${pathSegment[1]}/${chapterNum}`);
                    setIndex(index => index+1)
                }
            }
        }
    }, [bottom])

    // if(chapter)
        return (
            <>
                <a className="reader_nav" href={`/${pathSegment[1]}`} title="Quay lại">
                    <img src="https://cdn-icons-png.flaticon.com/128/709/709624.png"
                        width={45}
                        height={45}
                        alt="" className="back"     
                    />
                </a>

                {chapter && <Menu chapter={chapter} mark={index} bookId={pathSegment[1]}/>}

                { chapterOnLoad &&
                    chapterOnLoad.map((item, index) => {
                        return(
                            <div key={index} style={{
                                paddingBottom: '75px',
                                borderBottom: '1px solid #B7B7B7',
                                paddingTop: '25px',
                                minHeight: '800px'
                            }}>
                                <h1 style={{
                                    fontSize: '2rem'
                                }}>Chapter {item.chapter_num}: {item.chapter_name}</h1>

                                <div style={{
                                    maxWidth:'77vw',
                                }}>
                                    <pre
                                        style={{
                                            marginTop: 35,
                                            overflow: 'auto',               
                                            wordWrap: 'break-word',  
                                            fontSize: '1.4rem',
                                            fontFamily: 'Roboto, sans-serif',
                                            maxWidth: '100%',
                                            wordBreak: 'break-word',
                                            lineHeight: '1.5',
                                            maxWidth: '100%',
                                            whiteSpace: 'pre-wrap',
                                        }}
                                        >
                                        {item.file_url}
                                    </pre>
                                </div>
                            </div>
                        )
                    })
                }

                {loading && <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 15,
                    minHeight: '800px'
                }}>
                    <CircularProgress style={{padding: 15}}/>
                </div>}
            </>
        )
}