import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  useTheme,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    console.log("=== FRONTEND LOGIN DEBUG ===");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      console.log("Calling login API...");
      console.log("Login function:", login);
      console.log("Login function type:", typeof login);
      
      // Try direct fetch as a fallback
      console.log("Trying direct fetch as test...");
      const directResponse = await fetch('https://movies-app-production-ff8a.up.railway.app/api/v1/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      console.log("Direct fetch response:", directResponse);
      console.log("Direct fetch status:", directResponse.status);
      
      if (directResponse.ok) {
        const directData = await directResponse.json();
        console.log("Direct fetch data:", directData);
        console.log("Direct fetch data structure:", JSON.stringify(directData, null, 2));
        
        // Store token if found
        if (directData.token) {
          localStorage.setItem("token", directData.token);
          console.log("Token stored from direct fetch:", directData.token);
        }
        
        // Set credentials and navigate
        dispatch(setCredentials(directData));
        navigate(redirect);
        return;
      }
      
      // If direct fetch fails, try RTK Query
      console.log("Direct fetch failed, trying RTK Query...");
      const res = await login({ email, password }).unwrap();
      console.log("Login response received:", res);
      console.log("Response structure:", JSON.stringify(res, null, 2));
      
      console.log("Dispatching setCredentials...");
      dispatch(setCredentials({ ...res }));
      console.log("Credentials set, navigating to:", redirect);
      
      navigate(redirect);
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error details:", JSON.stringify(err, null, 2));
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)',
          py: 4,
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 500,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
              Sign In
            </Typography>

            <Box component="form" onSubmit={submitHandler}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.divider,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.divider,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', mb: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>

                {isLoading && (
                  <Box sx={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }}>
                    <Loader />
                  </Box>
                )}
              </Box>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                New Customer?{" "}
                <Button
                  component={Link}
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  variant="text"
                  sx={{
                    color: theme.palette.primary.main,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Register
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
