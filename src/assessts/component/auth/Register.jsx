'use client'

import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, Avatar, CircularProgress, Skeleton, Alert } from '@mui/material';
import { register } from "@/assessts/function/fetch";
import Cookies from "js-cookie";

export default function Register() {
    const [data, setData] = useState({
        email: '',
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    return(
        <>
            <Box sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    autoComplete="email"
                    variant="standard"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: '8px',
                        },
                    }}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Tài khoản"
                    autoComplete="username"
                    variant="standard"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: '8px',
                        },
                    }}
                />

                <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    label="Mật khẩu"
                    type="password"
                    autoComplete="current-password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: '8px',
                        },
                    }}
                />
                
                <Button
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

                        try {
                            setErr('')
                            setLoading(true)
                            const res = await register(data)
                            if(res.code != 200)
                                throw Error(res.message)

                            setSuccess("Đăng kí thành công")
                            Cookies.set('token', res.message, {expires: 1})

                            window.location.href = "/"
                        } catch(e) {
                            setErr(e.message)
                            setLoading(false)
                        }
                    }}
                >
                    Đăng Kí
                </Button>

                {err && <Alert severity="error">{err}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
            </Box>
        </>
    )
}