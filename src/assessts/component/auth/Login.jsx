'use client'

import React, { use, useEffect, useState } from "react"
import { TextField, Button, Box, Alert } from '@mui/material';
import { login } from "@/assessts/function/fetch";
import Cookies from "js-cookie";

export default function Login() {
    const [data, setData] = useState({
        'username': '',
        'password': ''
    })
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        // console.log(data);
    }, [data])

    return(
        <Box sx={{ mt: 1 }}>
            <TextField
                disabled={loading}
                name="username"
                margin="normal"
                required
                fullWidth
                label="Tài Khoản"
                autoComplete="username"
                variant="standard"
                value={data.username}
                onChange={(e) => {
                    const {name, value} = e.target
                    setData(prev => ({
                        ...prev,
                        [name]: value
                    }))
                }}
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '8px',
                    },
                }}
            />
            <TextField
                disabled={loading}
                variant="standard"
                margin="normal"
                required
                fullWidth
                label="Mật khẩu"
                type="password"
                autoComplete="password"
                name="password"
                value={data.password}
                onChange={(e) => {
                    const {name, value} = e.target
                    setData(prev => ({
                        ...prev,
                        [name]: value
                    }))
                }}
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '8px',
                    },
                }}
            />
            
            <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    borderRadius: '8px',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    },
                }}
                onClick={async (e) => {
                    e.preventDefault()
                    setLoading(true)
                    setErr('')

                    try {
                        const res = await login(data);
                        if(res.code != 200) throw Error(res.message)

                        setSuccess("Đăng nhập thành công")
                        Cookies.set('token', res.message, {expires: 1})

                        window.location.href = "/"
                    } catch(e) {
                        setErr(e.message)
                        setLoading(false)
                    }
                }}
            >
                Đăng nhập
            </Button>

            {err && <Alert severity="error">{err}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
        </Box>
    )
}