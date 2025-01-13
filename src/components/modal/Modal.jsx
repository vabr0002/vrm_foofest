"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserByCredentials, createUser } from "@/lib/supabaseUser";
import {
  getCurrentTheme,
  applyTheme,
  toggleTheme
} from "@/utils/themeSwitcher";

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const Modal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // Tilstand for at holde styr på mørk tilstand
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        const user = await getUserByCredentials(data.email, data.password);
        if (user) {
          login(user);
          router.push("/pages/login");
        } else {
          alert("Invalid email or password.");
        }
      } else {
        const newUser = {
          user_name: data.name,
          user_email: data.email,
          user_password: data.password
        };
        const createdUser = await createUser(newUser);
        login(createdUser);
        router.push("/pages/login");
      }
      onClose();
    } catch (error) {
      console.error("Authentication error:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  // Hør efter ændringer i temaet
  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = getCurrentTheme();
      setIsDarkMode(currentTheme === "dark");
    };

    // Lyt på temaændringer
    window.addEventListener("themeChange", handleThemeChange);

    // Initial temaopsætning
    handleThemeChange();

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-opacity-75 flex items-center justify-center z-50 ${
        isDarkMode ? "bg-black dark:bg-white" : "bg-white dark:bg-black"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`border-2 p-5 m-5 md:p-8 md:m-0 shadow-lg max-w-lg w-full relative ${
          isDarkMode
            ? "bg-black text-white border-white"
            : "bg-white text-black border-black"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-gray-300 hover:text-gray-500 ${
            isDarkMode
              ? "dark:text-gray-600 dark:hover:text-gray-800"
              : "text-gray-600 hover:text-gray-800"
          }`}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2
          className={`text-center text-2xl font-bold font-titan ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          {isLogin ? "Login to FooFest" : "Create an Account"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-inverted"
        >
          {!isLogin && (
            <div>
              <label
                className={`block text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } mb-1`}
              >
                Name
              </label>
              <Input
                placeholder="Your Name"
                {...register("name")}
                className={`w-full ${
                  isDarkMode ? "bg-black text-white" : "bg-white text-black"
                } border-2 border-gray-400 focus:border-primary`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}
          <div>
            <label
              className={`block text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-1`}
            >
              Email
            </label>
            <Input
              placeholder="Your Email"
              {...register("email")}
              className={`w-full ${
                isDarkMode ? "bg-black text-white" : "bg-white text-black"
              } border-2 border-gray-400 focus:border-primary`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              className={`block text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } mb-1`}
            >
              Password
            </label>
            <Input
              type="password"
              placeholder="Your Password"
              {...register("password")}
              className={`w-full ${
                isDarkMode ? "bg-black text-white" : "bg-white text-black"
              } border-2 border-gray-400 focus:border-primary`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className={`w-full py-2 ${
              isDarkMode
                ? "bg-white text-black border-black hover:bg-transparent hover:text-primary"
                : "bg-black text-white border-white hover:bg-transparent hover:text-primary"
            } border`}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <p
          className={`mt-6 text-center text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              reset();
            }}
            className={`cursor-pointer font-semibold hover:underline ${
              isDarkMode ? "text-primary-dark" : "text-primary"
            }`}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Modal;
