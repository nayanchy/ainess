"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut, signUp, useSession } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession();
  console.log(session);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          console.log("Loading:", ctx);
        },
        onSuccess: (ctx) => {
          console.log("Success:", ctx);
        },
        onError: (ctx) => {
          console.log("Error:", ctx);
        },
      }
    );
  };

  if (session?.user) {
    return <Button onClick={() => signOut()}>Sign out</Button>;
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

export default Home;
