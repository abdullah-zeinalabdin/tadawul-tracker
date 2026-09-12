import { Stack, Typography, Button, useTheme } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/Authentication/useAuth";
import { useNavigate } from "react-router-dom";
import PasswordField from "./PasswordField";
import EmailField from "./EmailField";
import { credsFormStyles, credsPageStyles } from "../../styles/sxStyles";


export interface Creds {
    email: string,
    password: string,
}

export type CredsType = "email" | "password";

export default function LoginPage() {
    const [creds, setCreds] = useState<Creds>({
        email: "",
        password: "",
    });

    const theme = useTheme();

    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async() => {
        try {
            if(creds.email && creds.password) {
                await login({ email: creds.email, password: creds.password });
                navigate("/");
            }
        }
        catch(error) {
            console.log("Login failed", error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: CredsType) => {
        setCreds({ ...creds, [type]: e.target.value });
    }

    return (
        <Stack sx={credsPageStyles(theme)}>
            <Stack sx={credsFormStyles(theme)}>
                    <Typography variant="h1">Login</Typography>
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
                            <Button variant="contained" onClick={handleSubmit}>Login</Button>
                        </Stack>
                    </Stack>
            </Stack>
        </Stack>
    )
}