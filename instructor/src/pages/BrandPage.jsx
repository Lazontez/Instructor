import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import CryptoJS from "crypto-js";
import heroImage from '../assets/brandPage/guitar_instructorpro.jpg'; 

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
    <Container maxWidth="lg" sx={{ textAlign: "center", py: 5, px: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "grey",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.6)", 
            borderRadius: 3,
            padding: 4,
            maxWidth: 400,
            width: "100%",
            boxShadow: 3,
          }}
        >
          <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "3rem" }, fontWeight: "bold", color: "white" }}>
            Master Your Guitar Skills
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, maxWidth: "600px", mx: "auto", color: "white" }}>
            Track your practice, set goals, and level up your playing with our intuitive app.
          </Typography>
          <Box sx={{ mt: 4, p: 3, backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
              Enter Your Access Code
            </Typography>
            <TextField
              label="Access Code"
              variant="filled"
              fullWidth
              sx={{ my: 2, backgroundColor: "white", borderRadius: 1 }}
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              inputProps={{ style: { textAlign: "center" } }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAccessCodeSubmit}
              sx={{ width: "100%", py: 1.5 }}
            >
              Enter
            </Button>
            {error && <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>}
          </Box>
        </Box>
      </Box>

      {/* About Section */}
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold">
          About the App
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph sx={{ maxWidth: "800px", mx: "auto", mt: 2 }}>
          Our app helps guitar players of all levels track their practice, achieve their goals, and take their skills to
          the next level. Whether you're a beginner or a seasoned musician, our personalized plans and progress tracking
          will keep you motivated and on the right path.
        </Typography>
      </Box>
      
      <Grid container spacing={3} sx={{ mt: 5 }}>
        {[ 
          { title: "Goal Tracking", desc: "Set and track your guitar practice goals easily." },
          { title: "Personalized Plans", desc: "AI-driven recommendations for faster progress." },
          { title: "Teacher Mode", desc: "Great for instructors managing student progress." },
        ].map((feature, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                p: 3,
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "#f8f9fa",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {feature.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

