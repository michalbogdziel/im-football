import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-12">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
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
