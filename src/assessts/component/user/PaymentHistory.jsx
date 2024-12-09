'use client'

import { getHistoryPayment } from "@/assessts/function/fetch"
import { Button, useScrollTrigger } from "@mui/material"
import React, { useEffect, useState } from "react"

export default function PaymentHistory({token}) {
    const [data, setData] = useState(null)
    const [offset, setOffset] = useState(0)

    async function loadData() {
        try {
            const res = await getHistoryPayment(token, offset);
            setData(res)
        } catch(e) {
            alert(e.message)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    return(
        <>
            <div style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '25% 25% 25% 25%',
                marginTop: 50,
                borderBottom: '1px solid #BCCCDC',
                paddingBottom: 20
            }}>
                <h1 style={{fontSize: '1rem'}}>Số Thứ Tự</h1>
                <h1 style={{fontSize: '1rem'}}>Hành Động</h1>
                <h1 style={{fontSize: '1rem'}}>Số Lượng Tiền</h1>
                <h1 style={{fontSize: '1rem'}}>Thời Gian Giao Dịch</h1>
            </div>

            {data && data.map((item, index) => {
                return (
                    <div style={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: '25% 25% 25% 25%',
                        paddingTop: 30
                    }}
                        key={index}
                    >
                        <span style={{fontSize: '1rem', color: '#31363F'}}>{index + offset*10}</span>
                        <span style={{fontSize: '1rem', color: '#31363F'}}>{item.amount < 0 ? "Trừ Tiền" : "Cộng Tiền"}</span>
                        <span style={{fontSize: '1rem', color: '#31363F'}}>{item.amount}  VNĐ</span>
                        <span style={{fontSize: '1rem', color: '#31363F'}}>{item.time}</span>
                    </div>
                )
            })}

            <div style={{
                marginTop: 20,
                paddingTop: 25,
                borderTop: 'solid 1px #BCCCDC'
            }}>
                <Button onClick={async () => {
                    try {
                        const res = await getHistoryPayment(token, offset - 1)
                        setOffset(offset-1)
                        setData(res)
                    } catch(e) {
                        alert(e.message)
                    }
                }}>Trước</Button>

                <Button onClick={async () => {
                    try {
                        const res = await getHistoryPayment(token, offset + 1)
                        setOffset(offset+1)
                        setData(res)
                    } catch(e) {
                        alert(e.message)
                    }
                }}>Sau</Button>

                <Button color="success" onClick={async () => {
                    try {
                        const res = await getHistoryPayment(token, 0)
                        setOffset(0)
                        setData(res)
                    } catch(e) {
                        alert(e.message)
                    }
                }}>Về Trang Đầu</Button>
            </div>
        </>
    )
}