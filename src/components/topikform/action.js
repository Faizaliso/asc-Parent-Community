"use server";

import { prisma } from "@/utils/prisma";

export async function createTopicAction(_, formData) {
  const content = formData.get("content");

  const topic = await prisma.topic.create({
    data: {
      content,
      userid: "clys33y3t0000cmfqnqinp3na",
    },
  });

  return {
    success: true,
    message: "topic created",
  };
}
