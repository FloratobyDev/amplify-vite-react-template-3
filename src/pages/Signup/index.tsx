import { FormEvent, useState } from "react";
import { signUp, confirmSignUp } from "aws-amplify/auth";

type Props = {
  setHasAuthenticated: (value: boolean) => void;
};

function Signup({ setHasAuthenticated }: Props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [nextStep, setNextStep] = useState("NONE");

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nextStep === "CONFIRM_SIGN_UP") {
      try {
        console.log("confirmSignUp:", email, code);
        await confirmSignUp({
          username: email,
          confirmationCode: code,
        });
        console.log("User confirmed");
        setHasAuthenticated(true);
      } catch (error) {
        console.log("Error signing up", error);
      }
      return;
    } else if (nextStep === "NONE") {
      try {
        const { nextStep, userId } = await signUp({
          username: email,
          password,
          options: {
            userAttributes: {
              email: email,
            },
          },
        });
        console.log("nextStep:", nextStep, userId);
        setNextStep(nextStep.signUpStep);
      } catch (error) {
        console.log("error signing up:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSignUp} className="form-control gap-y-3">
      {nextStep === "NONE" && (
        <>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </label>
        </>
      )}
      {nextStep === "CONFIRM_SIGN_UP" && (
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            value={code}
            placeholder="Password"
            onChange={(e) => setCode(e.currentTarget.value)}
          />
        </label>
      )}
      <button type="submit" className="btn">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
