import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import { paths } from "../../routes/paths";
import { useRouter } from "../../routes/hooks/use-router";
import { useCloseAllModals } from "../../hooks/use-close-modals";
import PhoneInput from "../../components/phone-input";
import FileUploadBox from "../../components/dropzone/FileUploadBox";

// ----------------- Schema -----------------
const registerSchema = z.object({
  firstName: z
    .string()
    .nonempty("First Name is required")
    .max(20, "First Name must be under 20 characters"),

  lastName: z
    .string()
    .nonempty("Last Name is required")
    .max(20, "Last Name must be under 20 characters"),
  email: z
    .string()
    .nonempty("Email is required") // ✅ makes field required
    .email("Invalid email address"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number format"),

  address: z.string().min(2, "Address is required"),

  aadhaar: z
    .any()
    .refine((files) => files?.length === 1, "Aadhaar card is required"),
  // .refine(
  //   (files) =>
  //     files?.[0]?.type === "application/pdf" ||
  //     files?.[0]?.type.startsWith("image/"),
  //   "Aadhaar must be an image or PDF"
  // ),

  pan: z.any().refine((files) => files?.length === 1, "PAN card is required"),
  // .refine(
  //   (files) =>
  //     files?.[0]?.type === "application/pdf" ||
  //     files?.[0]?.type.startsWith("image/"),
  //   "PAN must be an image or PDF"
  // ),
});

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  aadhaar: [],
  pan: [],
};

// ----------------- Component -----------------
const Register = () => {
  const router = useRouter();
  const closeAllModals = useCloseAllModals();
  const { register: registerUser, isAuthenticated } = useAuth();

  const {
    register,
    control,
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
            <div className="scrollable-content">
              <h1 className="form-title ff-bold text-white text-center mb-20">
                Basic Details
              </h1>
              <p className="form-head mb-40 text-center">
                Please enter few quick details to get started
              </p>

              <div className="row">
                <div className="col-md-6">
                  {/* First Name */}
                  <div className="mb-4">
                    <label className="form-label">First Name</label>
                    <input
                      {...register("firstName")}
                      type="text"
                      className="form-control"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="error mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Last Name */}
                  <div className="mb-4">
                    <label className="form-label">Last Name</label>
                    <input
                      {...register("lastName")}
                      type="text"
                      className="form-control"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="error mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <div className="mb-4">
                    <label className="form-label">Email</label>
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
                </div>

                {/* Phone */}
                <div className="col-md-6">
                  <div className="mb-4">
                    <label className="form-label w-100">Phone</label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field, fieldState }) => (
                        <PhoneInput
                          name="phone"
                          value={field.value}
                          onChange={field.onChange}
                          error={fieldState.error}
                        />
                      )}
                    />

                    {errors.phone && (
                      <p className="error mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="col-md-12">
                  <div className="mb-4">
                    <label className="form-label">Address</label>
                    <input
                      {...register("address")}
                      type="text"
                      className="form-control"
                      placeholder="Enter your Address"
                    />
                    {errors.address && (
                      <p className="error mt-1">{errors.address.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* File Upload Boxes */}
              {/* <h6 className="ff-medium mb-12 text-white">
              Upload Your Documents
            </h6> */}
              <div className="row mb-50">
                <div className="col-md-6">
                  {/* <FileUploadBox label="Upload Aadhaar Card*" /> */}
                  <Controller
                    name="aadhaar"
                    control={control}
                    render={({ field }) => (
                      <FileUploadBox
                        name="aadhaar"
                        label="Upload Aadhaar Card*"
                        onChange={field.onChange}
                        errors={errors}
                      />
                    )}
                  />
                </div>
                <div className="col-md-6">
                  <Controller
                    name="pan"
                    control={control}
                    render={({ field }) => (
                      <FileUploadBox
                        name="pan"
                        label="Upload Pan Card*"
                        onChange={field.onChange}
                        errors={errors}
                      />
                    )}
                  />
                </div>
                {/* <div className="col-md-4">
                <FileUploadBox label="Other Document*" />
              </div> */}
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
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
