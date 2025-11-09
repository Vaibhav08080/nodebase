"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormInputs = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: LoginFormInputs) => {
    await authClient.signIn.email({
        email: value.email,
        password: value.password,
        callbackURL: "/",
    },{
      onSuccess:()=>{
        toast.success("Login successful");
        router.push("/")
      },
      onError:(error)=>{
        toast.error(error.error.message);
      }
    })
  };

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-6">
                    <div className="flex flex-col gap-4">
                        <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                            Continue With Github

                        </Button>
                        <Button variant="outline" className="w-full" type="button" disabled={isPending}>
                            Continue With Google

                        </Button>

                    </div>
                </div>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="* * * * * * * *" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? 'Signing in...' : 'Sign in'}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link href="/sign-up" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
               
              </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  );
}
