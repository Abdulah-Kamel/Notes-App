import React from "react";
import { note } from "../../assets/images";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <section className="d-flex justify-content-center align-items-center py-5 mt-5 ">
      <section className="container">
        <section className="row bg-white rounded shadow p-3">
          <section className="col-md-6">
            <img src={note} alt="Note Book" className="w-100 rounded h-100" />
          </section>
          <section className="col-md-6 py-2">
            <section className="text-center">
              <h2 className="text-main-color">Join us Now!</h2>
            </section>
            <form>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="form-control mt-4"
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                className="form-control mt-4"
              />
              <input
                type="password"
                placeholder="Enter Your Password"
                className="form-control mt-4"
              />
              <input
                type="number"
                placeholder="Enter Your Age"
                className="form-control mt-4"
                max={60}
                min={18}
              />
              <input
                type="text"
                placeholder="Enter Your Phone Number"
                className="form-control mt-4"
              />
              <section>
                <button className="btn btn-main-color mt-3 w-100 p-2">
                  Sign Up
                </button>
              </section>
            </form>
            <section>
              <p className="mt-3">
                Already have an account?{" "}
                <Link to="/login" className="text-main-color  link-hover">
                  Login
                </Link>
              </p>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default SignUp;
