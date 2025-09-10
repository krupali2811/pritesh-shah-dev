import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
// import { TbEye, TbEyeClosed } from "react-icons/tb";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import { useBoolean } from "../../hooks/use-boolean";
import { useRouter } from "../../routes/hooks/use-router";
import { paths } from "../../routes/paths";
import useTheme from "../../hooks/useTheme";
// import PhoneInput from "../../components/phone-input";
import axiosInstance, { endpoints } from "../../utils/axios";

const ForgotPassword = () => {
  const { headerHeight, headerRef } = useTheme();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const formStep = useBoolean(1);
  const showPasswordEmail = useBoolean();
  const showPasswordPhone = useBoolean();
  const otpStatus = useBoolean();
  const resendOtp = useBoolean(true);

  const [phoneNumber, setPhoneNumber] = useState("");

  // Step 1: Only email or phone is required
  const step1Schema = z
    .object({
      email: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),
      phone: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
        .optional()
        .or(z.literal("")),
      code: z.string().optional(),
      password: z.string().optional(),
    })
    .refine((data) => data.email || data.phone, {
      message: "Either email or phone is required",
      path: ["email"],
    });

  // Step 2: All fields required and validated
  const step2Schema = z
    .object({
      email: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),
      phone: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
        .optional()
        .or(z.literal("")),
      code: z
        .string()
        .min(6, "Verification code must be at least 6 characters long"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
    })
    .refine((data) => data.email || data.phone, {
      message: "Either email or phone is required",
      path: ["email"],
    });

  const schema = formStep.value === 1 ? step1Schema : step2Schema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { code: "", email: "", password: "", phone: "" },
  });

  const onSubmit = async (data) => {
    if (formStep.value === 1) {
      // Step 1: Send OTP
      otpStatus.onTrue();
      resendOtp.onTrue();

      try {
        const response = await axiosInstance.post(
          endpoints.auth.requestForgotPasswordOtp,
          {
            identifier: data.email || data.phone,
          }
        );

        toast.success(response.data?.message);

        if (response.data.success) {
          formStep.setValue(2);
        }
      } catch (error) {
        toast.error(error?.message || "Error while sending OTP");
        console.error(error?.message);
      } finally {
        otpStatus.onFalse();
        resendOtp.onFalse();
      }
    } else if (formStep.value === 2) {
      // Step 2: Submit OTP and new password
      try {
        const response = await axiosInstance.post(
          endpoints.auth.forgotPassword,
          {
            identifier: data.email || data.phone,
            otp: data.code,
            new_password: data.password,
          }
        );

        toast.success(response.data?.message);

        if (response?.data?.status === 200) {
          router.push(paths.auth.jwt.signIn);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error verifying OTP");
        console.error(error);
        resendOtp.onFalse();
      }
    }
  };

  const handleSendOtp = async () => {
    otpStatus.onTrue();
    resendOtp.onTrue();
    try {
      const response = await axiosInstance.post(
        endpoints.auth.requestForgotPasswordOtp,
        {
          identifier: getValues("email") || getValues("phone"),
        }
      );
      toast.success(response.data?.message);
      if (response.data.success) {
        formStep.setValue(2);
        otpStatus.onFalse();
      }
    } catch (error) {
      toast.error(error.message || "Error while sending otp");
      otpStatus.onFalse();
      resendOtp.onFalse();
      console.error(error);
    }
  };

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
        <div className="form-forgot-password w-100 m-auto">
          <form
            className="card rounded-24"
            id="msform"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="form-title ff-bold text-white text-center mb-50">
              Forgot Password
            </h1>

            <div className="mb-20">
              <input
                {...register("email")}
                className="form-control"
                type="email"
                placeholder="name@example.com"
              />
              {errors.email && (
                <p className="error small mt-1">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-login w-100"
              disabled={otpStatus.value}
            >
              {otpStatus.value ? "Sending..." : "Send OTP"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
