
// import axios, { AxiosResponse } from "axios"; // or `import type` if only for typing


// // import { ILoginResponse, IGetUserProfileResponse } from "./types/auth";
// import BaseApi from "./BaseApi";

// export const login = async (
//   email: string,
//   password: string
// ): Promise<AxiosResponse<ILoginResponse>> => {
//   const response = await BaseApi.postRequest(`/auth/sign-in`, {
//     email,
//     password,
//   });

//   return response;
// };



// export const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("role");
//   localStorage.removeItem("userId");
// };

// export const getCurrentUserRole = () => {
//   return localStorage.getItem("role");
// };

// export const getCurrentUser = () => {
//   return localStorage.getItem("token");
// };

// export const getCurrentUserId = () => {
//   return localStorage.getItem("userId");
// };
