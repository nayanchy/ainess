"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSocial = (provider: "google" | "github") => {
    setError(null);
    setPending(true);

    signIn.social(
      {
        provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          console.log("Error:", error);
          setError(error.message);
          setPending(false);
        },
      }
    );
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (ctx) => {
          console.log("Success:", ctx);
          router.push("/");
          setPending(false);
        },
        onError: ({ error }) => {
          console.log("Error:", error);
          setError(error.message);
          setPending(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6 ">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="m@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-red-500/10 border-none">
                    <OctagonAlertIcon className="size-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button
                  disabled={pending}
                  className="w-full cursor-pointer"
                  type="submit"
                >
                  Login
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full cursor-pointer"
                    onClick={() => onSocial("google")}
                  >
                    <FcGoogle />
                    Google
                  </Button>
                  <Button
                    disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full cursor-pointer"
                    onClick={() => onSocial("github")}
                  >
                    <FaGithub />
                    Github
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-gradient-to-br from-orange-400 to-yellow-500 relative hidden md:flex flex-col items-center justify-center">
            <Image
              src="/ainess.png"
              alt="Logo"
              width={90}
              height={90}
              className=""
            />
            <p className="text-2xl font-bold text-white">AiNess</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};

export default SignInView;
