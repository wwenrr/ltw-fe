import { addChapter, delelteBook, deleteChapter, fetch_changePassword, fetch_deleteAccount, getAllUser, getChaperFromBook, getUserInfo, Promote, publishNewBook } from "@/assessts/function/fetch";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getPublisherBooks } from "@/assessts/function/fetch"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Input } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import { preconnect } from "react-dom";

function SingleBook({token, item, loadBooks}) {
    const [data, setData] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showTable, setShowTable] = useState(false)

    async function loadData() {
        const res = await getChaperFromBook(token, item.id)

        let temp_data = res.message
        temp_data.sort((a, b) => a.chapter_num - b.chapter_num);

        setData(temp_data)
    }

    async function handleClick() {
        setOpenDialog(true)
        setLoading(true)
        await loadData()
        setLoading(false)
    }

    useEffect(() => {
        if(data) {
            if(data.length !== 0) setChapterNumber(data[data.length - 1].chapter_num + 1)
        }
    }, [data])

    const [file, setFile] = useState(null);
    const [chapterName, setChapterName] = useState('');
    const [chapterNumber, setChapterNumber] = useState('');
    const [price, setPrice] = useState(0)

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleChapterNameChange = (event) => {
        setChapterName(event.target.value);
    };

    const handleChapterNumberChange = (event) => {
        setChapterNumber(event.target.value);
    };

    const handlePrice = (event) => {
        setPrice(event.target.value);
    };

    const [loadForm, setLoadForm] = useState(false)

    return(
        <>
            <Dialog open={openDialog} onClose={() => {setOpenDialog(false)}}>
                <DialogTitle>Xem Danh Sách Chapter</DialogTitle>
                <DialogContent>
                    <>
                        <div>
                            <div style={{
                                display: 'grid',
                                gridTemplateRows: 'repeat(auto-fill, minmax(30px, auto))',
                                gap: '10px 70px',
                                height: '500px'
                            }}>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '7fr 15fr 2fr 1fr',
                                    gap: '10px',
                                    width: '100%'
                                }}
                                >
                                    <div
                                        style={{
                                            borderBottom: '2px solid black',
                                            paddingBottom: '9px',
                                            height: '25px'
                                        }}
                                    >STT Chapter</div>
                                    <div>Tên Chapter</div>
                                    <div>Giá</div>
                                    <div></div>

                                </div>
                                {
                                    loading && 
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '50px'
                                    }}>
                                        <CircularProgress />
                                    </div>
                                }
                                {data.length !== 0  && data.map((item, index) => {
                                    return(
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '7fr 15fr 2fr 1fr',
                                            gap: '10px',
                                            width: '100%',
                                            height: '35px'
                                        }}
                                            className="publisherGetChapterList"
                                            key={index}
                                            onClick={async () => {
                                                const userConfirmed = window.confirm("Xác nhận xóa chapter này?");
                                                if (userConfirmed) {
                                                    try {
                                                        const res = await deleteChapter(token, item.id)
                                                        await loadData()
                                                    } catch(e) {
                                                        alert(e.message)
                                                    }
                                                } else {
                                                    console.log("Đã hủy hành động xóa.");
                                                    // Không thực hiện gì
                                                }
                                            }}
                                        >
                                            <div>{item.chapter_num}</div>
                                            <div style={{minWidth: '350px'}}>{item.chapter_name}</div>
                                            <div>{item.price}</div>
                                            <div style={{
                                                marginTop: '2px'
                                            }}>
                                                <img src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" 
                                                    width={15}
                                                    height={15}
                                                alt="" />
                                            </div>
                                        </div>
                                    )
                                })}

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {!loading && <Button color="error"
                                    style={{
                                        padding: '20px 5px'
                                    }}
                                    onClick={async () => {
                                        const userConfirmed = window.confirm("Xác nhận xóa sách này?");
                                        if (userConfirmed) {
                                            try {
                                                const res = await delelteBook(token, item.id)
                                                setOpenDialog(false)
                                                await loadBooks()
                                            } catch(e) {
                                                alert(e.message)
                                            }
                                        } else {
                                            alert("Đã hủy hành động xóa.");
                                        }
                                    }}
                                    >Xóa Sách Này</Button>}

                                    {!loading && <Button
                                        style={{
                                            padding: '20px 5px'
                                        }}
                                        onClick={() => {
                                            setShowTable(prev => !prev)
                                        }}
                                    ><img src="https://cdn-icons-png.flaticon.com/128/1828/1828817.png" width={25} height={25} alt="" /></Button>}

                                    {showTable && 
                                        <>
                                        <Box
                                            component="form"
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 2,
                                                maxWidth: 400,
                                                margin: 'auto',
                                                padding: 2,
                                            }}
                                        >
                                            <Input
                                                disabled={loadForm}
                                                type="file"
                                                onChange={handleFileChange}
                                                fullWidth
                                                required
                                                inputProps={{
                                                    accept: '.txt' 
                                                }}
                                                sx={{
                                                    '& .MuiInput-root': {
                                                        padding: '10px',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '4px',
                                                    },
                                                    '& .MuiInputBase-root': {
                                                        padding: '10px',
                                                    },
                                                }}
                                            />
                                            <TextField
                                                disabled={loadForm}
                                                label="Tên Chapter"
                                                variant="outlined"
                                                fullWidth
                                                required
                                                value={chapterName}
                                                onChange={handleChapterNameChange}
                                            />
                                            <TextField
                                                disabled={loadForm}
                                                label="Số Thứ Tự Chapter"
                                                variant="outlined"
                                                fullWidth
                                                required
                                                type="number"
                                                value={chapterNumber}
                                                onChange={handleChapterNumberChange}
                                            />

                                            <TextField
                                                disabled={loadForm}
                                                label="Giá Của Chapter"
                                                variant="outlined"
                                                fullWidth
                                                required
                                                type="number"
                                                value={price}
                                                onChange={handlePrice}
                                            />

                                            <Button type="submit"
                                                disabled={loadForm}
                                                onClick={async (e) => {
                                                    e.preventDefault()

                                                    const formData = new FormData();
                                                    formData.append('book_id', item.id)
                                                    formData.append('file_url', file);
                                                    formData.append('chapter_name', chapterName);
                                                    formData.append('chapter_num', chapterNumber);
                                                    formData.append('price', price);

                                                    // console.log(item.id)
                                                    
                                                    setLoadForm(true)
                                                    try {
                                                        const res = await addChapter(token, formData)
                                                        await loadData()
                                                    } catch(e) {
                                                        console.log(e)
                                                        alert(e.message)
                                                    }
                                                    setLoadForm(false)
                                                }}
                                            >Thêm Chapter</Button>
                                        </Box>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => {setOpenDialog(false)}} color="secondary">
            
                </Button>
                </DialogActions>
            </Dialog>
            <div    
                onClick={() => handleClick()}
                className="publisher_list_book_warper"
                title={item.name}
                style={{
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '20px',
                    width: '350px',
                    overflow: 'hidden',          
                    textOverflow: 'ellipsis',    
                    whiteSpace: 'nowrap', 
                    wordWrap: 'break-word',
                }}
            >
                <img src={item.image_url} width={75} height={100} alt="" style={{ borderRadius: '5px' }}/>

                <div>
                    <h1
                        style={{
                            overflow: 'hidden',          
                            textOverflow: 'ellipsis',    
                            whiteSpace: 'nowrap',  
                            wordWrap: 'break-word',
                        }}  
                    >{item.name}</h1>
                    <p style={{
                        fontSize: '0.8rem',
                        marginTop: '5px'
                    }}> <b>last update: </b> {item.last_update}</p>
                    <p style={{
                        fontSize: '0.8rem',
                        marginTop: '5px'
                    }}> <b>category: </b> {item.category}</p>
                </div>
            </div>
        </>
    )
}

function ViewBook({token, setLoading}) {
    const [data, setData] = useState(null)

    async function loadData() {
        setLoading(true)
        const res = await getPublisherBooks(token)
        const data = res.message
        setLoading(false)
        setData(data)
    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    if(data)
        return(
            <>  
                <div
                    style={{
                        width: '100%',
                        maxHeight: '500px',
                        overflowY: 'auto',
                    }}
                >
                    {data.map((item, index) => <SingleBook item={item} key={index} token={token} loadBooks={loadData}/>)}
                </div>
            </>
        )
}

function AddBook({token, setLoading}) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        image_url: ''
    });
    const [loading, setLoad] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            setLoad(true)
            const res = await publishNewBook(token, formData)
            alert(res.message)
        } catch(e) {
            alert(e.message)
        }
        setLoad(false)
        setLoading(false)
      };

    return (
        <>
            <h1 style={{
                marginLeft: 15
            }}>Thêm Sách Mới</h1>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 400,
                    margin: 'auto',
                    padding: 2
                }}
                >
                <TextField
                    disabled={loading}
                    label="Tên Sách"
                    variant="outlined"
                    fullWidth
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    disabled={loading}
                    label="Thể Loại"
                    variant="outlined"
                    fullWidth
                    required
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />
                <TextField
                    disabled={loading}
                    label="Link Ảnh"
                    variant="outlined"
                    fullWidth
                    required
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                />
                <Button disabled={loading} type="submit" variant="contained">
                    Submit
                </Button>
            </Box>
        </>
    );
}

function Publisher({token}) {
    const [twoAction, setAct] = useState({
        ViewBook: false,
        AddBook: false,
    })
    const [loading, setLoading] = useState(false)

    return(
        <>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '50% 50%',
                height: '500px',
                width: '100%',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Button 
                        variant="text"
                        disabled={loading}
                        onClick={() => setAct({
                            ViewBook: true,
                            AddBook: false,
                        })}
                        sx={{
                            maxWidth: '100%',
                            padding: '10px'
                        }}
                    >Xem Danh Sách Truyện Của Tôi</Button>

                    <Button color="success" 
                        variant="text"
                        disabled={loading}
                        sx={{
                            marginTop: '15px',
                            maxWidth: '100%',
                            padding: '10px'
                        }}
                    onClick={() => setAct({
                            ViewBook: false,
                            AddBook: true,
                        })}
                    >Thêm Một Cuốn Sách</Button>
                </div>

                <div style={{
                    borderLeft: '1px solid black',
                    paddingLeft: '15px'
                }}>
                    {twoAction.ViewBook && <ViewBook token={token} setLoading={setLoading} />}
                    {twoAction.AddBook  && <AddBook  token={token} setLoading={setLoading} />}
                </div>
            </div>
        </>
    )
}

function DisplayAccount({token, username, role, email, display_name, credits, loadData}) {
    const [loading, setLoading] = useState(false)

    async function promote(user_role) {
        setLoading(true)
        try {
            const res = await Promote(token, username, user_role)
            await loadData(null)
            alert(res.message)
        } catch(e) {
            alert(e.message)
        }
        setLoading(false)
    }

    async function deleteAccount() {
        setLoading(true)
        try {
            const res = await fetch_deleteAccount(token, username)
            await loadData(null)
            alert(res.message)
        } catch(e) {
            alert(e.message)
        }
        setLoading(false)
    }

    return (
        <>
            <div style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 2fr 2fr 0.5fr 1fr 1fr',
                    paddingBottom: 15,
                    paddingTop: 20
                }}>
                    <span title={username} style={{overflow: 'hidden', width: '90%', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{username}</span>
                    <span title={role ?? 'guest'} style={{overflow: 'hidden', width: '90%', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{role ?? 'guest'}</span>
                    <span title={email} style={{overflow: 'hidden', width: '90%', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{email}</span>
                    <span title={display_name} style={{overflow: 'hidden', width: '90%', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{display_name}</span>
                    <span title={credits} style={{overflow: 'hidden', width: '90%', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{credits}</span>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        transform: 'translateY(-5px)',
                        justifyContent: 'center'
                    }}>
                        {role===null && <img title="Thăng chức thành publisher" 
                            disabled={loading}
                            className={loading ? "cannotClick" : "canClick" }
                            src="https://cdn-icons-png.flaticon.com/128/18446/18446244.png" width={30} height={30} alt="" 
                            onClick={() => promote('publisher')}
                        />}

                        {role==='publisher' && <img title="Thăng chức thành quản lí" 
                            disabled={loading}
                            className={loading ? "cannotClick" : "canClick" }
                            src="https://cdn-icons-png.flaticon.com/128/5184/5184141.png" width={30} height={30} alt="" 
                            onClick={() => promote('manager')}    
                        /> }
                    </div>

                    {role !== 'manager' && <img src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" 
                            alt=""
                            width={30}
                            height={30} 
                            className={loading ? "cannotClick" : "canClick" }
                            title="Xóa Tài Khoản"
                            onClick={() => deleteAccount('manager')}
                    />}
                </div>
        </>
    )
}

function Manager({token}) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [offset, setOffset] = useState(0)

    async function Page(action) {
        setLoading(true)
        if(action === 'prev') {
            await loadData(offset-1)
        } else if(action === 'next') {
            await loadData(offset+1)
        }
        setLoading(false)
    }

    async function loadData(off) {
        if(!off) off = offset
        try {
            const res = await getAllUser(token, off)
            setOffset(off)
            setData(res)
        } catch(e) {
            // alert(e.message)
        }
    }

    useEffect(() => {
        loadData(offset)
    }, [])

    return(
        <>
            <div style={{
                display: 'flex',
                gap: 20,
                alignContent: 'center'
            }}>
                <h3>Quản Lí User</h3>
                
            </div>
            <div style={{
                width: '100%',
                padding: '20px 25px'
            }}>
                <div style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 2fr 2fr 0.5fr 1fr 1fr',
                    borderBottom: '1px solid #BCCCDC',
                    paddingBottom: 15
                }}>
                    <h4 style={{paddingRight: 5}}>Tài Khoản</h4>
                    <h4 style={{paddingRight: 5}}>Vai Trò</h4>
                    <h4 style={{paddingRight: 5}}>Địa Chỉ Email</h4>
                    <h4 style={{paddingRight: 5}}>Tên Hiển Thị</h4>
                    <h4 style={{paddingRight: 5}}>Tiền</h4>
                    <h4 style={{paddingRight: 5}}>Thăng Chức</h4>
                    <h4 style={{paddingRight: 5}}>Xóa Tài Khoản</h4>
                </div>

                {
                    data && 
                    data.map((item, index) => {
                        return(
                            <DisplayAccount 
                                key={index} 
                                token={token} 
                                username={item.username} 
                                role={item.role} 
                                email={item.email} 
                                display_name={item.display_name} 
                                credits={item.credits}
                                loadData={loadData}
                                />
                        )
                    })
                }
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                {offset !==0 && <Button disabled={loading} onClick={() => {Page('prev')}}>Prev</Button>}
                <span>Page: &nbsp;</span> <h3> {offset}</h3>
                <Button disabled={loading} onClick={() => {Page('next')}}>Next</Button>
            </div>
        </>
    )
}

function ChangePassword({token}) {
    const [click, setClick] = useState(false)
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState("");

    const handleKeyDown = async (event) => {
        if (event.key === "Enter") {
            setLoading(true)
            
            try {
                const res = await fetch_changePassword(token, value)
                setValue('')
                event.target.value = ('')
                alert(res.message)
            } catch(e) {
                alert(e.message)
            }

            setLoading(false)
        }
    };

    return(
        <>
            <div style={{
                display:'flex',
                alignItems: 'center'
            }} >
                <Button style={{
                    marginBottom: 25
                }} color="error" onClick={() => {setClick(prev => !prev)}}>Đổi Mật Khẩu</Button>

                {click && <TextField 
                    disabled={loading} 
                    label="Mật Khẩu Mới"
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                        marginLeft: 25
                    }}
                >
                    Mật Khẩu Mới
                </TextField>}
            </div>
            
        </>
    )
}

export default function Action({token, role}) {    
        return (
            <>
                <ChangePassword token={token}/>
                {role === 'publisher' && <Publisher token = {token}/>}
                {role === 'manager'   && <Manager token={token}/>}
            </>
        )
}