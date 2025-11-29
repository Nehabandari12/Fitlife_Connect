import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";

export default function SignupPage() {
  const { logIn } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      setMsg("Signup successful! Redirecting to login...");
      
      // Login through Keycloak after registering
      setTimeout(() => logIn(), 800);
    } catch (err) {
      console.error(err);
      setMsg("Signup failed: " + (err.response?.data || "Unknown error"));
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h5" mb={2}>Create Account</Typography>

      <TextField label="First Name" fullWidth name="firstName" sx={{ mb: 2 }} onChange={handleChange} />
      <TextField label="Last Name" fullWidth name="lastName" sx={{ mb: 2 }} onChange={handleChange} />
      <TextField label="Email" fullWidth name="email" sx={{ mb: 2 }} onChange={handleChange} />
      <TextField label="Password" type="password" fullWidth name="password" sx={{ mb: 2 }} onChange={handleChange} />

      <Button fullWidth variant="contained" onClick={handleSignup}>
        Sign Up
      </Button>

      {msg && <Typography mt={2}>{msg}</Typography>}
    </Box>
  );
}
