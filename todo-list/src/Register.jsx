import { useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [con_password, setCon_Password] = useState("");
  const [loggin, setLoggedin] = useState(false);

  async function handleSumbit(e) {
    e.preventDefault();
    await axios
      .post("/register", {
        email: email,
        pwd: password,
      })
      .then((response) => {
        if (response.data.user) {
          alert("user already exist");
        } else {
          setLoggedin(true);
          Cookies.set("user", JSON.stringify({ email: email, pwd: password }));
          alert("user registered sucexfully");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  if (loggin) {
    return <Navigate to={"/todos"} />;
  }

  return (
    <>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className="p-3 h1 text-white">Todo List</h1>
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Create your todo account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSumbit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@ company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    value={con_password}
                    onChange={(e) => {
                      setCon_Password(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-300">
                      I accept the{" "}
                      <a
                        className="font-medium hover:underline text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                  Create
                </button>
                <p className="text-sm font-light text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium hover:underline text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
