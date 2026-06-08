import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-12">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        appearance={{
          variables: {
            colorPrimary: "#ff9b42",
            colorText: "#1c1c1c",
            colorBackground: "#ffffff",
          },
          elements: {
            rootBox: "mx-auto",
            card: "bg-white border border-card-border shadow-lg",
          },
        }}
      />
    </div>
  );
}
