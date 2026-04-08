import { useState } from "react";
import MicrosoftLogo from "@/components/MicrosoftLogo";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "password">("email");
  const [error, setError] = useState("");

  const handleEmailNext = () => {
    if (!email.trim()) {
      setError("Enter a valid email address, phone number, or Skype name.");
      return;
    }
    setError("");
    setStep("password");
  };

  const handleSignIn = () => {
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      step === "email" ? handleEmailNext() : handleSignIn();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-[440px] bg-card shadow-[0_2px_6px_rgba(0,0,0,0.2)] p-11">
        <MicrosoftLogo />

        {step === "email" ? (
          <>
            <h1 className="text-2xl font-semibold text-foreground mt-4 mb-3">Sign in</h1>
            {error && <p className="text-sm text-destructive mb-3">{error}</p>}
            <input
              type="text"
              placeholder="Email, phone, or Skype"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full border-b border-b-foreground/40 focus:border-b-primary bg-transparent py-1.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors"
            />
            <p className="text-sm text-foreground mt-4">
              No account?{" "}
              <a href="#" className="text-primary hover:underline hover:text-accent-foreground">
                Create one!
              </a>
            </p>
            <p className="text-sm mt-2">
              <a href="#" className="text-primary hover:underline hover:text-accent-foreground">
                Can't access your account?
              </a>
            </p>
            <div className="flex justify-end mt-10">
              <button
                onClick={handleEmailNext}
                className="bg-primary text-primary-foreground px-8 py-1.5 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center mt-4 mb-4">
              <button
                onClick={() => setStep("email")}
                className="text-foreground hover:text-muted-foreground mr-2"
              >
                ←
              </button>
              <span className="text-sm text-foreground bg-muted rounded-full px-3 py-1">
                {email}
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-3">Enter password</h1>
            {error && <p className="text-sm text-destructive mb-3">{error}</p>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full border-b border-b-foreground/40 focus:border-b-primary bg-transparent py-1.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors"
            />
            <p className="text-sm mt-4">
              <a href="#" className="text-primary hover:underline hover:text-accent-foreground">
                Forgot password?
              </a>
            </p>
            <div className="flex justify-end mt-10">
              <button
                onClick={handleSignIn}
                className="bg-primary text-primary-foreground px-8 py-1.5 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Sign in
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
