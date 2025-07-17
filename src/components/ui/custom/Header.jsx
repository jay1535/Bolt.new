import React, { useContext } from "react";
import { FaBolt } from "react-icons/fa6";
import { Button } from "../button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { LogOut } from "lucide-react";

function Header() {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);

  const handleSignOut = () => {
    setUserDetails(null);
    console.log("User signed out");
  };

  return (
    <div
      className="p-2 flex items-center justify-between w-full"
      style={{
        background: "transparent",
      }}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <FaBolt className="text-2xl text-blue-600" />
        <span className="font-bold text-lg">Bolt.new</span>
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex gap-3">
        {!userDetails?.name ? (
          <>
            <Button variant="ghost">Sign In</Button>
            <Button className="text-white bg-gradient-to-l from-blue-500 via-blue-600 to-blue-900">
              Get Started
            </Button>
          </>
        ) : (
          <Button
            onClick={handleSignOut}
            className="text-white bg-gradient-to-l from-blue-500 via-blue-600 to-blue-900 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
