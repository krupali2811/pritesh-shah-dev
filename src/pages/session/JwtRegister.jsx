import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import { paths } from "../../routes/paths";
import { useRouter } from "../../routes/hooks/use-router";
import { useCloseAllModals } from "../../hooks/use-close-modals";

// ----------------- Schema -----------------
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const defaultValues = {
  name: "",
  email: "",
};

// ----------------- FileUploadBox -----------------
const FileUploadBox = ({ label }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      console.log(`${label} dropped:`, files);
    }
  };

  return (
    <div className="text-center">
      <div
        className="upload-box mb-20"
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input type="file" ref={fileInputRef} style={{ display: "none" }} />
        <div className="upload-content">
          <img
            src="/assets/images/file-upload.svg" // if inside public/images
            alt="Upload"
            className="upload-icon mb-2"
          />
          <p>
            Drag & drop files here or{" "}
            <span className="choose-files" onClick={handleClick}>
              Choose files
            </span>{" "}
            to upload
          </p>
        </div>
      </div>
      <small className="text-white ff-regular f-16">{label}</small>
    </div>
  );
};

// ----------------- Component -----------------
const Register = () => {
  const router = useRouter();
  const closeAllModals = useCloseAllModals();
  const { register: registerUser, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      // Call your auth/register API
      await registerUser(data);
      toast.success("Registration successful!");
      closeAllModals();
      router.push(paths.dashboard.root);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(paths.dashboard.root);
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <Helmet>
        <title>Pritesh Shah | Investment Advisor</title>
      </Helmet>

      <main className="d-flex align-items-center justify-content-center vh-100 bg-main">
        <div className="form-register w-100 m-auto">
          <form
            className="card rounded-24"
            id="register-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="form-title ff-bold text-white text-center mb-20">
              Basic Details
            </h1>
            <p className="form-head mb-40 text-center">
              Please enter few quick details to get started
            </p>

            <div className="row">
              <div className="col-md-6">
                {/* Name */}
                <div className="mb-30">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="error small mt-1">{errors.name.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="col-md-6">
                <div className="mb-30">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="error small mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <div className="mb-30">
                  <label className="form-label">Phone</label>
                  <div className="input-group phone-input">
                    <span className="input-group-text">+91</span>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter your mobile number"
                    />
                  </div>
                </div>
              </div>

              {/* City & State */}
              <div className="col-md-6">
                <div className="mb-30">
                  <label className="form-label">City & State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your City & State"
                  />
                </div>
              </div>
            </div>

            {/* File Upload Boxes */}
            <h6 className="ff-medium mb-12 text-white">
              Upload Your Documents
            </h6>
            <div className="row mb-50">
              <div className="col-md-4">
                <FileUploadBox label="Upload Aadhaar Card*" />
              </div>
              <div className="col-md-4">
                <FileUploadBox label="Upload Pan Card*" />
              </div>
              <div className="col-md-4">
                <FileUploadBox label="Other Document*" />
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center">
              <button
                type="submit"
                className="btn btn-primary btn-login w-25"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submiting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
