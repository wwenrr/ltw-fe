'use client'

import { Button } from "@mui/material"

export default function Next({off, setOff, changePage, loading}) {
    return(
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 25
        }}>
            {off != 0 &&  <Button disabled={loading} onClick={() => {changePage('prev')}}> Prev </Button>}
            <h3>Page {off}</h3>
            <Button disabled={loading} onClick={() => {changePage('next')}}> Next </Button>
        </div>
    )
}