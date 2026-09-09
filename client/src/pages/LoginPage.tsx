import { Stack, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/Authentication/useAuth";
import { useNavigate } from "react-router-dom";


interface Creds {
    email: string,
    password: string,
}

export default function LoginPage() {
    const [creds, setCreds] = useState<Creds>({
        email: "",
        password: "",
    });

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
    return (
        <Stack>
            <Typography variant="h1">Login</Typography>
            <Stack>
                <Stack>
                    <Typography variant="h3">E-mail</Typography>
                    <TextField 
                    variant="outlined"
                    value={creds.email}
                    onChange={(e) => {setCreds({...creds, email: e.target.value})}}
                    />
                </Stack>
                <Stack>
                    <Typography variant="h3">Password</Typography>
                    <TextField 
                    variant="outlined"
                    value={creds.password}
                    onChange={(e) => {setCreds({...creds, password: e.target.value})}}
                    />
                </Stack>
                <Stack>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}