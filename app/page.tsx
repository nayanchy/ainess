"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import React, { useState } from "react";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-16">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Home;
