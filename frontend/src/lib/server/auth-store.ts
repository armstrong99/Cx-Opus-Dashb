import "server-only";

export type UserRecord = {
  email: string;
  name: string;
  password: string;
};

const users: UserRecord[] = [];

const normalizeEmail = (value: string) => value.trim().toLowerCase();

export function registerUser(input: UserRecord): { email: string; name: string } | null {
  const email = normalizeEmail(input.email);
  const existing = users.find((user) => user.email === email);
  if (existing) {
    return null;
  }

  const user: UserRecord = {
    email,
    name: input.name.trim(),
    password: input.password,
  };
  users.push(user);

  return {
    email: user.email,
    name: user.name,
  };
}

export function loginUser(input: Pick<UserRecord, "email" | "password">): { email: string; name: string } | null {
  const email = normalizeEmail(input.email);
  const user = users.find((item) => item.email === email && item.password === input.password);
  if (!user) {
    return null;
  }

  return {
    email: user.email,
    name: user.name,
  };
}
