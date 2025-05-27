import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
function ProfileForm() {
  return (
    <Box
    component="form"
    sx={{ display: "flex",
    flexDirection: "column",
    gap: 2,
    
  }}
    noValidate
    autoComplete="off"
  >
    <Stack direction={"row"} gap={2}>
    <TextField sx={{flex:1}}  label="FirstName" variant="filled" />
    <TextField   sx={{flex:1}} label="LastName" variant="filled" />
    </Stack>


    <TextField label="Phone" variant="filled" />
    <TextField label="NumberCertificate" variant="filled" />
    <TextField label="FirstName" variant="filled" />
    <TextField label="FirstName" variant="filled" />

  </Box>
  )
}

export default ProfileForm