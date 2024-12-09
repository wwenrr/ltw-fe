'use client'
import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material"

export default function Notification({message}) {
    console.log(message)
    const [open, setOpen] = useState(false);
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return; 
      }
      setOpen(false); 
    };
  
    useEffect(() => {
      setOpen(true)
    }, [])
  
    if(message)
      return (
          <>
          <Snackbar
              open={open}
              autoHideDuration={3000} 
              onClose={handleClose}
              style={{
                  marginTop: 95,
                  fontSize: '1.5rem'
              }}
              anchorOrigin={{ vertical: "top", horizontal: "right" }} 
          >
              <Alert onClose={handleClose} severity="info" sx={{ width: "100%", fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
                  {message}
              </Alert>
          </Snackbar>
          </>
      );
  }