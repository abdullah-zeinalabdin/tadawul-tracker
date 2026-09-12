import { Stack, Typography, Button, useTheme } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/Authentication/useAuth";
import { useNavigate } from "react-router-dom";
import EmailField from "../loginPage/EmailField";
import PasswordField from "../loginPage/PasswordField";
import type { Creds, CredsType } from "../loginPage/LoginPage";
import { credsFormStyles, credsPageStyles } from "../../styles/sxStyles";

export default function RegisterPage() {
    const [creds, setCreds] = useState<Creds>({
        email: "",
        password: "",
    });

    const theme = useTheme();
    
    const { register } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async() => {
        try {
            if(creds.email && creds.password) {
                await register({ email: creds.email, password: creds.password });
                navigate("/login");
            }
        }
        catch(error) {
            console.log("Register failed", error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: CredsType) => {
        setCreds({ ...creds, [type]: e.target.value });
    }

    return (
        <Stack sx={credsPageStyles(theme)}>
            <Stack sx={credsFormStyles(theme)}>
                    <Typography variant="h1">Register</Typography>
                    <Stack sx={{mt: "40px"}} spacing={5}>
                        <Stack spacing={2}>
                            <Typography variant="h3">Email Address</Typography>
                            <EmailField email={creds.email} onChange={handleChange}/>
                        </Stack>
                        <Stack spacing={2}>
                            <Typography variant="h3">Password</Typography>
                            <PasswordField password={creds.password} onChange={handleChange}/>
                        </Stack>
                        <Stack>
                            <Button variant="contained" onClick={handleSubmit}>Register</Button>
                        </Stack>
                    </Stack>
            </Stack>
        </Stack>
    )
}