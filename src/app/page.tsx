import Link from "next/link";
import { PromptsArea } from "~/components/main/prompts";
import SubmitArea from "~/components/main/submit";
import { getAllActivePrompts, getAllActivePromptsWithUserInfo } from "~/query/promptQuery";
import { getServerAuthSession } from "~/server/auth";
import { type PromptWithInfo } from "~/types/types";

export default async function HomePage() {
  const user = await getServerAuthSession();
  let activePrompts = [] as PromptWithInfo[];
  if(!!user){
    activePrompts = await getAllActivePromptsWithUserInfo(user.user.id);
  } else {
    activePrompts = await getAllActivePrompts();
  }
  return (
    <div className="flex flex-col items-center text-slate-900 bg-slate-100 h-screen p-4">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex w-full justify-center flex-row mb-8">
          <h1 className="text-4xl font-semibold">PromptHacking</h1>
          <div className="text-2xl font-normal text-orange-500 ml-24 mt-2">
            { (!!user) ? (
              <Link href="/api/auth/signout">
                Sign Out
              </Link> 
            ) : (
              <Link href="/api/auth/signin">
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Submit Area */}
        { !!user && <SubmitArea session={user} /> }
        <PromptsArea prompts={activePrompts} userId={user?.user.id}/>
      </div>
    </div>
  );
}
