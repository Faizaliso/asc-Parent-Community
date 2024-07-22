import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export async function auth() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return null;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`auth says ${payload}`);
    return payload;
  } catch (error) {
    return null;
  }
}
