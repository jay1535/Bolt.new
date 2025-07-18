"use client";

import React, { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, User, Lock, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";

function Settings() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [avatar, setAvatar] = useState("");
  const { toggleSidebar } = useSidebar();
  const { userDetails } = useContext(UserDetailContext);

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay },
    },
  });

  const handleSaveProfile = () => {
    console.log("Profile Saved:", { name, email, avatar });
    alert("✅ Profile updated!");
  };

  const handleChangePassword = () => {
    console.log("Password Changed:", password);
    alert("✅ Password updated!");
  };

  const handleDeleteAccount = () => {
    if (confirm("⚠️ Are you sure you want to delete your account? This cannot be undone.")) {
      console.log("Account deleted");
      alert("❌ Account deleted!");
    }
  };

  return (
    <div
      className="flex flex-col flex-1  items-center min-h-screen px-4 py-8 md:p-16 lg:p-24 space-y-6"
      style={{
        background: "linear-gradient(135deg, #000, #0a0a0a)",
        color: "#e5e5e5",
      }}
    >
      {/* Sidebar toggle via avatar */}
      <div className="self-end mb-4 mr-4">
        {userDetails?.picture && (
          <Image
            onClick={toggleSidebar}
            src={userDetails.picture}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full cursor-pointer hover:scale-105 transition"
          />
        )}
      </div>

      {/* Page Header */}
      <motion.div
        className="text-center space-y-2"
        initial="hidden"
        animate="show"
        variants={fadeUp(0)}
      >
        <User className="w-12 h-12 mx-auto text-green-400 animate-pulse" />
        <h2 className="p-10 font-extrabold text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-gray-300">
          Settings
        </h2>
        <p className="max-w-2xl text-base md:text-lg text-gray-400 mx-auto">
          Manage your account settings and preferences here.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mt-6"
        initial="hidden"
        animate="show"
        variants={fadeUp(0.1)}
      >
        {/* Profile Settings */}
        <Card className="bg-gradient-to-br from-black via-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-green-600/30 hover:scale-[1.01] transition">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-300">
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-black text-gray-200 border border-gray-700"
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black text-gray-200 border border-gray-700"
            />
            <Input
              type="url"
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="bg-black text-gray-200 border border-gray-700"
            />
            <Button
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700"
            >
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card className="bg-gradient-to-br from-black via-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-green-600/30 hover:scale-[1.01] transition">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-300">
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black text-gray-200 border border-gray-700"
            />
            <Button
              onClick={handleChangePassword}
              className="bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700"
            >
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-gradient-to-br from-black via-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-green-600/30 hover:scale-[1.01] transition">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-300">
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="flex items-center gap-3 text-gray-300">
              <Bell className="text-green-400" /> Enable Email Notifications
            </p>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              className="data-[state=checked]:bg-green-600"
            />
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-gradient-to-br from-black via-gray-900 to-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-red-600/30 hover:scale-[1.01] transition">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-red-400">
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="flex items-center gap-3 text-gray-400">
              <Trash className="text-red-400" /> Delete your account permanently
            </p>
            <Button
              onClick={handleDeleteAccount}
              variant="destructive"
              className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700"
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Settings;
