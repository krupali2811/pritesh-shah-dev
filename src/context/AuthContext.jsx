import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

import axiosInstance, { endpoints } from "../utils/axios";
import { useRouter } from "../routes/hooks/use-router";
import { SplashScreen } from "../components/loading-screen/splash-screen";
import { useBoolean } from "../hooks/use-boolean";
import { paths } from "../routes/paths";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
      };
    }

    case "LOGIN": {
      // const { access, user } = action.payload.data;
      localStorage.setItem("isAuthenticated", true);
      sessionStorage.setItem("user", JSON.stringify(action.payload.data));
      // axiosInstance.defaults.headers.common.Authorization = `Bearer ${access}`;
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.data,
      };
    }

    case "LOGOUT": {
      sessionStorage.clear();
      localStorage.clear();
      delete axiosInstance.defaults.headers.common.Authorization;
      return { ...state, isAuthenticated: false, user: null };
    }

    // case "SIGNUP": {
    //   const { user, tokens } = action.payload.data;
    //   axiosInstance.defaults.headers.common.Authorization = `Bearer ${tokens?.access}`;
    //   return { ...state, isAuthenticated: true, user };
    // }

    case "USER": {
      sessionStorage.setItem("user", JSON.stringify(action.payload.data));
      return { ...state, isAuthenticated: true, user: action.payload.data };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => {},
  logout: () => {},
  register: () => {},
  getUserData: () => {},
  verify2FA: () => {},
  verifyAccount: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isLoading = useBoolean();
  const router = useRouter();

  const login = async (data) => {
    try {
      const params = {
        username: data?.email ? data?.email : data?.phone,
        password: data?.password,
      };
      const res = await axiosInstance.post(endpoints.auth.signIn, params);
      const loginData = res.data?.result;
      console.log(loginData);
      // const loginData = {
      //   user: {
      //     firstname: "chetan",
      //     lastname: "aarya",
      //     email: "chetan.aaryasoftex@gmail.com",
      //     phone_number: "+917070717272",
      //     address: "Vadodara",
      //     role: "Admin",
      //   },
      //   access: "qasdzfgxchvjbgfrdtetdyfhujkl",
      // };
      // const twoFA = loginData["2fa_required"];
      // const token = loginData.access;
      // const isVerified = loginData?.user?.verified_status;
      // if (twoFA) {
      //   router.push(paths.auth.jwt.verify, {
      //     query: { identifier: data.email || data.phone, flag: "login" },
      //   });
      // } else if (!isVerified) {
      //   toast.success("Account not verified");
      //   router.push(paths.auth.jwt.verify, {
      //     query: {
      //       identifier: data.email || data.phone,
      //       flag: "verifyAccount",
      //     },
      //   });
      // } else {
      toast.success("Logged in successfully");
      dispatch({
        type: "LOGIN",
        payload: {
          data: loginData,
        },
      });
      // getUserData();
      router.push(paths.dashboard.root);
      // }
    } catch (error) {
      toast.error(error?.message || "Error while logged in user");
      console.log(error.message);
    }
  };

  const register = async (data) => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("firstname", data.firstName);
      formData.append("lastname", data.lastName);
      formData.append("email", data.email);
      formData.append("phone_number", data.phone);
      formData.append("address", data.address);

      // Append files (from RHF, FileUploadBox stores as array)
      if (data.aadhaar?.[0]) {
        formData.append("aadhar_card", data.aadhaar[0]);
      }
      if (data.pan?.[0]) {
        formData.append("pan_card", data.pan[0]);
      }

      await axiosInstance.post(endpoints.auth.register, formData);
      toast.success("Registered successfully");
      router.push(paths.auth.jwt.signIn);
    } catch (error) {
      // toast.error(error?.message || "Error while register user");
      if (error?.errors) {
        Object.entries(error?.errors).forEach(([key, messages]) => {
          messages.forEach((message) => {
            toast.error(message);
          });
        });
      } else {
        toast.error(error?.message || "Error while register user");
      }
    }
  };

  const logout = () => {
    try {
      dispatch({ type: "LOGOUT" });
      toast.success("Logout sucessfully");
    } catch (error) {
      console.error("Error during sign out:", error);
      throw error;
    }
  };

  const getUserData = async () => {
    try {
      const res = await axiosInstance.get(endpoints.auth.me);
      dispatch({
        type: "USER",
        payload: { user: res?.data?.result },
      });
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const verify2FA = async (data) => {
    try {
      const res = await axiosInstance.post(endpoints.auth.verify2FA, data);
      const loginData = res.data; // Entire response data
      const token = loginData.access;
      toast.success("Logged in successfully");
      dispatch({ type: "LOGIN", payload: { data: loginData } });
      // getUserData(token);
      router.push(paths.dashboard.root);
    } catch (error) {
      toast.error(error?.message || "Error while logged in user");
      console.log(error.message);
    }
  };

  const verifyAccount = async (data) => {
    try {
      const res = await axiosInstance.post(endpoints.auth.verifyAccount, data);
      const accountData = res.data; // Entire response data
      console.log(accountData);
      toast.success("Account verified successfully");
      router.push(paths.auth.jwt.signIn);
      delete axiosInstance.defaults.headers.common.Authorization;
      // dispatch({ type: "SIGNUP", payload: { data: accountData } });
    } catch (error) {
      toast.error(error?.message || "Error while logged in user");
      console.log(error.message);
    }
  };

  // const forgotPassword = async (data) => {
  //   try {
  //     const res = await axiosInstance.post(endpoints.auth.forgotPassword, data);
  //     const accountData = res.data; // Entire response data
  //     console.log(accountData);
  //     toast.success("Account verified successfully");
  //     router.push(paths.auth.jwt.signIn);
  //     delete axiosInstance.defaults.headers.common.Authorization;
  //     // dispatch({ type: "SIGNUP", payload: { data: accountData } });
  //   } catch (error) {
  //     toast.error(error?.message || "Error while logged in user");
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
  // }, []);

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    if (isAuthenticated) {
      getUserData();
      dispatch({
        type: "INIT",
        payload: { isAuthenticated: true },
      });
    } else {
      dispatch({
        type: "INIT",
        payload: { isAuthenticated: false, user: null },
      });
    }
  }, []);

  if (isLoading.value) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // ...user,
        method: "JWT",
        dispatch,
        // setUser,
        login,
        logout,
        register,
        getUserData,
        verify2FA,
        verifyAccount,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
