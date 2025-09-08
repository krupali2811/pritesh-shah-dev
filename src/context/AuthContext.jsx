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
  loggedInUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user, loggedInUser } = action.payload;
      // const {accessToken, loggedInUser} = sessionStorage.getItem('user');
      // const data = JSON.parse(sessionStorage.getItem("user"));
      // const { isAuthenticated, user } =
      //   data !== null && data !== "null"
      //     ? { isAuthenticated: true, user: data.loggedInUser }
      //     : action.payload;
      // axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
        loggedInUser,
      };
    }

    case "LOGIN": {
      const { access, user } = action.payload.data;
      localStorage.setItem("Token", JSON.stringify({ accessToken: access }));
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${access}`;
      return { ...state, isAuthenticated: true };
    }

    case "LOGOUT": {
      sessionStorage.clear();
      localStorage.clear();
      delete axiosInstance.defaults.headers.common.Authorization;
      return { ...state, isAuthenticated: false, user: null };
    }

    case "SIGNUP": {
      const { user, tokens } = action.payload.data;
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${tokens?.access}`;
      return { ...state, isAuthenticated: true, user };
    }

    case "USER": {
      const { user } = action.payload;
      sessionStorage.setItem("user", JSON.stringify(user));
      return { ...state, isAuthenticated: true, user };
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
  signUp: () => {},
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
        identifier: data?.email ? data?.email : data?.phone,
        password: data?.password,
      };
      const res = await axiosInstance.post(endpoints.auth.signIn, params);
      const loginData = res.data;
      const twoFA = loginData["2fa_required"];
      const token = loginData.access;
      const isVerified = loginData?.user?.verified_status;
      if (twoFA) {
        router.push(paths.auth.jwt.verify, {
          query: { identifier: data.email || data.phone, flag: "login" },
        });
      } else if (!isVerified) {
        toast.success("Account not verified");
        router.push(paths.auth.jwt.verify, {
          query: {
            identifier: data.email || data.phone,
            flag: "verifyAccount",
          },
        });
      } else {
        toast.success("Logged in successfully");
        dispatch({ type: "LOGIN", payload: { data: loginData } });
        getUserData(token);
        router.push(paths.dashboard.root);
      }
    } catch (error) {
      toast.error(error?.message || "Error while logged in user");
      console.log(error.message);
    }
  };

  const signUp = async (data) => {
    try {
      const params = {
        identifier: data?.email ? data?.email : data?.phone,
        password: data?.password,
        confirm_password: data?.confirm_password,
        ...(data?.referral_code && { referral_code: data.referral_code }),
      };

      const res = await axiosInstance.post(endpoints.auth.signUp, params);
      const userData = res?.data;
      const isVerified = userData?.user?.verified_status;
      if (!isVerified) {
        toast.success(userData?.message || "Registered successfully");
        router.push(paths.auth.jwt.verify, {
          query: {
            identifier: data.email || data.phone,
            flag: "verifyAccount",
          },
        });
        dispatch({ type: "SIGNUP", payload: { data: userData } });
      } else {
        toast.success("Registered successfully");
        dispatch({ type: "SIGNUP", payload: { data: userData } });
        router.push(paths.auth.jwt.signIn);
      }
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

  const getUserData = async (data) => {
    const token =
      JSON.parse(localStorage.getItem("Token"))?.accessToken || data;
    try {
      const res = await axiosInstance.get(endpoints.auth.me, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: "USER",
        payload: { user: res?.data },
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
      getUserData(token);
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
    const token = JSON.parse(localStorage.getItem("Token"));
    const user = JSON.parse(sessionStorage.getItem("user"));
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (token) {
      getUserData(token?.accessToken);
      dispatch({
        type: "INIT",
        payload: { isAuthenticated: true, user, loggedInUser },
      });
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token?.accessToken}`;
    } else {
      dispatch({
        type: "INIT",
        payload: { isAuthenticated: false, user: null, loggedInUser: null },
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
        signUp,
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
