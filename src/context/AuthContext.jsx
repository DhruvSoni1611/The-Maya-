import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { initUser } from "../lib/api/user.js";

export function InitUserSync() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      initUser({
        email: user.primaryEmailAddress.emailAddress,
        clerkId: user.id,
        name: user.fullName,
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn]);

  return null;
}
