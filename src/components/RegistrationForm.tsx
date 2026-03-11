import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ENDPOINTS } from "../api/endpoints";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  styled,
  Card as MuiCard,
  Stack,
  FormControl,
  FormLabel,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
}

interface RegistrationResponse {
  id?: string;
  errorMessage?: string;
  message?: string;
}

function RegistrationForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegistrationData>({
    email: "",
    firstName: "",
    lastName: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch(ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: RegistrationResponse = await response.json();

      if (response.ok) {
        navigate("/login", { state: { registered: true } });
      } else {
        const errorMessage =
          data.errorMessage ||
          data.message ||
          `${t("registration_error")} ${response.status}`;
        setMessage(errorMessage);
      }
    } catch (error: any) {
      console.error("Ошибка:", error);
      setMessage(error?.message || t("network_error"));
    }
  };

  return (
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {t("register_title")}
          </Typography>

          {message && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            
            <FormControl>
              <StyledFormLabel htmlFor="email">{t("email")}</StyledFormLabel>
              <StyledTextField
                type="email"
                name="email"
                placeholder={t("email_placeholder")}
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>

            <FormControl>
              <StyledFormLabel htmlFor="firstName">
                {t("first_name")}
              </StyledFormLabel>
              <StyledTextField
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={t("first_name_placeholder")}
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color="primary"
              />
            </FormControl>

            <FormControl>
              <StyledFormLabel htmlFor="lastName">
                {t("last_name")}
              </StyledFormLabel>
              <StyledTextField
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={t("last_name_placeholder")}
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color="primary"
              />
            </FormControl>

            <FormControlLabel
              control={
                <StyledCheckbox
                  disableRipple
                  indeterminateIcon={
                    <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />
                  }
                  icon={
                    <CheckBoxOutlineBlankRoundedIcon
                      sx={{ color: "hsla(210, 0%, 0%, 0.0)" }}
                    />
                  }
                  checkedIcon={
                    <CheckRoundedIcon sx={{ height: 14, width: 14 }} />
                  }
                  value="remember"
                  color="primary"
                />
              }
              label={t("check_label")}
            />
            <ForgotPassword open={openModal} handleClose={handleClose} />
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {t("register_button")}
            </StyledButton>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              {t("forgot_password")}
            </Link>
          </Box>
        </Card>
      </SignInContainer>
  );
}

export const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    minWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100dvh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  ...theme.typography.caption
}));

const gray = {
  50: "hsl(220, 35%, 97%)",
  100: "hsl(220, 30%, 94%)",
  200: "hsl(220, 20%, 88%)",
  300: "hsl(220, 20%, 80%)",
  400: "hsl(220, 20%, 65%)",
  500: "hsl(220, 20%, 42%)",
  600: "hsl(220, 20%, 35%)",
  700: "hsl(220, 20%, 25%)",
  800: "hsl(220, 30%, 6%)",
  900: "hsl(220, 35%, 3%)",
};

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "8px 12px",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    transition: "border 120ms ease-in",

    "&:hover": {
      borderColor: theme.palette.grey[400],
    },

    "&.Mui-focused": {
      outline: `3px solid ${alpha(theme.palette.primary.main, 0.3)}`,
      borderColor: theme.palette.primary.main,
    },

    "& input": {
      padding: 0,

      "&::placeholder": {
        opacity: 0.7,
        color: theme.palette.grey[500],
      },
    },

    "& fieldset": {
      border: "none",
    },
  },

  "& .MuiInputBase-sizeSmall": {
    height: "2.25rem",
  },

  "& .MuiInputBase-sizeMedium": {
    height: "2.5rem",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  ...(theme.palette.mode === "light" && {
    color: "white",
    backgroundColor: gray[900],
    backgroundImage: `linear-gradient(to bottom, ${gray[700]}, ${gray[800]})`,
    boxShadow: `inset 0 1px 0 ${gray[600]}, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
    border: `1px solid ${gray[700]}`,

    "&:hover": {
      backgroundImage: "none",
      backgroundColor: gray[700],
      boxShadow: "none",
    },

    "&:active": {
      backgroundColor: gray[800],
    },
  }),

  ...(theme.palette.mode === "dark" && {
    color: "white",
    backgroundColor: gray[700],
    backgroundImage: `linear-gradient(to bottom, ${gray[600]}, ${gray[700]})`,
    border: `1px solid ${gray[600]}`,
    boxShadow: `inset 0 1px 0 ${gray[500]}`,

    "&:hover": {
      backgroundImage: "none",
      backgroundColor: gray[600],
      boxShadow: "none",
    },

    "&:active": {
      backgroundColor: gray[700],
    },
  }),
}));

const brand = {
  50: "hsl(210, 100%, 95%)",
  100: "hsl(210, 100%, 92%)",
  200: "hsl(210, 100%, 80%)",
  300: "hsl(210, 100%, 65%)",
  400: "hsl(210, 98%, 48%)",
  500: "hsl(210, 98%, 42%)",
  600: "hsl(210, 98%, 55%)",
  700: "hsl(210, 100%, 35%)",
  800: "hsl(210, 100%, 16%)",
  900: "hsl(210, 100%, 21%)",
};

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  margin: 10,
  height: 16,
  width: 16,
  borderRadius: 5,
  border: "1px solid ",
  borderColor: alpha(gray[300], 0.8),
  boxShadow: "0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset",
  backgroundColor: alpha(gray[100], 0.4),
  transition: "border-color, background-color, 120ms ease-in",
  "&:hover": {
    borderColor: brand[300],
  },
  "&.Mui-focusVisible": {
    outline: `3px solid ${alpha(brand[500], 0.5)}`,
    outlineOffset: "2px",
    borderColor: brand[400],
  },
  "&.Mui-checked": {
    color: "white",
    backgroundColor: brand[500],
    borderColor: brand[500],
    boxShadow: `none`,
    "&:hover": {
      backgroundColor: brand[600],
    },
  },
  ...theme.applyStyles("dark", {
    borderColor: alpha(gray[700], 0.8),
    boxShadow: "0 0 0 1.5px hsl(210, 0%, 0%) inset",
    backgroundColor: alpha(gray[900], 0.8),
    "&:hover": {
      borderColor: brand[300],
    },
    "&.Mui-focusVisible": {
      borderColor: brand[400],
      outline: `3px solid ${alpha(brand[500], 0.5)}`,
      outlineOffset: "2px",
    },
  }),
}));

export default RegistrationForm;
