import { z } from "zod";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { useBoolean } from "../../../hooks/use-boolean";
import axiosInstance, { endpoints } from "../../../utils/axios";
import { paths } from "../../../routes/paths";
import { useRouter } from "../../../routes/hooks/use-router";
import PhoneInput from "../../../components/phone-input";

export default function UserNewEditForm({ user, userId, permissions }) {
  const password = useBoolean();
  const confimPassword = useBoolean();
  const router = useRouter();

  const [country, setCountry] = useState("us");

  const userSchema = z.object({
    uid: z.string(),
    bybitUid: z.string(),
    bybitUserName: z.string(),
    firstName: z
      .string()
      .min(1, "First Name is required")
      .max(10, "Name must be less than 100 characters"),
    lastName: z
      .string()
      .min(1, "Last Name is required")
      .max(10, "Name must be less than 100 characters"),
    userName: z
      .string()
      .min(1, "User Name is required")
      .max(10, "Name must be less than 100 characters"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    phoneNumber: z.string().regex(/^\+\d{6,15}$/, "Enter a valid phone number"),
    role: z.string().min(1, "Role is required"),
    // permissions: z
    //   .array(
    //     z.object({
    //       label: z.string().min(1, "Permission label is required"),
    //       value: z.union([z.string(), z.number()]),
    //     })
    //   )
    //   .min(1, "Please select at least one permission"),
    // password: z.string(),
    // confirmPassword: z.string(),
  });
  // .refine((data) => data.password === data.confirmPassword, {
  //   message: "Passwords must match",
  //   path: ["confirmPassword"],
  // });

  const defaultValues = useMemo(
    () => ({
      uid: user?.uid || "",
      bybitUid: user?.bybit_subuid || "",
      bybitUserName: user?.bybit_username || "",
      firstName: user?.firstname || "",
      lastName: user?.lastname || "",
      userName: user?.username || "",
      email: user?.email || "",
      phoneNumber: user?.phone_number ? String(user.phone_number) : "",
      role: user?.role || "",
      // permissions: user?.permissions || "",
      // password: "",
      // confirmPassword: "",
    }),
    [user]
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      // const permissions = Array.isArray(data.permissions)
      //   ? data.permissions.map((permission) => permission.value)
      //   : [];
      const params = {
        // uid: data.uid,
        // bybit_subuid: data.bybitUid,
        // bybit_username: data.bybitUserName,
        firstname: data.firstName,
        lastname: data.lastName,
        username: data.userName,
        email: data.email,
        phone_number: data.phoneNumber,
        // role: data.role,
        // permissions: permissions,
        // password: data.password,
      };
      if (user) {
        await axiosInstance.post(endpoints.Users.update(userId), params);
      } else {
        await axiosInstance.post(endpoints.Users.add, params);
      }
      toast.success(
        user ? "User updated successfully" : "User created successfully"
      );
      router.push(paths.dashboard.userManagement.root, {
        state: { refetch: true },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
  return (
    <>
      <div className="add-user" style={{ marginTop: "40px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <label htmlFor="uid" className="form-label">
                UID
              </label>
              <Controller
                name="uid"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    placeholder="Enter your UID"
                    disabled
                  />
                )}
              />
              {errors.uid && (
                <p className="error small mt-1">{errors.uid.message}</p>
              )}
            </div>
            <div className="col-md-6 col-lg-4">
              <label htmlFor="bybitUid" className="form-label">
                Bybit UID
              </label>
              <Controller
                name="bybitUid"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    placeholder="Enter your Bybit-Uid"
                    disabled
                  />
                )}
              />
              {errors.bybitUid && (
                <p className="error small mt-1">{errors.bybitUid.message}</p>
              )}
            </div>
            <div className="col-md-6 col-lg-4">
              <label htmlFor="bybitUserName" className="form-label">
                Bybit UserName
              </label>
              <Controller
                name="bybitUserName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    placeholder="Enter your Bybit UserName"
                    disabled
                  />
                )}
              />
              {errors.bybitUserName && <p>{errors.bybitUserName.message}</p>}
            </div>
            <div className="col-md-6 col-lg-4">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    placeholder="Enter your first name"
                  />
                )}
              />
              {errors.firstName && (
                <p className="error small mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div className="col-md-6 col-lg-4">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    placeholder="Enter your last name"
                  />
                )}
              />
              {errors.lastName && (
                <p className="error small mt-1">{errors.lastName.message}</p>
              )}
            </div>
            <div className="col-md-6 col-lg-4">
              <label htmlFor="userName" className="form-label">
                UserName
              </label>
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                  />
                )}
              />
              {errors.userName && (
                <p className="error small mt-1">{errors.userName.message}</p>
              )}
            </div>

            <div className="col-md-6 col-lg-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                )}
              />
              {errors.email && (
                <p className="error small mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="col-md-6 col-lg-4">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              {/* <PhoneInput
                name="phone"
                phoneNumber={field.value}
                setPhoneNumber={field.onChange}
              /> */}
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    name="phone"
                    phoneNumber={field.value}
                    setPhoneNumber={field.onChange}
                  />
                )}
              />
              {errors.phoneNumber && (
                <p className="error small mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="col-md-6 col-lg-4">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="form-control"
                    placeholder="Enter your role"
                    disabled
                  />
                )}
              />
              {errors.role && (
                <p className="error small mt-1">{errors.role.message}</p>
              )}
            </div>

            {/*             <div className="col-md-6 col-lg-4" style={{ position: "relative" }}>
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <div className="input-group password-field">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={password.value ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                    />
                  )}
                />
                <span
                  className="field-icon toggle-password text-primary-hover"
                  onClick={password.onToggle}
                >
                  {password.value ? <TbEye /> : <TbEyeClosed />}
                </span>
                {errors.password && <p className="error small mt-1">{errors.password.message}</p>}
              </div>
            </div>

            <div className="col-md-6 col-lg-4" style={{ position: "relative" }}>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-group password-field">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={confimPassword.value ? "text" : "password"}
                      className="form-control"
                      placeholder="Re-enter your password"
                    />
                  )}
                />
                <span
                  className="field-icon toggle-password text-primary-hover"
                  onClick={confimPassword.onToggle}
                >
                  {confimPassword.value ? <TbEye /> : <TbEyeClosed />}
                </span>
                {errors.confirmPassword && (
                  <p className="error small mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div> */}

            {/*             <div className="col-md-6 col-lg-4">
              <label htmlFor="role" className="form-label">
                Permissions
              </label>
              <Controller
                name="permissions"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    value={field.value || []}
                    onChange={(option) => {
                      field.onChange(option);
                    }}
                    options={permissions}
                    placeholder="Select permissions"
                    className="basic-multi-select customSelect"
                    classNamePrefix="select" // Set your placeholder text here
                  />
                )}
              />
              {errors.permissions && <p className="error small mt-1">{errors.permissions.message}</p>}
            </div> */}
          </div>

          <div className="row mt-4">
            <div className="d-flex col-lg-4 col-md-6">
              <button type="submit" className="btn btn-primary flex-fill me-2">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-primary flex-fill"
                onClick={() => router.push(paths.dashboard.userManagement.root)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
