import { prisma } from "@/utils/prisma.js";
import { TopicCard } from "@/components/topiccard/page.js";
import { TopicForm } from "@/components/topikform/page";

export default async function Home() {
  const topics = await prisma.topic.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return (
    <main className="bg-slate-100 h-screen flex flex-col justify-center items-center">
      <TopicForm />
      <div>
        {topics.map((item) => (
          <TopicCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
