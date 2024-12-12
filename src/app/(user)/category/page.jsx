import { getBook, getCategory } from "@/assessts/function/fetch";
import { redirect } from "next/navigation";
import { headers, cookies } from "next/headers"
import Image from 'next/image'
import { Chip } from '@mui/material';
import { Tag } from '@mui/icons-material';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default async function() {
    const headerlist = await headers()
    const cookieStore = await cookies();
    const token = await cookieStore.get("token");

    try {
        const res = await getCategory(token.value)
        const data = res.message

        return (
                    <>
                        <h1 style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 15
                        }}>
                        <img src="https://cdn-icons-png.flaticon.com/128/12492/12492310.png" width={35} height={35} alt="" />
                        Danh Mục Thể Loại</h1>
            
                        <div className="content_box tags">
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                gap: "25px 0px",
                                width: '100%',
                                height: 50
                            }}>
                                {data.map((item, index) => {
                                    return(
                                        <p>
                                            <a  href={`/category/${item.category}`}
                                                className={`color${rand(1, 5)}`}>{item.category} / {item.nums_of_books} tác phẩm</a>
                                        </p>
                                    )
                                })}     
                            </div>
                        </div> 
                    </>
                )
    } catch(e) {
        
    }
}