import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { useBoolean } from "../../hooks/use-boolean";
import { paths } from "../../routes/paths";

const Login = () => {
  const showPasswordEmail = useBoolean();

  const { login } = useAuth();

  const loginSchema = z.object({
    email: z
      .string()
      .nonempty("Email is required") // ✅ makes field required
      .email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
  });

  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  return (
    <>
      <Helmet>
        <title>Pritesh Shah | Investment Advisor</title>
      </Helmet>

      <main className="d-flex align-items-center justify-content-center vh-100 bg-main">
        <div className="form-login w-100 m-auto">
          <div className="logo mb-60 text-center">
            <img
              className=""
              src="/assets/images/logo.svg"
              alt="Pritesh Shah"
            />
          </div>

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
            <div className="mb-20">
              <label className="form-label" style={{ textTransform: "none" }}>
                Email or Username
              </label>
              <input
                {...register("email")}
                type="text"
                className="form-control"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="error mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-12">
              <label className="form-label">Password</label>
              <div className="password-field position-relative">
                <input
                  {...register("password")}
                  className="form-control"
                  type={showPasswordEmail.value ? "text" : "password"}
                  placeholder="Enter your password"
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
                Don&apos;t have an account?
                <Link
                  to={paths.auth.jwt.register}
                  className="btn btn-link ff-bold"
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

export default Login;
