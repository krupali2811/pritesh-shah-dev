import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import IntlTelInput from "intl-tel-input/react";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import { useBoolean } from "../../hooks/use-boolean";
import PhoneInput from "../../components/phone-input";
import { paths } from "../../routes/paths";
import useTheme from "../../hooks/useTheme";
import axiosInstance, { endpoints } from "../../utils/axios";
import { useRouter } from "../../routes/hooks/use-router";
import { useCloseAllModals } from "../../hooks/use-close-modals";

const Register = () => {
  const { headerHeight, headerRef } = useTheme();
  const router = useRouter();

  const closeAllModals = useCloseAllModals();

  const showPasswordEmail = useBoolean();
  const showPasswordPhone = useBoolean();
  const stayLoggedIn = useBoolean();
  const popoverVisible = useBoolean();

  // Telegram
  const otpStatus = useBoolean();
  const verifyOtpStatus = useBoolean();
  const [phone, setPhone] = useState(null);
  const [params, setParams] = useState({
    phone_number: "",
    phone_code_hash: "",
    user_id: "",
  });
  const [country, setCountry] = useState("us");

  const { login, getUserData, dispatch, isAuthenticated } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const loginSchema = z
    .object({
      email: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")), // Allows empty string

      phone: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
        .optional()
        .or(z.literal("")), // Allows empty string

      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
    })
    .refine((data) => data.email || data.phone, {
      message: "Either email or phone number is required",
      path: ["email"], // Show error on email
    })
    .refine((data) => data.email || data.phone, {
      message: "Either email or phone number is required",
      path: ["phone"], // Show error on phone
    });

  const defaultValues = {
    email: "",
    password: "",
    phone: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.log(error);
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    const getIp = async () => {
      try {
        const resp = await fetch("https://api.country.is/");
        const data = await resp.json();
        setCountry(data?.country?.toLowerCase()); // Ensure lowercase country code
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    getIp();
  }, []);

  const handleSendOtp = async () => {
    otpStatus.onTrue();
    try {
      if (!phone) {
        toast.error("Please enter a valid phone number");
        otpStatus.onFalse();
        return;
      }
      const response = await axiosInstance.post(endpoints.auth.telegram, {
        phone_number: phone,
      });
      const data = response.data?.data;
      toast.success(response.data?.message);
      if (response.data.status === 200) {
        otpStatus.onFalse();
        setParams({
          phone_number: data?.phone_number,
          phone_code_hash: data?.phone_code_hash,
          user_id: data?.user_id,
        });
      }
    } catch (error) {
      toast.error(error.message);
      otpStatus.onFalse();
      console.error(error);
    }
  };

  const handleVerifyOtp = async (code) => {
    verifyOtpStatus.onTrue();
    if (!code) {
      toast.error("Please enter a valid OTP");
      verifyOtpStatus.onFalse();
      return;
    }
    try {
      const response = await axiosInstance.post(endpoints.auth.telegramVerify, {
        phone_number: params.phone_number,
        code: code,
        phone_code_hash: params.phone_code_hash,
        user_id: params.user_id,
      });
      const data = response.data;
      const token = data.access;
      toast.success(data?.message);
      if (data.status === 200) {
        await dispatch({ type: "LOGIN", payload: { data: data } });
        console.log(token);
        getUserData(token);
        closeAllModals();
        router.push(paths.dashboard.root);
        verifyOtpStatus.onFalse();
      }
    } catch (error) {
      toast.error(error.message);
      verifyOtpStatus.onFalse();
      console.error(error);
    }
  };

  useEffect(() => {
    setValue("password", password);
  }, [password, setValue]);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(paths.dashboard.root); // use replace to avoid going back to landing
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <Helmet>
        <title>Pritesh Shah | Investment Advisor</title>
      </Helmet>

      <main className="d-flex align-items-center justify-content-center vh-100 bg-main">
        <div className="form-login w-100 m-auto">
          <form
            className="card rounded-24"
            id="msform"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="form-title ff-bold text-white text-center mb-20">
              Login
            </h1>
            <p className="form-head mb-40 text-center">
              Please enter your details to login
            </p>
            <div className="mb-30">
              <label className="form-label" style={{ textTransform: "none" }}>
                Email or Username
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter your email or username"
                required
                value={watch("email")}
                onChange={(e) => setValue("email", e.target.value)}
              />
              {errors.email && (
                <p className="error small mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-12">
              <label className="form-label">Password</label>
              <div className="password-field position-relative">
                <input
                  name="password"
                  className="form-control"
                  type={showPasswordEmail.value ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="cursor-pointer toggleEye"
                  onClick={showPasswordEmail.onToggle}
                >
                  {showPasswordEmail.value ? <TbEye /> : <TbEyeClosed />}
                </span>
              </div>
              {errors.password && (
                <p className="error small mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-5 d-flex justify-content-between align-items-center">
              <div>
                <input
                  className="form-check-input"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label className="ms-2 text-white" htmlFor="remember-me">
                  Remember me
                </label>
              </div>

              <Link to={paths.auth.jwt.forgotPassword} className="btn btn-link">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-login w-100 mb-20"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging..." : "Log In"}
            </button>

            <div>
              <p className="text-center f-16 ff-regular">
                Don't have an account?
                <Link
                  to={paths.auth.jwt.register}
                  className="btn btn-link ff-bold text-white"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
