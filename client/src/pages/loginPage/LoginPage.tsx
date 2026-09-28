import { Stack, Typography, Button, useTheme, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/Authentication/useAuth";
import { useLocation, useNavigate, Link } from "react-router-dom";
import PasswordField from "./PasswordField";
import EmailField from "./EmailField";
import { credsFormStyles, credsPageStyles } from "../../styles/sxStyles";
import type { Creds, CredsType } from "../../context/Authentication/AuthContext";
import ErrorAlert from "../../shared/ErrorAlert";

export default function LoginPage() {
    const [creds, setCreds] = useState<Creds>({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const location  = useLocation();
    const message = location?.state?.message ?? null;
    const [loginError, setLoginError] = useState<string | null>(message);

    const theme = useTheme();

    const { login, clearLogoutMessage } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async() => {
        try {
            setLoginError(null);
            if(creds.email && creds.password) {
                setIsSubmitting(true)
                await login({ email: creds.email, password: creds.password });
                navigate("/");
            }
        }
        catch(error) {
            if(error instanceof Error) {
                setLoginError(error.message);
            }
            else {
                setLoginError("Login Failed");
            }
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: CredsType) => {
        setCreds({ ...creds, [type]: e.target.value });
    }

    useEffect(() => {
        clearLogoutMessage();
        // eslint-disable-next-line
    }, []);

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
                    <ErrorAlert message={loginError}/>
                    <Stack>
                        <Button 
                        variant="contained" 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
                        >Login</Button>
                    </Stack>
                    <Stack sx={{ textAlign: "center" }}>
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <Link to="/register" style={{ color: theme.palette.primary.main }}>Register</Link>
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}