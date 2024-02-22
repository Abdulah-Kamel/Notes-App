import React, { useContext, useEffect, useState } from "react";
import { note } from "../../assets/images";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PulseLoader } from "react-spinners";
import { authContext } from "../../Context/AuthContext";
import { noteContext } from "../../Context/NoteContext";
import Swal from "sweetalert2";
import HashLoaderComponent from "../HashLoaderComponent/HashLoaderComponent";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please Enter A Valid Email")
      .required("Please Enter Your Email"),
    password: yup
      .string()
      .required("Please Enter Your Password")
      .matches(
        /^[A-Z][A-Za-z0-9]{7,}$/,
        "Must Contain 8 Characters and Start With One Uppercaser"
      ),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [btnloading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { login } = useContext(noteContext);
  const { token, setToken } = useContext(authContext);

  const handleLogin = async (userData) => {
    setBtnLoading(true);

    const data = await login(userData)
      .then((data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        });
        setBtnLoading(false);
        setToken(data?.data.token);
        localStorage.setItem("token", data?.data.token);
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.msg,
          showConfirmButton: true,
          allowOutsideClick: true,
          allowEnterKey: true,
          allowEscapeKey: true,
        });
        setBtnLoading(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const onSubmit = (data) => handleLogin(data);
  return (
    <>
      {loading ? (
        <HashLoaderComponent />
      ) : (
        <section className="d-flex justify-content-center align-items-center py-sm-5 mt-5 ">
          <section className="container py-sm-5">
            <section className="row bg-white rounded shadow ">
              <section className="col-md-6 p-0">
                <section className="h-100">
                  <img
                    src={note}
                    alt="Note Book"
                    className="w-100 note-img-round h-100"
                  />
                </section>
              </section>
              <section className="col-md-6 py-2">
                <section className="text-center py-3">
                  <h2 className="text-main-color">Welcome Back!</h2>
                </section>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <section className="mt-3">
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="form-control mt-2"
                      {...register("email")}
                    />
                    {errors.email?.message && (
                      <section className="alert alert-danger rounded mt-2 p-2">
                        {errors.email?.message}
                      </section>
                    )}
                  </section>
                  <section className="mt-3">
                    <input
                      type="password"
                      placeholder="Enter Your Password"
                      className="form-control mt-2"
                      {...register("password")}
                    />
                    {errors.password?.message && (
                      <section className="alert alert-danger rounded mt-2 p-2">
                        {errors.password?.message}
                      </section>
                    )}
                  </section>
                  <section className="mt-3">
                    <button
                      className={`btn btn-main-color w-100 p-2 ${
                        errors.email || errors.password ? "disabled" : ""
                      }`}
                    >
                      {btnloading ? (
                        <PulseLoader color="#fff" size={15} />
                      ) : (
                        "Login"
                      )}
                    </button>
                  </section>
                </form>
                <section className="mt-2">
                  <p>
                    Don&apos;t have an account?
                    <Link
                      to="/signup"
                      className="text-main-color  link-hover ms-1"
                    >
                      Join Us
                    </Link>
                  </p>
                </section>
              </section>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default Login;
