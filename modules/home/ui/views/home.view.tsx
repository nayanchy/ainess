"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HomeView = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) return <div>Loading ...</div>;

  if (session?.user) {
    return (
      <div className="flex flex-col gap-6">
        <p>You are logged in as {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        <Button
          onClick={() =>
            signOut({
              fetchOptions: {
                onSuccess: () => router.push("/sign-in"),
              },
            })
          }
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-2xl">You are not logged in</h1>
      <Button asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
};

export default HomeView;
