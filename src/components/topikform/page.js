"use client";

import { useActionState } from "react";
import { createTopicAction } from "./action.js";

export const TopicForm = () => {
  const [state, formAction, pending] = useActionState(createTopicAction, null);
  return (
    <form
      className="flex flex-col gap-4 p-7 bg-white rounded-2xl w-[600px]"
      action={formAction}
    >
      <div className="flex flex-col gap-4">
        <h2>Buat Topik</h2>
        <textarea name="content" placeholder="Buat topik baru" />
      </div>
      <button disabled={pending}>Publish</button>
      {!state?.success && <p>{state?.message}</p>}
      {state?.success && <p>{state?.message}</p>}
    </form>
  );
};
