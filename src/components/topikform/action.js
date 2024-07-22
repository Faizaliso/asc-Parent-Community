"use server";

import { prisma } from "@/utils/prisma";

export async function createTopicAction(_, formData) {
  const content = formData.get("content");

  const topic = await prisma.topic.create({
    data: {
      content,
      dateCreated: new Date(),
      userid,
    },
  });

  return {
    success: true,
    message: "topic created",
  };
}
