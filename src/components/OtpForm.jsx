import { useState } from "react";
import { Link } from "react-router-dom";

function OtpForm() {
  const [otp, setOtp] = useState({
    firstNum: "",
    secondNum: "",
    thirdNum: "",
    fourthNum: "",
  });
  const [borderColor, setBorderColor] = useState("border-none");
  const [isOtpValid, setIsOtpValid] = useState(undefined);
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let userInput = "";

    for (let key in otp) {
      userInput += otp[key];
    }

    if (userInput.length === 4) {
      setSubmitted(true);

      if (userInput === String(import.meta.env.VITE_VALID_OTP_KEY)) {
        setIsOtpValid(true);
        setBorderColor("border-[#23CF9B]");
      } else {
        setIsOtpValid(false);
        setBorderColor("border-[#EB2D5B]");
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Backspace") {
      setTimeout(() => {
        const previousSibling = e.target.previousSibling;
        if (previousSibling) {
          previousSibling.focus();
        }
        if (!isOtpValid) {
          setSubmitted(false);
          setBorderColor("border-none");
        }
      }, 100);
    } else if (e.key >= "0" && e.key <= "9" && e.target.value.length === 1) {
      setTimeout(() => {
        const nextSibbling = e.target.nextSibling;
        if (nextSibbling) {
          nextSibbling.focus();
        }
      }, 100);
    }
  };

  return (
    <div
      className="relative bg-[#3F72AF] min-h-screen min-w-full flex justify-center items-start
"
    >
      <div className="flex flex-col justify-start items-center gap-8 mt-12">
        <h1 className="text-white text-7xl font-bold">Chai aur Code</h1>
        <div className="bg-white min-w-[700px] min-h-[450px] rounded-[18px] flex flex-col items-center justify-center gap-6">
          <h2 className="text-black text-3xl font-semibold">
            Mobile Phone Verification
          </h2>

          <p className="text-[#BFBFBF] w-96 text-center">
            Enter the 4-digit verification code that was sent to your phone
            number.
          </p>

          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col justify-center items-center gap-4"
          >
            <div className=" flex flex-row justify-center items-center gap-4">
              <input
                className={`text-center text-4xl font-semibold bg-[#DBE2EF] w-[90px] h-[100px] rounded-xl border ${borderColor} 
                `}
                type="number"
                value={otp.firstNum}
                onChange={(e) => {
                  if (e.target.value.length <= 1) {
                    setOtp((prev) => {
                      return { ...prev, firstNum: e.target.value };
                    });
                  }
                }}
                onKeyUp={(e) => handleKeyUp(e)}
                autoFocus="autofocus"
                readOnly={isOtpValid}
              />
              <input
                className={`text-center text-4xl font-semibold bg-[#DBE2EF] w-[90px] h-[100px] rounded-xl border ${borderColor}`}
                type="number"
                value={otp.secondNum}
                onChange={(e) => {
                  if (e.target.value.length <= 1) {
                    setOtp((prev) => {
                      return { ...prev, secondNum: e.target.value };
                    });
                  }
                }}
                onKeyUp={(e) => handleKeyUp(e)}
                readOnly={isOtpValid}
              />
              <input
                className={`text-center text-4xl font-semibold bg-[#DBE2EF] w-[90px] h-[100px] rounded-xl border ${borderColor}`}
                type="number"
                value={otp.thirdNum}
                onChange={(e) => {
                  if (e.target.value.length <= 1) {
                    setOtp((prev) => {
                      return { ...prev, thirdNum: e.target.value };
                    });
                  }
                }}
                onKeyUp={(e) => handleKeyUp(e)}
                readOnly={isOtpValid}
              />
              <input
                className={`text-center text-4xl font-semibold bg-[#DBE2EF] w-[90px] h-[100px] rounded-xl border ${borderColor}`}
                type="number"
                value={otp.fourthNum}
                onChange={(e) => {
                  if (e.target.value.length <= 1) {
                    setOtp((prev) => {
                      return { ...prev, fourthNum: e.target.value };
                    });
                  }
                }}
                onKeyUp={(e) => handleKeyUp(e)}
                readOnly={isOtpValid}
              />
            </div>

            {!submitted ? (
              <button
                className="bg-[#112D4E] text-white w-full rounded-lg p-4 text-xl font-semibold"
                type="submit"
              >
                Verify Account
              </button>
            ) : (
              <button
                className={`bg-[#112D4E] text-white w-full rounded-lg p-4 text-xl font-semibold ${
                  isOtpValid ? `bg-[#23CF9B]` : `bg-[#EB2D5B]`
                }`}
                type="submit"
                disabled
              >
                {isOtpValid ? "Verified" : "Verification failed"}
              </button>
            )}
          </form>

          <div className="text-[#BFBFBF]">
            Didn’t receive code?{" "}
            <span className="text-[#112D4E]">
              <Link
                to={"/otp-form"}
                onClick={() => {
                  setOtp({
                    firstNum: "",
                    secondNum: "",
                    thirdNum: "",
                    fourthNum: "",
                  });
                  setIsOtpValid(undefined);
                  setSubmitted(false);
                  setBorderColor("border-none");
                }}
              >
                Resend
              </Link>
            </span>
          </div>
        </div>
      </div>
      <Link to={"https://www.chaicode.com"} target="_blank">
        <img
          className="absolute right-10 bottom-10"
          src="/logo.png"
          alt="Chai aur Code Logo"
          height={100}
          width={100}
        />
      </Link>
    </div>
  );
}

export default OtpForm;
