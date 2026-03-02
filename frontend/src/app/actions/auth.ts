"use server";

import { loginUser, registerUser } from "@/lib/server/auth-store";

type AuthError = { success: false; error: string };
type LoginSuccess = {
  success: true;
  data: {
    accessToken: string;
    user: { email: string; name: string };
  };
};
type RegisterSuccess = {
  success: true;
  data: {
    message: string;
    user: { email: string; name: string };
  };
};

export async function loginAction(input: {
  email: string;
  password: string;
}): Promise<LoginSuccess | AuthError> {
  const email = input.email.trim().toLowerCase();
  if (!email || !input.password) {
    return {
      success: false,
      error: "Invalid credentials",
    };
  }

  const user = loginUser({ email, password: input.password });
  if (!user) {
    return {
      success: false,
      error: "Invalid credentials",
    };
  }

  return {
    success: true,
    data: {
      accessToken: "placeholder-token",
      user,
    },
  };
}

export async function registerAction(input: {
  email: string;
  password: string;
  name: string;
}): Promise<RegisterSuccess | AuthError> {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  if (!email || !input.password || !name) {
    return {
      success: false,
      error: "Missing required fields",
    };
  }

  const user = registerUser({ email, password: input.password, name });
  if (!user) {
    return {
      success: false,
      error: "An account with this email already exists",
    };
  }

  return {
    success: true,
    data: {
      message: "User registered successfully",
      user,
    },
  };
}
