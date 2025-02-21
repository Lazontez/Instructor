import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField, Box, Grid, Card, CardContent } from "@mui/material";
import CryptoJS from "crypto-js";

const VALID_CODES = ["GUITAR50", "EARLYACCESS", "MUSICMASTER"];
const SECRET_KEY = "supersecretkey123";

export default function BrandPage() {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAccessCodeSubmit = () => {
    if (VALID_CODES.includes(accessCode.trim().toUpperCase())) {
      const encryptedToken = CryptoJS.AES.encrypt("verifiedUser", SECRET_KEY).toString();
      localStorage.setItem("accessToken", encryptedToken);
      navigate("/signup");
    } else {
      setError("Invalid access code. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 5, px: 2 }}>
      {/* Hero Section */}
      <Typography variant="h4" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }} gutterBottom>
        Master Your Guitar Skills
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
        Track your practice, set goals, and level up your playing with our intuitive app.
      </Typography>
      {/* <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
        Learn More
      </Button> */}

      {/* Features Section */}
      <Grid container spacing={3} sx={{ mt: 5 }}>
        {[
          { title: "Goal Tracking", desc: "Set and track your guitar practice goals easily." },
          { title: "Personalized Plans", desc: "AI-driven recommendations for faster progress." },
          { title: "Teacher Mode", desc: "Great for instructors managing student progress." },
        ].map((feature, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ p: 2, minHeight: 150, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>{feature.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
                  {feature.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Access Code Form */}
      <Box sx={{ mt: 5, p: 3, backgroundColor: "#f5f5f5", borderRadius: 2, maxWidth: 400, mx: "auto" }}>
        <Typography variant="h5" sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" } }} gutterBottom>
          Enter Your Access Code
        </Typography>
        <TextField
          label="Access Code"
          variant="outlined"
          fullWidth
          sx={{ my: 2 }}
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          inputProps={{ style: { textAlign: "center" } }}
        />
        <Button variant="contained" color="secondary" onClick={handleAccessCodeSubmit} sx={{ width: "100%", py: 1.5 }}>
          Enter
        </Button>
        {error && <Typography sx={{ mt: 2, color: "red", fontSize: "0.9rem" }}>{error}</Typography>}
      </Box>
    </Container>
  );
}
