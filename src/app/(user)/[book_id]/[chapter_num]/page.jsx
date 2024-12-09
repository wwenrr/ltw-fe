'use client'
import { getChaperFromBook, getChaperFromBookWithChapterNum } from "@/assessts/function/fetch"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Link from "next/link"
import { CircularProgress } from "@mui/material"

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

    useState(() => {
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
                alert(e.message)
            }
        }
            
        foo()

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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

            const res = await getChaperFromBookWithChapterNum(token, bookId, chapterId)
            const data = res.message

            setOnLoad(prev => [...prev, data[0]])
            setBottom(false)
            setLoading(false)
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
        }
    }, [chapterOnLoad])

    useEffect(() => {
        if(bottom && chapter) {
            if(index == chapter.length - 1) {
                alert("Chương cuối rồi bạn ơi")
            }
            else {
                const chapterNum = chapter[index+1].chapter_num
                window.history.pushState(null, '', `/${pathSegment[1]}/${chapterNum}`);
                setIndex(index => index+1)
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

                { chapterOnLoad &&
                    chapterOnLoad.map((item, index) => {
                        return(
                            <div key={index} style={{
                                paddingBottom: '75px',
                                borderBottom: '1px solid #B7B7B7',
                                paddingTop: '25px'
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
                                            whiteSpace: 'normal',        
                                            wordWrap: 'break-word',  
                                            fontSize: '1.4rem',
                                            whiteSpace: 'normal',
                                            fontFamily: 'Roboto, sans-serif',
                                            maxWidth: '100%',
                                            wordBreak: 'break-word',
                                            lineHeight: '1.5',
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
                    marginTop: 15
                }}>
                    <CircularProgress style={{padding: 15}}/>
                </div>}
            </>
        )
}