import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Parent Community",
  description: "Connect many parent in the world ",
};

export default function RootLayout({ children }) {
  const user = auth();
  console.log(`layout says : ${user}`);

  if (!user) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen flex">
          <aside className="w-[240px] bg-slate-50 p-8 space-y-4 font-medium">
            <div>ParentCom</div>
            <div>Profile</div>
            <div>{user.username}</div>
          </aside>
          <section className="w-[calc(100%-240px)]">{children}</section>
        </main>
      </body>
    </html>
  );
}
