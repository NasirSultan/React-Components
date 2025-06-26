export interface User {
  id: number;
  name: string;
  email: string;
}

export type Status = "idle" | "loading" | "success" | "error";
