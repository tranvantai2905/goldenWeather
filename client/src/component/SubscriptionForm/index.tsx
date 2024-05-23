import { useRef } from "react";
import { subscribe, unsubscribe } from "../../api/WeatherService";
import { notify_error, notify_success } from "../../App";

interface SubscriptionFormProps {
  handleBack: () => void;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ handleBack }) => {
  const email = useRef("");

  const onSubmit = async () => {
    try{
      const res = await subscribe({
        email: email.current,
      });
      notify_success(res?.status||"")
    }
    catch{
      notify_error()
    }
  };

  const onUnscriptionSubmit = async () => {
    try{
      const res = await unsubscribe({
        email: email.current,
      });
      notify_success(res?.status||"")
    }
    catch{
      notify_error()
    }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white xs:px-1 sm:px-2 md:px-6 xs:py-1 sm:py-5 md:py-10 dark:bg-dark sm:p-[20px]">
                <h3 className="mb-3 text-center text-2xl font-bold dark:text-black text-white sm:text-xl">
                  Ensure you sign up before subscribing
                </h3>
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm text-blue-800 dark:text-dark"
                  >
                    Work Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    className="border-stroke dark:text-white dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    onChange={(e) => (email.current = e.target.value)}
                  />
                </div>
                <div className="mb-2 sm:mb-4 md:mb-8 flex">
                    <label
                      htmlFor="checkboxLabel"
                      className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="checkboxLabel"
                          className="sr-only"
                        />
                        <div className="box mr-1 sm:mr-2 md:mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                          <span className="opacity-100">
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                fill="#3056D3"
                                stroke="#3056D3"
                                strokeWidth="0.4"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <span className="sm:text-xs md:text-base">
                        By creating account means you agree to the
                        <a href="#0" className="sm:text-xs md:text-base text-primary hover:underline">
                          {" "}
                          Terms and Conditions{" "}
                        </a>
                        , and our
                        <a href="#0" className="text-primary hover:underline">
                          {" "}
                          Privacy Policy{" "}
                        </a>
                      </span>
                    </label>
                  </div>
                <div className="xs:mb-2 sm:mb-4 md:mb-8">
                  <button
                    className="shadow-submit flex w-full items-center justify-center rounded-sm bg-blue-400 px-9 py-4 text-base font-medium text-black duration-300 hover:bg-slate-300"
                    onClick={() => onSubmit()}
                  >
                    Subscription
                  </button>
                </div>

                <div className="xs:mb-2 sm:mb-4 md:mb-8">
                  <button
                    className="shadow-submit flex w-full items-center justify-center rounded-sm bg-red-500 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-red-300"
                    onClick={() => onUnscriptionSubmit()}
                  >
                    Unsubscription
                  </button>
                </div>

                <p className="text-center sm:text-md md:text-base text-md font-medium text-body-color">
                  Forget to register?{" "}
                  <button
                    onClick={() => handleBack()}
                    className="text-blue-500 hover:underline"
                  >
                    Back to sign up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubscriptionForm;
