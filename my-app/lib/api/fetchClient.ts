"use client";

import { getCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import api from "./axiosClient";

export const fetchClient = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  const jwt = getCookie("jwt");

  try {
    const response = await api({
      url,
      ...config,
      headers: {
        ...config?.headers,
        ...(jwt && { Authorization: `Bearer ${jwt}` }),
      },
    });

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        await signOut();
      }
    }

    throw error;
  }
};
