import { TextField, Button, Box, Typography, Container, Avatar, Skeleton, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from 'next/link';
import Register from '@/assessts/component/auth/Register';

export default function Page() {
    return(
        <>
            <Container component="main" maxWidth="xs">
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
                            Đăng Kí
                        </Typography>

                        <Register />

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                <Link href="/login">
                                    Đã có tài khoản ? Đăng nhập
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Container>
        </>
    )
}