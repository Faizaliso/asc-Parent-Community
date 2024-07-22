"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "./action";
// import { loginWithGoogleAction } from "./action-google";

export default function Page() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <main className="flex flex-col justify-center items-center text-center h-screen space-y-4">
      <section>
        <h3>Login</h3>
        <p>Welcome back, please login</p>
      </section>

      <form
        action={formAction}
        className="flex flex-col justify-center items-center space-y-2"
      >
        <input
          defaultValue={state?.data?.email}
          name="email"
          placeholder="Email"
          type="email"
        />
        <input
          defaultValue={state?.data?.password}
          name="password"
          placeholder="password"
          type="password"
        />
        {!state?.success && <p className="msg-error">{state?.message}</p>}
        {state?.success && <p className="msg-success">{state?.message}</p>}
        <button disabled={pending} className="w-full">
          Login
        </button>
      </form>
      <p>
        Don&apos;t have an account ?{" "}
        <Link href="/register" className="link">
          Register
        </Link>
        , or
      </p>
      {/* <form action={loginWithGoogleAction}>
        <button className="w-full">Continue with Google</button>
      </form> */}

      <p>
        Back to{" "}
        <Link href="/" className="link">
          Homepage
        </Link>
      </p>
    </main>
  );
}
