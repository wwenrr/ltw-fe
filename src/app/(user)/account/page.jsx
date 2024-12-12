'use client'

// import Action from "@/assessts/component/user/action";
import { changeDisplayName, getUserInfo } from "@/assessts/function/fetch";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Input, Snackbar, Alert } from "@mui/material"
import Action from "@/assessts/component/user/publisher";
import Notification from "@/assessts/component/Notification";
import { Deposit, DisplayNameAndEmail } from "@/assessts/component/user/User";
import PaymentHistory from "@/assessts/component/user/PaymentHistory";


export default function Page() {
    const token = Cookies.get('token')

    const [data, setData] = useState(null) 

    async function dataLoad() {
        const res = await getUserInfo(token)

        setData(res[0])
    }

    useEffect(() => {
        dataLoad()
    }, [])

    if(data)
        return (
            <>
                <div 
                    style={{
                        backgroundColor: '#FAFAFA',
                        margin: 'auto',
                        padding: '25px 50px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '40px',
                        }}
                    >
                        <img
                            style={{
                                border: '2px solid #ADD8E6',
                                borderRadius: '100%'
                            }}
                        src="https://cdn-icons-png.flaticon.com/128/149/149071.png" width={125} height={125} alt="icon" />

                        <DisplayNameAndEmail 
                            token={token}
                            display_name={data.display_name}
                            email={data.email}
                            dataLoad={dataLoad}
                        />

                        <Deposit token={token} credits={data.credits} dataLoad={dataLoad}/>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'absolute',
                            right: '75px',
                            top: '100px'
                        }} className="coin">
                            <span style={{
                                fontSize: '2rem',
                                marginRight: '10px',
                                color: '#afafaf'
                            }}>{data.role ?? 'guest'}</span>
                            <img src="https://cdn-icons-png.flaticon.com/128/10307/10307292.png" alt="" 
                                width={40}
                                height={40}
                            />
                        </div>
                    </div>

                    <h1
                        style={{
                            fontWeight: 'bold',
                            marginTop: '45px',
                            display: 'block',
                            borderBottom: '1px solid black',
                            marginBottom: '20px',
                            paddingBottom: '7px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 15
                        }}
                    >
                    <img src="https://cdn-icons-png.flaticon.com/128/9195/9195785.png" alt="" 
                        width={35}
                        height={35}
                    />
                    Thông tin Cá Nhân</h1>

                    <div
                        style={{
                            marginBottom: '10px',
                        }}
                    ><b>Tên Đăng Nhập: </b> <span>{data.username}</span>  </div>

                    <div style={{
                            marginBottom: '10px',
                        }}><b>Vai Trò: </b> <span>{data.role ?? 'guest'}</span></div>
                    <div><b>Số Tiền Còn Lại: </b> <span>{data.credits}</span></div>


                    <h1
                        style={{
                            fontWeight: 'bold',
                            marginTop: '45px',
                            display: 'block',
                            borderBottom: '1px solid black',
                            marginBottom: '20px',
                            paddingBottom: '7px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 15
                        }}
                    >
                    <img src="https://cdn-icons-png.flaticon.com/128/9196/9196093.png" alt="" 
                        width={35}
                        height={35}
                    />
                    Hành Động</h1>

                    
                    <Action token={token} role={data.role}/>

                    <h1
                        style={{
                            fontWeight: 'bold',
                            marginTop: '45px',
                            display: 'block',
                            borderBottom: '1px solid black',
                            marginBottom: '20px',
                            paddingBottom: '7px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 15
                        }}
                    >

                    <img src="https://cdn-icons-png.flaticon.com/128/10789/10789376.png" alt="" 
                        width={35}
                        height={35}
                    />
                    Lịch Sử Giao Dịch</h1>
                    <PaymentHistory token={token}/>
                </div>
            </>
        )

    else {
        return (
            <>
                <div 
                    style={{
                        width: '70%',
                        backgroundColor: '#FAFAFA',
                        margin: 'auto',
                        padding: '25px 100px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        position: 'relative',
                        minWidth: '600px'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '40px',
                        }}
                    >
                        <img
                            style={{
                                border: '2px solid #ADD8E6',
                                borderRadius: '100%'
                            }}
                            className="skeleton"
                            width={125} height={125}  />
                    </div>

                    <h1
                        style={{
                            fontWeight: 'bold',
                            marginTop: '45px',
                            display: 'block',
                            borderBottom: '1px solid black',
                            marginBottom: '20px',
                            paddingBottom: '7px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 15
                        }}
                    >
                    <img src="https://cdn-icons-png.flaticon.com/128/9195/9195785.png" alt="" 
                        width={35}
                        height={35}
                    />
                    Thông tin Cá Nhân</h1>

                    <div
                        style={{
                            marginBottom: '10px',
                        }}
                    ><b>Tên Đăng Nhập: </b> <span className="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  </div>

                    <div style={{
                            marginBottom: '10px',
                        }}><b>Vai Trò: </b> <span className="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
                    <div><b>Số Tiền Còn Lại: </b> <span className="skeleton">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>


                    <h1
                        style={{
                            fontWeight: 'bold',
                            marginTop: '45px',
                            display: 'block',
                            borderBottom: '1px solid black',
                            marginBottom: '20px',
                            paddingBottom: '7px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 15
                        }}
                    >
                    <img src="https://cdn-icons-png.flaticon.com/128/9196/9196093.png" alt="" 
                        width={35}
                        height={35}
                    />
                    Hành Động</h1>


                    <h1
                        style={{
                            fontWeight: 'bold',
                            marginTop: '45px',
                            display: 'block',
                            borderBottom: '1px solid black',
                            marginBottom: '20px',
                            paddingBottom: '7px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 15
                        }}
                    >

                    <img src="https://cdn-icons-png.flaticon.com/128/10789/10789376.png" alt="" 
                        width={35}
                        height={35}
                    />
                    Lịch Sử Giao Dịch</h1>
                </div>
            </>
        )
    }
}