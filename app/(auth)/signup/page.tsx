"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Nav from "@/components/ui/nav";
import { ThemeProvider } from "@/app/context/themeProvider";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/client";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters long",
    }),
    email: z.string().email({
      message: "Enter a valid email",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      return user;
    } else {
      return null;
    }
  };

  const handleSignup = async (e: any) => {
    console.log("Signup form submitted");
    const { username, email, password } = form.getValues();
    console.log(username, email, password);
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.log("Signup failed:", error.message);
      // toast.error(error.message);
    } else {
      const { error } = await supabase
        .from("users")
        .insert([{ id: data.user?.id, name: username, email: email }])
        .select();
      if (error) {
        console.log("Error inserting user:", error.message);
      } else {
        console.log("Signup success:");
        router.replace("/");
      }
    }
  };

  useEffect(() => {
    fetchUser().then((user) => {
      if (user) {
        router.replace("/");
      } else {
        console.log("No user found");
      }
    });
  }, [router]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen flex-col">
        <Nav />
        <div className="flex justify-center items-center h-full w-full p-8">
          <div className="flex h-full w-full rounded-lg">
            <div className=" bg-[#18181b] text-white flex-1 flex flex-col rounded-l rounded-lg max-md:hidden">
              <div className="flex flex-col justify-center items-center flex-1">
                <div className="text-4xl font-bold">Welcome to Code Vault</div>
              </div>
              <div className="text-sm py-4 p-2">Signup to continue</div>
            </div>
            <div className="flex justify-center items-center h-full md:w-1/2 w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSignup)}
                  className="space-y-4 border p-8 rounded-sm w-1/2"
                >
                  <div className="text-2xl font-bold underline">Signup</div>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
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
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="confirm password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-3">
                    <Button>
                      Signin with Google <FaGoogle className="ml-1" />
                    </Button>
                    <Button type="submit">Signup</Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Signup;
