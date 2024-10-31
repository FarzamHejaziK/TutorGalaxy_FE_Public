import React, { useState } from "react";
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress
} from "@mui/material";
import { useTranslation } from "react-i18next";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { jwtKey } from "../data/websiteInfo";

export default function EmailLogin({ chatId }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { setAuth } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(`/login/email`, {
        email: email,
        chatId: chatId
      });

      if (result.data?.access_token) {
        await localStorage.setItem(jwtKey, result.data.access_token);
        setAuth({ ...result.data, token: result.data.access_token });
        
        if (chatId) {
          router.push(`/chat/${chatId}`);
        } else {
          router.push("/");
        }
      }
      setOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        fullWidth
        onClick={() => setOpen(true)}
        sx={{
          fontSize: "16px",
          color: "#fff",
          backgroundColor: "#000",
          borderRadius: "16px",
          fontWeight: 700,
          textTransform: "none",
          padding: "10px",
          "&:hover": {
            backgroundColor: "#000",
          },
        }}
      >
        {t("login.emailSignIn")}
      </Button>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "8px",
            width: "400px",
            p: "24px"
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: "center",
          fontSize: "18px",
          fontWeight: 600,
          p: 0,
          mb: 3
        }}>
          {t("login.emailSignIn")}
        </DialogTitle>
        
        <DialogContent sx={{ p: 0 }}>
          <TextField
            autoFocus
            fullWidth
            placeholder={t("login.enterEmail")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            variant="outlined"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
              }
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 0 }}>
          <Button 
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              fontSize: "16px",
              color: "#fff", 
              backgroundColor: "#000",
              borderRadius: "4px",
              fontWeight: 500,
              textTransform: "none",
              padding: "10px",
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              t("login.LoginWithEmail")
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 