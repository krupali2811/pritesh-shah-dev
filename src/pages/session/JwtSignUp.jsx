import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import IntlTelInput from "intl-tel-input/react";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import { useBoolean } from "../../hooks/use-boolean";
import { useRouter } from "../../routes/hooks/use-router";
import PhoneInput from "../../components/phone-input";
import { paths } from "../../routes/paths";
import useTheme from "../../hooks/useTheme";
import axiosInstance, { endpoints } from "../../utils/axios";

const SignUp = () => {
  const { headerHeight, headerRef } = useTheme();

  const { signUp, getUserData, dispatch, isAuthenticated } = useAuth();
  const router = useRouter();
  const { ref } = router.query;

  const password = useBoolean();
  const confirm_password = useBoolean();
  const stayLoggedIn = useBoolean();
  const showReferralMobile = useBoolean();
  const showReferral = useBoolean();
  const [stepEmail, setStepEmail] = useState(2);
  const [stepPhone, setStepPhone] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Telegram
  const otpStatus = useBoolean();
  const verifyOtpStatus = useBoolean();
  const telegramModalStep = useBoolean(1);
  const [phone, setPhone] = useState("");
  const [params, setParams] = useState({
    phone_number: "",
    phone_code_hash: "",
    user_id: "",
  });
  const [country, setCountry] = useState("us");

  const SignUpSchema = z
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

      confirm_password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),

      referral_code: z.string().optional(),
    })
    .refine((data) => data.email || data.phone, {
      message: "Either email or phone number is required",
      path: ["email"], // Show error on email
    })
    .refine((data) => data.email || data.phone, {
      message: "Either email or phone number is required",
      path: ["phone"], // Show error on phone
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"],
    });

  const defaultValues = {
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    referral_code: ref || "",
  };
  // console.log(ref)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });
  console.log(watch("referral_code"));
  const onSubmit = async (data) => {
    try {
      await signUp(data);
    } catch (error) {
      console.log(error);
      // navigate("/");
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
      const response = await axiosInstance.post(endpoints.auth.telegram, {
        phone_number: phone,
      });
      const data = response.data?.data;
      toast.success(response.data?.message);
      if (response.data.status === 200) {
        telegramModalStep.setValue(2);
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
        const modal = document.getElementById("loginTelegramModal");
        if (modal) {
          modal.classList.remove("show"); // Remove Bootstrap "show" class
          modal.style.display = "none"; // Hide modal
          modal.setAttribute("aria-hidden", "true"); // Mark modal as hidden
        }
        telegramModalStep.setValue(1);
        await dispatch({ type: "LOGIN", payload: { data: data } });
        getUserData(token);
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
          // style={{ minHeight: `calc((100vh - 20px) - ${headerHeight}px)` }}
        >
          <div className="form-login mx-auto">
            <div className="container">
              <div className="row g-5">
                <div className="col-lg-5 order-2 order-lg-1">
                  <h1 className="form-title mb-3 mb-md-5">Sign Up</h1>
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
                          {stepEmail === 1 && (
                            <fieldset>
                              <div className="input-group mb-20">
                                <span className="input-group-text">
                                  <i className="bi bi-envelope-fill"></i>
                                </span>
                                <input
                                  name="email"
                                  className="form-control"
                                  type="email"
                                  placeholder="name@example.com"
                                  {...register("email")}
                                />
                                <span
                                  className="input-group-text"
                                  onClick={() => setValue("email", "")}
                                >
                                  <i className="bi bi-x-circle-fill clear"></i>
                                </span>
                              </div>
                              <div className="form-check mb-20 ps-0 d-flex align-items-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="referralCode"
                                  defaultChecked={showReferral.value}
                                  onClick={showReferral.onToggle}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="referralCode"
                                >
                                  Enter Referral Code (Optional)
                                </label>
                              </div>

                              {showReferral.value && (
                                <div className="mb-30" id="referralCodeInput">
                                  <input
                                    name="referral_code"
                                    type="text"
                                    className="form-control referralCodeInput"
                                    placeholder="Enter Referral Code"
                                    // {...register("referral_code")}
                                  />
                                </div>
                              )}

                              <button
                                type="button"
                                className="next action-button btn btn-primary btn-login w-100 mb-3 mb-lg-5"
                                onClick={() => setStepEmail(2)}
                              >
                                Next
                              </button>
                              <div className="loginWithTitle mb-3 mb-lg-4">
                                <span>or log in with</span>
                              </div>

                              <ul className="loginWithSocial">
                                <li>
                                  <Link to="#">
                                    <img
                                      src="/assets/images/google.svg"
                                      alt="Google"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <img
                                      src="/assets/images/apple.svg"
                                      alt="Apple"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <img
                                      src="/assets/images/metamask.svg"
                                      alt="Metamask"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    // to={paths.auth.jwt.telegram}
                                    data-bs-toggle="modal"
                                    data-bs-target="#signUpTelegramModal"
                                  >
                                    <img
                                      src="/assets/images/telegram.svg"
                                      alt="Telegram"
                                    />
                                  </Link>
                                </li>
                              </ul>
                              <div className="text-center my-4">
                                <span>Already account? </span>
                                <Link to={paths.auth.jwt.signIn}>
                                  <span className="text-primary">
                                    Login Now!
                                  </span>
                                </Link>
                              </div>
                            </fieldset>
                          )}

                          {stepEmail === 2 && (
                            <fieldset>
                              <div className="mb-20">
                                <div className="input-group">
                                  <span className="input-group-text">
                                    <i className="bi bi-envelope-fill"></i>
                                  </span>
                                  <input
                                    name="email"
                                    className="form-control"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={watch("email")}
                                    onChange={(e) =>
                                      setValue("email", e.target.value)
                                    }
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

                              <div className="mb-20">
                                <div className="input-group password-field">
                                  <span className="input-group-text">
                                    <i className="bi bi-lock-fill"></i>
                                  </span>
                                  <input
                                    name="password"
                                    className="form-control"
                                    type={password.value ? "text" : "password"}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    {...register("password")}
                                  />
                                  <span
                                    className="input-group-text"
                                    onClick={password.onToggle}
                                  >
                                    {password.value ? (
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
                                <div className="input-group password-field">
                                  <span className="input-group-text">
                                    <i className="bi bi-lock-fill"></i>
                                  </span>
                                  <input
                                    name="confirm_password"
                                    className="form-control"
                                    type={
                                      confirm_password.value
                                        ? "text"
                                        : "password"
                                    }
                                    placeholder="Confirm Password"
                                    autoComplete="current-password"
                                    {...register("confirm_password")}
                                  />
                                  <span
                                    className="input-group-text"
                                    onClick={confirm_password.onToggle}
                                  >
                                    {confirm_password.value ? (
                                      <TbEye />
                                    ) : (
                                      <TbEyeClosed />
                                    )}
                                  </span>
                                </div>
                                {errors.confirm_password && (
                                  <p className="error small mt-1">
                                    {errors.confirm_password.message}
                                  </p>
                                )}
                              </div>

                              {/* <div className="form-check mb-3 mb-md-5 ps-0 d-flex align-items-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="stayLoggedInEmail"
                                  defaultChecked={stayLoggedIn.value}
                                  onClick={stayLoggedIn.onToggle}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="stayLoggedInEmail"
                                >
                                  Stay logged in on this device for 5 days
                                </label>
                              </div> */}
                              <div className="form-check mb-20 ps-0 d-flex align-items-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="referralCodeMobile"
                                  id="referralCodeMobile"
                                  defaultChecked={showReferralMobile.value} // or use state management here
                                  onClick={showReferralMobile.onToggle}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="referralCodeMobile"
                                >
                                  Enter Referral Code (Optional){" "}
                                </label>
                              </div>
                              {showReferralMobile.value && (
                                <div
                                  className="mb-30"
                                  id="referralCodeMobileInput"
                                >
                                  <input
                                    name="referral_code"
                                    type="text"
                                    className="form-control referralCodeMobileInput"
                                    placeholder="Enter Referral Code"
                                    {...register("referral_code")}
                                  />
                                </div>
                              )}

                              <button
                                type="submit"
                                className="btn btn-primary btn-login w-100 mb-3"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Signing..." : "Sign Up"}
                              </button>

                              {/* <div className="">
                                <Link to="#" className="btn btn-link">143.110.183.60,13.235.84.62
                                  Forgot password?
                                </Link>
                              </div> */}
                              <div className="text-center mt-4">
                                <span>Already account? </span>
                                <Link to={paths.auth.jwt.signIn}>
                                  <span className="text-primary">
                                    Login Now!
                                  </span>
                                </Link>
                              </div>
                            </fieldset>
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
                          {stepPhone === 1 && (
                            <fieldset>
                              <PhoneInput
                                name="phone"
                                register={register}
                                setValue={setValue}
                                errors={errors}
                                phoneNumber={phoneNumber}
                                setPhoneNumber={setPhoneNumber}
                              />

                              <div className="form-check mb-20 ps-0 d-flex align-items-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="referralCodeMobile"
                                  id="referralCodeMobile"
                                  defaultChecked={showReferralMobile.value} // or use state management here
                                  onClick={showReferralMobile.onToggle}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="referralCodeMobile"
                                >
                                  Enter Referral Code (Optional){" "}
                                </label>
                              </div>
                              {showReferralMobile.value && (
                                <div
                                  className="mb-30"
                                  id="referralCodeMobileInput"
                                >
                                  <input
                                    type="text"
                                    className="form-control referralCodeMobileInput"
                                    placeholder="Enter Referral Code"
                                  />
                                </div>
                              )}

                              <button
                                type="button"
                                className="next action-button btn btn-primary btn-login w-100 mb-3 mb-lg-5"
                                onClick={() => setStepPhone(2)}
                              >
                                Next
                              </button>
                              <div className="loginWithTitle mb-3 mb-lg-5">
                                <span>or Sign In with</span>
                              </div>

                              <ul className="loginWithSocial">
                                <li>
                                  <Link to="#">
                                    <img
                                      src="/assets/images/google.svg"
                                      alt="Google"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <img
                                      src="/assets/images/apple.svg"
                                      alt="Apple"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <img
                                      src="/assets/images/metamask.svg"
                                      alt="Metamask"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    // to={paths.auth.jwt.telegram}
                                    data-bs-toggle="modal"
                                    data-bs-target="#signUpTelegramModal"
                                  >
                                    <img
                                      src="/assets/images/telegram.svg"
                                      alt="Telegram"
                                    />
                                  </Link>
                                </li>
                              </ul>

                              <div className="text-center mt-4">
                                <span>Already account? </span>
                                <Link to={paths.auth.jwt.signIn}>
                                  <span className="text-primary">
                                    Login Now!
                                  </span>
                                </Link>
                              </div>
                            </fieldset>
                          )}
                          {stepPhone === 2 && (
                            <fieldset>
                              <PhoneInput
                                name="phone"
                                register={register}
                                setValue={setValue}
                                errors={errors}
                                phoneNumber={phoneNumber}
                                setPhoneNumber={setPhoneNumber}
                              />
                              <div className="mb-20">
                                <div className="input-group password-field">
                                  <span className="input-group-text">
                                    <i className="bi bi-lock-fill"></i>
                                  </span>
                                  <input
                                    className="form-control"
                                    id="currentPassword-phone"
                                    type={password.value ? "text" : "password"}
                                    placeholder="**********"
                                    autoComplete="current-password"
                                    {...register("password")}
                                  />

                                  <span
                                    className="input-group-text"
                                    onClick={password.onToggle}
                                  >
                                    {password.value ? (
                                      <TbEye />
                                    ) : (
                                      <TbEyeClosed />
                                    )}

                                    {/* <i className="bi bi-x-circle-fill clear"></i> */}
                                  </span>
                                </div>
                                {errors.password && (
                                  <p className="error small mt-1">
                                    {errors.password.message}
                                  </p>
                                )}
                              </div>

                              <div className="mb-20">
                                <div className="input-group password-field">
                                  <span className="input-group-text">
                                    <i className="bi bi-lock-fill"></i>
                                  </span>
                                  <input
                                    name="confirm_password"
                                    className="form-control"
                                    type={
                                      confirm_password.value
                                        ? "text"
                                        : "confirm_password"
                                    }
                                    placeholder="**********"
                                    autoComplete="current-password"
                                    {...register("confirm_password")}
                                  />
                                  <span
                                    className="input-group-text"
                                    onClick={password.onToggle}
                                  >
                                    {password.value ? (
                                      <TbEye />
                                    ) : (
                                      <TbEyeClosed />
                                    )}
                                  </span>
                                </div>
                                {errors.confirm_password && (
                                  <p className="error small mt-1">
                                    {errors.confirm_password.message}
                                  </p>
                                )}
                              </div>

                              {/* <div className="form-check mb-3 mb-md-5 ps-0 d-flex align-items-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="stayLoggedIn"
                                  defaultChecked={stayLoggedIn.value} // or use state management here
                                  onClick={stayLoggedIn.onToggle}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="stayLoggedInMobile"
                                >
                                  Stay logged in on this device for 5 days
                                </label>
                              </div> */}
                              <button
                                type="submit"
                                className="btn btn-primary btn-login w-100 mb-3"
                              >
                                Sign Up
                              </button>
                              {/* <div className="">
                                <Link to="#" className="btn btn-link">
                                  Forgot password?
                                </Link>
                              </div> */}
                              <div className="text-center mt-4">
                                <span>Already account? </span>
                                <Link to={paths.auth.jwt.signIn}>
                                  <span className="text-primary">
                                    Login Now!
                                  </span>
                                </Link>
                              </div>
                            </fieldset>
                          )}
                        </form>
                      </div>
                      {/* Telegram Modal */}
                      <div
                        className="modal fade"
                        tabIndex="-1"
                        id="signUpTelegramModal"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content bg-body bg-opacity-92">
                            <div className="modal-body p-5 text-center">
                              <h3 className="dash-card-subtitle mb-4">
                                Login with Telegram
                              </h3>
                              {telegramModalStep.value === 1 && (
                                <div key={country}>
                                  <IntlTelInput
                                    value={phone} // Correct prop for initial value
                                    onChangeNumber={(num) => setPhone(num)}
                                    // separateDialCode={true}
                                    onChangeCountry={(countryCode) =>
                                      setCountry(countryCode)
                                    }
                                    initOptions={{
                                      initialCountry: country,
                                      loadUtils: () =>
                                        import(
                                          "intl-tel-input/build/js/utils.js"
                                        ), // Load utils dynamically
                                    }}
                                  />
                                  <button
                                    className="btn btn-primary shadow-none text-white mt-3"
                                    onClick={() => handleSendOtp()}
                                  >
                                    {otpStatus.value
                                      ? "Sending..."
                                      : "Send OTP"}
                                  </button>
                                </div>
                              )}
                              {telegramModalStep.value === 2 && (
                                <>
                                  <input
                                    type="text"
                                    className="form-control text-center mb-3"
                                    id="otpInput"
                                    placeholder="Enter mail OTP"
                                  />
                                  <button
                                    className="btn btn-primary shadow-none text-white"
                                    onClick={() =>
                                      handleVerifyOtp(
                                        document.getElementById("otpInput")
                                          .value
                                      )
                                    }
                                  >
                                    {verifyOtpStatus.value
                                      ? "Verifying..."
                                      : "Verify OTP"}
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
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

export default SignUp;
