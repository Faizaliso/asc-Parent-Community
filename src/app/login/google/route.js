import { cookies } from "next/headers";
import { google } from "@/utils/arctic";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const code = searchParams.get("code");
	const codeVerifier = cookies().get("codeVerifier").value;
	
	const tokens = await google.validateAuthorizationCode(code, codeVerifier);
	
	const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
		headers: {
			Authorization: `Bearer ${tokens.accessToken}`,
		},
	});
	
	const user = await res.json();
	//console.log(user);
	const findUser = await prisma.user.findFirst({
		where: {
			email: user.email,
		},
	});
	
	if (!findUser) {
		const newUser = await prisma.user.create({
			data: {
				username: user.name,
				email: user.email,
				avatarUrl: user.picture,
			}
		});
		const payload = {
			id: newUser.id,
			name: newUser.username,
			email: newUser.email,
		  };

		  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3d" });

		  cookies().set("token", token, {
			httpOnly: true,
			path: "/",
			secure: process.env.NODE_ENV === "production",
		  });

		  redirect("/dashboard");
	}
	
	const payload = {
		id: findUser.id,
		name: findUser.username,
		email: findUser.email,
	  };

	  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3d" });

	  cookies().set("token", token, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
	  });

	  redirect("/dashboard");
	
}

