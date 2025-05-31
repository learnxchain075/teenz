// import axios from "axios";
// // import { toast } from "react-toastify";


// import AppConfig from "../config/config";


// const axiosInstance = axios.create({
//     baseURL: AppConfig.apiGateway.BASE_URL,
// });

// axiosInstance.interceptors.request.use(
//     (config) => {
//         if (!config.headers.Authorization) {
//             const jwt = localStorage.getItem(AppConfig.LOCAL_STORAGE_ACCESS_TOKEN_KEY);


//             if (jwt !== "") {
//                 config.headers["auth-token"] = `${jwt}`;
//             }
//         }


//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Add a 403 response interceptor
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     // eslint-disable-next-line consistent-return
//     (error) => {
//         if (!error.response) {
//             throw new Error("Error connecting to the server. Please try again shortly.");
//         } else {
//             const originalRequest = error.config;


//             if (error.response.status === 422 && originalRequest.url === `/auth/refresh-token`) {
//                 localStorage.removeItem(AppConfig.LOCAL_STORAGE_ACCESS_TOKEN_KEY);
//                 localStorage.removeItem(AppConfig.LOCAL_STORAGE_REFRESH_TOKEN_KEY);
//                 window.location.href = `${AppConfig.BASE_URL}`;
//                 // toast.error(
//                 //   <div className="toast-message">
//                 //     <p className="fs-13">
//                 //       You have been logged out due to token invalidation. Please login
//                 //       again.
//                 //     </p>
//                 //   </div>,
//                 //   {
//                 //     onClose: () => {
//                 //       window.location.href = `${AppConfig.BASE_URL}`;
//                 //     },
//                 //   }
//                 // );
//             }


//             if (error.response.status === 403 && !originalRequest._retry) {
//                 originalRequest._retry = true;
//                 const refreshToken = localStorage.getItem(AppConfig.LOCAL_STORAGE_REFRESH_TOKEN_KEY);


//                 return (
//                     axiosInstance
//                         .post(`/auth/refresh-token`, {
//                             token: refreshToken,
//                         })
//                         // eslint-disable-next-line consistent-return
//                         .then((res) => {
//                             if (res.data.accessToken) {
//                                 localStorage.setItem(AppConfig.LOCAL_STORAGE_ACCESS_TOKEN_KEY, res.data.accessToken);
//                                 localStorage.setItem(AppConfig.LOCAL_STORAGE_REFRESH_TOKEN_KEY, res.data.refreshToken);
//                                 axiosInstance.defaults.headers.common["auth-token"] = res.data.accessToken;


//                                 return axiosInstance(originalRequest);
//                             }
//                         })
//                 );
//             }


//             if (error.response.data && error.response.data.error) {
//                 throw new Error(error.response.data.error);
//             }


//             return Promise.reject(error);
//         }
//     }
// );

// export default axiosInstance;
