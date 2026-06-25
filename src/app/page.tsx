import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton
} from "@clerk/nextjs";
import Image from "next/image"; // You can remove this if you aren't using images

export default function Home() {
  return (
    <div className="p-8 flex flex-col items-start gap-4">
      <h1 className="text-2xl font-bold">Home Page</h1>

      {/* RENDERED ONLY IF THE USER IS SIGNED OUT */}
      <SignedOut>
        {/* Wrapping our custom UI Button inside Clerk's SignUpButton */}
        <SignUpButton mode="modal">
          <Button>Sign Up</Button>
        </SignUpButton>
      </SignedOut>

      {/* RENDERED ONLY IF THE USER IS SIGNED IN */}
      <SignedIn>
        {/* Wrapping our custom UI Button inside Clerk's SignOutButton */}
        <SignOutButton>
          <Button variant="destructive">Log Out</Button>
        </SignOutButton>
      </SignedIn>
      
    </div>
  );
}