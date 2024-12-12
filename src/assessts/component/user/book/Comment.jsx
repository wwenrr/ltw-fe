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

function LoadComment({data, prevOffset, nextOffset, loading, offset}) {
    if(data)
        return(
            <>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 25,
                    marginTop: 50,
                    backgroundColor: '#F5F5F7',
                    borderRadius: 15,
                    paddingLeft: 30,
                    paddingBottom: 50
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

                    <div style={{display: 'flex', justifyContent: 'center', gap: 45, marginTop: 45, alignItems: 'center'}}> 
                        <Button variant="outlined" disabled={loading} onClick={prevOffset}><img src="https://cdn-icons-png.flaticon.com/128/271/271220.png" width={25} height={25} alt="" /></Button>
                        
                        <h2>{offset}</h2>
                        
                        <Button variant="outlined" disabled={loading} onClick={nextOffset}><img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" width={25} height={25} alt="" /></Button>
                    </div>
                </div>
            </>
        )
}

export default function Comment({token, book_id}) {
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
            // alert(e.message)
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
                paddingRight: '30px',
                marginTop: 30
            }}>Bình Luận</h1>

            <MyComment token={token} book_id={book_id}  loadData={loadData}/>
            <LoadComment data={data} loadData={loadData} prevOffset={prevOffset} nextOffset={nextOffset} loading={loading} offset={offset}/>
        </>
    )
}