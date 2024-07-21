import Link from "next/link";

export const TopicCard = ({ item }) => {
  return (
    <Link href={`/$items.id`}>
      <section>
        <div className="flex flex-col gap-4 p-7 bg-white rounded-2xl w-[600px]">
          <div className="flex items-center gap-2 ">
            <div className="bg-blue-500 w-7 h-7 rounded-full"></div>
            <h3>{item.user.username}</h3>
          </div>
          <p>{item.content}</p>
        </div>
      </section>
    </Link>
  );
};
