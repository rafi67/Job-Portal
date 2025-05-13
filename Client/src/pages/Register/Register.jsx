import Lottie from "lottie-react";
import React, { useContext } from "react";
import registerLottieData from "../../assets/lottie/register.json";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";
import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = '/';

  if(user) return <Navigate to={from} from={location.pathname}></Navigate>

  const handleRegister = (e) => {
    e.preventDefault();
    
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmedPassword = form.confirmedPassword.value;
    const accountType = form.accountType.value;
    console.log('submit user data',email, password);

    if(password!==confirmedPassword) {
        toast.warning('Password mismatch');
        return;
    }

    const newUser = {
        name: name,
        email: email,
        accountType: accountType,
    };

    fetch("http://localhost:5000/createUser", {
      method: "Post",
      headers: {
        'content-type' : 'application/json',
      },
      body: JSON.stringify(newUser),
    })
    .then(res => res.json())
    .then(data => console.log(data));

    // password validation:
    // show password validation error
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        form.reset();
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={registerLottieData}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-5xl font-bold">Register now!</h1>
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirmed Password</span>
              </label>
              <input
                type="password"
                name="confirmedPassword"
                placeholder="confirm password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Account Type</span>
              </label>
              <select className="select select-bordered w-full max-w-xs" name="accountType">
                <option disabled selected>
                  Select Account Type
                </option>
                <option value="Job Seeker">Job Seeker</option>
                <option value="Employer">Employer</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
