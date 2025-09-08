import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import { useBoolean } from "../../hooks/use-boolean";
import { useRouter } from "../../routes/hooks/use-router";
import { paths } from "../../routes/paths";
import useTheme from "../../hooks/useTheme";
import PhoneInput from "../../components/phone-input";
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
      <main className="main vh-100 login-main">
        <div
          className="main-content w-100 ms-0 py-5"
          style={{ minHeight: `calc((100vh - 20px) - ${headerHeight}px)` }}
        >
          <div className="form-login mx-auto">
            <div className="container">
              <div className="row g-5">
                <div className="col-lg-5 order-2 order-lg-1">
                  <h1 className="form-title mb-3 mb-md-5">Forgot Password</h1>
                  <div id="tabs" className="login-tab">
                    <div className="tab-content" id="loginTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="Email-tab-pane"
                        role="tabpanel"
                        aria-labelledby="Email-tab"
                        tabIndex="0"
                      >
                        <form id="msform" onSubmit={handleSubmit(onSubmit)}>
                          {formStep.value === 1 && (
                            <>
                              <div className="mb-20">
                                <div className="input-group">
                                  <span className="input-group-text">
                                    <i className="bi bi-envelope-fill"></i>
                                  </span>
                                  <input
                                    {...register("email")}
                                    className="form-control"
                                    type="email"
                                    placeholder="name@example.com"
                                  />
                                  <span
                                    className="input-group-text"
                                    onClick={() => setValue("email", "")}
                                  >
                                    <i className="bi bi-x-circle-fill clear"></i>
                                  </span>
                                </div>
                                {errors.email && (
                                  <p className="error small mt-1">
                                    {errors.email.message}
                                  </p>
                                )}
                              </div>

                              <button
                                type="submit"
                                className="btn btn-primary btn-login w-100 mb-3"
                                disabled={otpStatus.value}
                              >
                                {otpStatus.value ? "Sending..." : "Send OTP"}
                              </button>
                            </>
                          )}
                          {formStep.value === 2 && (
                            <>
                              <div className="mb-20">
                                <div className="input-group password-field">
                                  <span className="input-group-text">
                                    <i className="bi bi-lock-fill"></i>
                                  </span>
                                  <input
                                    {...register("password")}
                                    className="form-control"
                                    type={
                                      showPasswordEmail.value
                                        ? "text"
                                        : "password"
                                    }
                                    placeholder="Enter New Password"
                                  />
                                  <span
                                    className="input-group-text"
                                    onClick={showPasswordEmail.onToggle}
                                  >
                                    {showPasswordEmail.value ? (
                                      <TbEye />
                                    ) : (
                                      <TbEyeClosed />
                                    )}
                                  </span>
                                </div>
                                {errors.password && (
                                  <p className="error small mt-1">
                                    {errors.password.message}
                                  </p>
                                )}
                              </div>
                              <div className="mb-20">
                                <div className="input-group">
                                  <span className="input-group-text">
                                    <i className="bi bi-key-fill"></i>
                                  </span>
                                  <input
                                    {...register("code")}
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter verification code"
                                  />
                                  <span className="input-group-text">
                                    <button
                                      type="button"
                                      className="btn btn-link"
                                      onClick={handleSendOtp}
                                      disabled={resendOtp.value}
                                    >
                                      resend
                                    </button>
                                  </span>
                                </div>
                                {errors.code && (
                                  <p className="error small mt-1">
                                    {errors.code.message}
                                  </p>
                                )}
                              </div>

                              <button
                                type="submit"
                                className="btn btn-primary btn-login w-100 mb-3"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Verifying..." : "Verify"}
                              </button>
                            </>
                          )}
                        </form>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="Mobile-tab-pane"
                        role="tabpanel"
                        aria-labelledby="Mobile-tab"
                        tabIndex="0"
                      >
                        <form
                          className=""
                          id="msform"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          {formStep.value === 1 && (
                            <>
                              <PhoneInput
                                name="phone"
                                register={register}
                                setValue={setValue}
                                errors={errors}
                                phoneNumber={phoneNumber}
                                setPhoneNumber={setPhoneNumber}
                              />
                              {errors.phone && (
                                <p className="error small mt-1">
                                  {errors.phone.message}
                                </p>
                              )}
                              <button
                                type="submit"
                                className="btn btn-primary btn-login w-100 mb-3"
                                onClick={handleSendOtp}
                                disabled={otpStatus.value}
                              >
                                {otpStatus.value ? "Sending..." : "Send OTP"}
                              </button>
                            </>
                          )}
                          {formStep.value === 2 && (
                            <>
                              <div className="mb-20">
                                <div className="input-group password-field">
                                  <span className="input-group-text">
                                    <i className="bi bi-lock-fill"></i>
                                  </span>
                                  <input
                                    name="password"
                                    className="form-control"
                                    type={
                                      showPasswordPhone.value
                                        ? "text"
                                        : "password"
                                    }
                                    placeholder="Password"
                                    onChange={(e) =>
                                      setValue("password", e.target.value)
                                    }
                                  />
                                  <span
                                    className="input-group-text"
                                    onClick={showPasswordPhone.onToggle}
                                  >
                                    {showPasswordPhone.value ? (
                                      <TbEye />
                                    ) : (
                                      <TbEyeClosed />
                                    )}
                                  </span>
                                </div>
                                {errors.password && (
                                  <p className="error small mt-1">
                                    {errors.password.message}
                                  </p>
                                )}
                              </div>
                              <div className="mb-20">
                                <div className="input-group">
                                  <span className="input-group-text">
                                    <i className="bi bi-key-fill"></i>
                                  </span>
                                  <input
                                    name="code"
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter verification code"
                                    onChange={(e) =>
                                      setValue("code", e.target.value)
                                    }
                                  />
                                  <span className="input-group-text">
                                    <button
                                      type="button"
                                      className="btn btn-link"
                                      onClick={handleSendOtp}
                                      disabled={resendOtp.value}
                                    >
                                      resend
                                    </button>
                                  </span>
                                </div>
                                {errors.code && (
                                  <p className="error small mt-1">
                                    {errors.code.message}
                                  </p>
                                )}
                              </div>

                              <button
                                type="submit"
                                className="btn btn-primary btn-login w-100 mb-3"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Verifying..." : "Verify"}
                              </button>
                            </>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
