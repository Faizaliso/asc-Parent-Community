"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { uploadFile } from "@/lib/uploadFile";

export async function registerAction(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const file = formData.get("file");

  if (!name || !email || !password) {
    return {
      success: "false",
      message: "All fields are required",
      data: {
			name,
			email,
			password,
		}
    };
  }

  if (password.length < 6) {
    return {
      success: "false",
      message: "Password must be at least 6 characters long",
      data: {
			name,
			email,
			password,
		}
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 13);
    const randomString = require("randomstring");
	const imageName = randomString.generate(7)+".png";

    await prisma.user.create({
      data: {
        username: name,
        email,
        password: hashedPassword,
        avatarUrl: imageName,
      },
    });
    
    await uploadFile({ key:imageName, body:file, folder:"avatar" });

    return {
      success: "true",
      message: "Register success, please login",
    };
  } catch (error) {
    console.log(error);

    return {
      success: "false",
      message: "Something went wrong",
    };
  }
}
