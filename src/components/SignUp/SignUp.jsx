import React, { useContext, useEffect, useState } from "react";
import { note } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { HashLoader, PulseLoader } from "react-spinners";
import { noteContext } from "../../Context/NoteContext";
import Swal from "sweetalert2";

const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "Name Must Be More Than 3")
      .required("Please Enter Your Name"),
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
    age: yup
      .number()
      .typeError("Age Must Be A Number")
      .min(18, "Age Must Be 18 Or Above")
      .max(60, "Age Must Be Below 60")
      .required("Please Enter Your Age"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "Please Enter A Valid Phone Number")
      .required("Please Enter Your Phone Number"),
  })
  .required();

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [btnloading, setBtnLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { signup } = useContext(noteContext);

  const handleSignUp = async (userData) => {
    setBtnLoading(true);
    const data = await signup(userData)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign Up Success",
          showConfirmButton: false,
          timer: 1500,
        });
        setBtnLoading(false);
        navigate("/login");
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

  const onSubmit = (data) => handleSignUp(data);
  return (
    <>
      {loading ? (
        <section className="d-flex justify-content-center align-items-center position-absolute top-0 bottom-0 end-0 start-0">
          <HashLoader size={100} color="#625EB8" />
        </section>
      ) : (
        <section className="d-flex justify-content-center align-items-center py-sm-5 mt-5 ">
          <section className="container py-sm-3">
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
                  <h2 className="text-main-color">Join us Now!</h2>
                </section>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <section className="mt-3">
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className="form-control"
                      {...register("name")}
                    />
                    {errors.name?.message && (
                      <section className="alert alert-danger rounded mt-2 p-2">
                        {errors.name?.message}
                      </section>
                    )}
                  </section>
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
                    <input
                      type="number"
                      placeholder="Enter Your Age"
                      className="form-control mt-2"
                      {...register("age")}
                    />
                    {errors.age?.message && (
                      <section className="alert alert-danger rounded mt-2 p-2">
                        {errors.age?.message}
                      </section>
                    )}
                  </section>
                  <section className="mt-3">
                    <input
                      type="tel"
                      placeholder="Enter Your Phone Number"
                      className="form-control mt-2"
                      {...register("phone")}
                    />
                    {errors.phone?.message && (
                      <section className="alert alert-danger rounded mt-2 p-2">
                        {errors.phone?.message}
                      </section>
                    )}
                  </section>
                  <section className="mt-3">
                    <button
                      className={`btn btn-main-color w-100 p-2 ${
                        errors.name ||
                        errors.email ||
                        errors.password ||
                        errors.age ||
                        errors.phone
                          ? "disabled"
                          : ""
                      }`}
                    >
                      {btnloading ? (
                        <PulseLoader color="#fff" size={15} />
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                  </section>
                </form>
                <section className="mt-2">
                  <p>
                    Already have an account?
                    <Link
                      to="/login"
                      className="text-main-color  link-hover ms-1"
                    >
                      Login
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

export default SignUp;
