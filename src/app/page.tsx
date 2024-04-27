import Link from "next/link";
import SubmitArea from "~/components/main/submit";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const user = await getServerAuthSession();
  return (
    <main className="flex flex-col items-center text-slate-900 bg-slate-100 h-screen p-4">
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
      </div>
    </main>
  );
}
