"use client";

import React from "react";
import {
    Card,
    Button,
    Form,
    Input,
    Label,
    TextField,
    Description,
    FieldError,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { Check } from "@gravity-ui/icons";

const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
};

const SignInPage = () => {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData);


        if (!email || !password) {
            toast.error("Email and Password are required");
            return;
        }

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "Invalid email or password");
                return;
            }

            // const { data: tokenData, error: tokenError } = await authClient.token();
            // console.log(tokenData);

            toast.success("Login successful!");

            setTimeout(() => {
                 router.push("/");
            }, 1000);
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    const handleGoogleLogin = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
        });

        if (error) {
            toast.error("Google login failed");
            return;
        }

        if (data) {
            toast.success("Login successful!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4 py-6">

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
            >
                <Card className="p-5 sm:p-6 md:p-8 shadow-xl rounded-2xl bg-white dark:bg-gray-900 border dark:border-gray-800">


                    <motion.div variants={item} className="text-center mb-6">

                        <div className="flex justify-center mb-2">
                            <Image
                                src="/quickrent.png"
                                alt="Quick Rent Logo"
                                width={80}
                                height={80}
                                priority
                                className="rounded-full"
                            />
                        </div>

                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                            Quick Rent Platform

                        </h1>

                        <h3 className="text-sm text-gray-600 text-center">
                            Welcome Back to Our Property Rental & Booking Platform
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 mt-2">

                        </p>
                    </motion.div>


                    <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                        <motion.div variants={item}>
                            <TextField name="email" type="email" isRequired>
                                <Label>Email</Label>
                                <Input className="dark:bg-gray-800 dark:text-white" placeholder="john@example.com" />
                                <FieldError />
                            </TextField>
                        </motion.div>



                        <motion.div variants={item}>
                            <TextField name="password" type="password" isRequired>
                                <Label>Password</Label>
                                <Input className="dark:bg-gray-800 dark:text-white" placeholder="Enter password" />
                                <Description className="dark:text-gray-400">
                                    Minimum 6 characters with uppercase, lowercase and number
                                </Description>
                                <FieldError />
                            </TextField>
                        </motion.div>


                        <motion.div whileTap={{ scale: 0.97 }}>
                            <Button
                                type="submit"
                                className="w-full bg-black text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                                <Check />
                                Login
                            </Button>
                        </motion.div>
                    </Form>


                    <motion.div variants={item} className="flex items-center my-3">
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                        <span className="px-3 text-xs text-gray-400 dark:text-gray-500">
                            OR
                        </span>
                        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                    </motion.div>


                    <motion.div whileTap={{ scale: 0.97 }}>
                        <Button
                            onClick={handleGoogleLogin}
                            variant="secondary"
                            className="w-full flex items-center justify-center gap-2 border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <FcGoogle size={20} />
                            Continue with Google
                        </Button>
                    </motion.div>


                    <motion.p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-3">
                        Create a new account?{" "}
                        <Link
                            href="/register"
                            className="text-black dark:text-white font-medium hover:underline"
                        >
                            Register
                        </Link>
                    </motion.p>

                </Card>
            </motion.div>
        </div>
    );
};

export default SignInPage;