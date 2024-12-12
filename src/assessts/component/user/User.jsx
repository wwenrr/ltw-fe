import { changeDisplayName, changeEmail, deposit } from "@/assessts/function/fetch";
import { useState } from "react";
import { Input, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button, Box  } from "@mui/material"

export function DisplayNameAndEmail({token, display_name, email, dataLoad}) {
    const [onChangeName, setChangeName] = useState(false)
    const [onChangeEmail, setChangeEmail] = useState(false)
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState(display_name)
    const [mail, setMail] = useState(email)

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.target.blur();
            setLoading(true)
            
            try {
                const res = await changeDisplayName(token, name)
                await dataLoad()
                setChangeName(false)
            } catch(e) {
                alert(e.message)
            }

            setLoading(false)
        }
      };

    const handleKeyDown1 = async (e) => {
        if (e.key === "Enter") {
            e.target.blur();
            setLoading(true)
            
            try {
                const res = await changeEmail(token, mail)
                await dataLoad()
                setChangeEmail(false)
            } catch(e) {
                alert(e.message)
            }

            setLoading(false)
        }
    };

    return(
        <>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15, transition: 'all 0.5s ease'} }>

                    {!onChangeName ? 
                    <h1
                        style={{
                            fontSize: '2rem',
                        }}
                        >{display_name}
                    </h1>
                    :
                    <Input
                        autoFocus={true}
                        disabled={loading}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        >{display_name}
                    </Input>
                    }
                    <img 
                        disabled={loading}
                        onClick={() => {
                            setChangeName(prev => !prev)
                        }}
                        className="canClick"
                        style={{
                            marginLeft: 20,
                        }}
                        src={onChangeName ? "https://cdn-icons-png.flaticon.com/128/1828/1828665.png" : "https://cdn-icons-png.flaticon.com/128/2280/2280532.png"}
                            alt="" 
                            width={25}
                            height={25}
                    />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15, transition: 'all 0.5s ease'}}>
                    {onChangeEmail ? 
                        <Input
                            autoFocus={true}
                            disabled={loading}
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            onKeyDown={handleKeyDown1}
                            >{mail}
                        </Input>
                    :
                        <span
                            style={{
                                fontSize: '1rem'
                            }}
                        >{email}</span>
                    }
                    <img 
                        disabled={loading}
                        onClick={() => {
                            setChangeEmail(prev => !prev)
                        }}
                        className="canClick"
                        style={{
                            marginLeft: 20,
                        }}
                        src={onChangeEmail ? "https://cdn-icons-png.flaticon.com/128/1828/1828665.png" : "https://cdn-icons-png.flaticon.com/128/1159/1159633.png"}
                            alt="" 
                            width={20}
                            height={20}
                    />
                </div>
                
            </div>
        </>
    )
}

export function Deposit({token, credits, dataLoad}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true); 
    };

    const handleClose = () => {
        setOpen(false); 
    };

    const [money, setMoney] = useState('')

    return(
        <>
            <Dialog
                open={open}
                onClose={handleClose} 
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
            >
                <DialogTitle id="dialog-title">Nhập Số Tiền</DialogTitle>
                <DialogContent>
                    <Box component="form"
                        disabled={loading}
                        onSubmit={async (e) => {
                            e.preventDefault()
                            setLoading(true)

                            try {
                                const res = await deposit(token, money)
                                handleClose()
                                setMoney('0')
                                await dataLoad()
                            } catch(e) {
                                alert(e.message)
                            }

                            setLoading(false)
                        }}
                    >
                        <Input 
                            disabled={loading}
                            value={money}
                            onChange={(e) => {setMoney(e.target.value)}}
                            type="number"
                        />

                        {
                            money && 
                            <Button
                                disabled={loading}
                                type="submit"
                                sx={{
                                    marginLeft: 5
                                }}
                            >Xác nhận</Button>
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                </DialogActions>
            </Dialog>
            <div 
                className="coin canClick"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    right: '75px',
                    top: '25px'
                }}
                onClick={handleClickOpen}
            >
                <span style={{
                    fontSize: '2rem',
                    marginRight: '10px',
                    color: '#afafaf'
                }}>{credits}</span>
                <img src="https://cdn-icons-png.flaticon.com/128/1651/1651925.png" alt="" 
                    width={40}
                    height={40}
                />
            </div>
        </>
    )
}