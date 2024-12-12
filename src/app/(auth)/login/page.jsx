import { TextField, Button, Box, Typography, Container, Avatar, CircularProgress, Skeleton, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from 'next/link';
import Login from '@/assessts/component/auth/Login';

export default function Page() {
    return(
        <>
            <Container maxWidth="xs">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 4,
                            borderRadius: 2,
                            boxShadow: 3,
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 75, height: 75 }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>

                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.25rem' }}>
                            Đăng Nhập
                        </Typography>
 
                        <Login />

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                <Link href="/register">
                                    Chưa có tài khoản? Đăng ký
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Container>
        </>
    )
}