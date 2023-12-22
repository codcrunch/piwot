import { motion } from "framer-motion";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";

const types = [
  {
    img: "/doctor.png",
    title: "Doctor",
  },
  {
    img: "/patient.png",
    title: "Patient",
  },
];

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { db, auth } from "@/firebase/config";
import { useEffect } from "react";
import Image from "next/image";

const LoginSection: React.FC = () => {
  const { user } = useAuthContext() as any;
  const [selectedType, setSelectedType] = useState("Patient");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [age, setAge] = useState("");
  const [licenseId, setlicenseId] = useState("");
  const [loginVisible, setLoginVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const [CsignUp, setCSignUp] = useState(false);

  async function handleSignUp({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    createUserWithEmailAndPassword(auth, email, password);
    if (
      name &&
      age &&
      specialization &&
      licenseId &&
      email &&
      password &&
      password === confirmPassword
    ) {
      const docRef = await setDoc(doc(db, "users", email), {
        name: name,
        age: selectedType === "Patient" ? age : null,
        specialization: selectedType === "Doctor" ? specialization : null,
        licenseId: selectedType === "Doctor" ? licenseId : null,
        email: email,
        password: password,
        doctor: selectedType === "Doctor" ? true : false,
      });
      alert("Signed Up");
    }
    if (password !== confirmPassword) {
      setPasswordMatch(false);
    }
    setLoginVisible(false);
  }

  useEffect(() => {
    if (user) {
      setLoginVisible(false);
    } else {
      setLoginVisible(true);
    }
  }, [user]);

  async function handleLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      if (email && password) {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setWrongCredentials(true);
    }
  }
  return (
    <>
      {!user ? (
        <motion.div
          className="w-full flex flex-col justify-center"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-semibold py-16 text-center">
            Login/Signup as
          </h1>

          <div className="md:flex flex-col lg:flex-row gap-16 justify-center">
            {types.map((type, index) => {
              return (
                <div
                  className={`flex flex-col items-center justify-center`}
                  key={index}
                >
                  <div
                    className={`${
                      index === 0
                        ? "lg:pr-[4rem] lg:border-r lg:border-black"
                        : null
                    }`}
                  >
                    <Dialog>
                      <DialogTrigger>
                        <motion.img
                          src={type.img}
                          alt={type.title}
                          className={`lg:w-96 w-72  bg-green-100 rounded-full p-4`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          onClick={() => {
                            setSelectedType(type.title);
                            setWrongCredentials(false);
                            setCSignUp(false);
                            setPasswordMatch(true);
                          }}
                        />
                      </DialogTrigger>
                      <DialogContent className="py-8">
                        <div className="flex gap-x-5 justify-between">
                          <div className="flex flex-col w-1/2 justify-center items-center">
                            <h1 className="text-center font-bold text-3xl">
                              {`${type.title}`}{" "}
                              {`${CsignUp ? "SignUp" : "Login"}`}{" "}
                            </h1>
                            <h3>
                              {wrongCredentials && !CsignUp ? (
                                <p className="text-xs text-red-500">
                                  Wrong Credentials
                                </p>
                              ) : null}
                            </h3>
                            <div className="flex flex-col space-y-2 py-8  relative">
                              {CsignUp ? (
                                <div>
                                  <p className="text-sm text-gray-400 pb-1">
                                    Name
                                    <span className="text-red-500 top-0 right-0">
                                      *
                                    </span>
                                  </p>
                                  <Input
                                    type="text"
                                    onChange={(e) => {
                                      setName(e.target.value);
                                    }}
                                  />
                                </div>
                              ) : null}

                              {CsignUp && selectedType === "Doctor" ? (
                                <div>
                                  <p className="text-sm text-gray-400 pb-1">
                                    License ID
                                    <span className="text-red-500 top-0 right-0">
                                      *
                                    </span>
                                  </p>
                                  <Input
                                    type="text"
                                    onChange={(e) => {
                                      setlicenseId(e.target.value);
                                    }}
                                  />
                                </div>
                              ) : null}

                              {CsignUp && selectedType === "Doctor" ? (
                                <div>
                                  <p className="text-sm text-gray-400 pb-1">
                                    Specialization
                                    <span className="text-red-500 top-0 right-0">
                                      *
                                    </span>
                                  </p>
                                  <Input
                                    type="text"
                                    onChange={(e) => {
                                      setSpecialization(e.target.value);
                                    }}
                                  />
                                </div>
                              ) : null}

                              {CsignUp && selectedType === "Patient" ? (
                                <div>
                                  <p className="text-sm text-gray-400 pb-1">
                                    Age
                                    <span className="text-red-500 top-0 right-0">
                                      *
                                    </span>
                                  </p>
                                  <Input
                                    type="text"
                                    onChange={(e) => {
                                      setAge(e.target.value);
                                    }}
                                  />
                                </div>
                              ) : null}

                              <div>
                                <p className="text-sm text-gray-400 pb-1">
                                  Email ID
                                  <span className="text-red-500 top-0 right-0">
                                    *
                                  </span>
                                </p>
                                <Input
                                  type="text"
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                  }}
                                />
                              </div>

                              <div>
                                <p className="text-sm text-gray-400 pb-1">
                                  Password
                                  <span className="text-red-500 top-0 right-0">
                                    *
                                  </span>
                                </p>
                                <Input
                                  type="password"
                                  onChange={(e) => {
                                    setPassword(e.target.value);
                                  }}
                                />
                              </div>

                              <div>
                                {CsignUp ? (
                                  <>
                                    <p className="text-sm text-gray-400 pb-1">
                                      Confirm Password
                                      <span className="text-red-500 top-0 right-0">
                                        *
                                      </span>
                                    </p>
                                    <Input
                                      type="password"
                                      onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                      }}
                                    />
                                    {!passwordMatch ? (
                                      <p className="text-xs text-red-500">
                                        Passwords don't match!
                                      </p>
                                    ) : null}
                                  </>
                                ) : null}
                              </div>

                              <div className="flex w-full justify-center">
                                {CsignUp ? (
                                  <button
                                    onClick={() => {
                                      handleSignUp({ email, password });
                                    }}
                                    className={`bg-green2 px-6 py-2 rounded-xl text-white `}
                                  >
                                    SignUp
                                  </button>
                                ) : (
                                  <button
                                    className={`bg-green2 px-6 py-2 rounded-xl text-white `}
                                    onClick={() => {
                                      handleLogin({ email, password });
                                    }}
                                  >
                                    Login
                                  </button>
                                )}
                              </div>

                              <div>
                                {CsignUp ? (
                                  <p>
                                    Have an account already?{" "}
                                    <span
                                      className="cursor-pointer underline underline-offset-2 text-green3"
                                      onClick={() => {
                                        setCSignUp(false);
                                      }}
                                    >
                                      Login
                                    </span>
                                  </p>
                                ) : (
                                  <p>
                                    Don&apos;t have an account?{" "}
                                    <span
                                      className="cursor-pointer underline underline-offset-2 text-green3"
                                      onClick={() => {
                                        setCSignUp(true);
                                      }}
                                    >
                                      Signup
                                    </span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="max-w-[50%] md:flex hidden">
                            <Image
                              src={
                                selectedType === "Doctor"
                                  ? "/doctorSI.jpeg"
                                  : "/userSI.jpeg"
                              }
                              alt=""
                              width={600}
                              height={100}
                              className="rounded-2xl "
                            />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <h1 className="md:text-3xl text-2xl font-semibold lg:py-16 py-8 text-center">
                    {type.title}
                  </h1>
                </div>
              );
            })}
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default LoginSection;
