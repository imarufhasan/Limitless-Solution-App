import { baseApi } from "@/redux/api/baseApi";

export interface FcmRegisterPayload {
  token: string;
  deviceType: "web" | "android" | "ios";
}

export const fcmApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerFcmToken: builder.mutation<void, FcmRegisterPayload>({
      query: (body) => ({
        url: "/fcm/register",
        method: "POST",
        body,
      }),
    }),
    ///auth/log-out
    logOut: builder.mutation<void, { fcmToken: string }>({
      query: (body) => ({
        url: "/auth/log-out",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterFcmTokenMutation, useLogOutMutation } = fcmApi;
