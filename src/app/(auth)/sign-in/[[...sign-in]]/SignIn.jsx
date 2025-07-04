import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex-center bg-[#f4f4f4]">
      <SignIn path="/sign-in" routing="path" />
    </div>
  );
};

export default SignInPage;
