import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { singInWithGoogle } = useContext(AuthContext);
  const [newUser, setNewUser] = useState();
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    console.log("add function called");
    const form = e.target;
    const accountType = form.accountType.value;
    const email = newUser.email;
    const name = newUser.displayName;

    const user = {
      name: name,
      email: email,
      accountType: accountType,
    };

    fetch("http://localhost:5000/createUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/");
      });
  };

  const handleGoogleSignIn = () => {
    const modal = document.getElementById('my_modal_1');
    singInWithGoogle()
      .then((result) => {
        setNewUser(result.user);
        fetch(`http://localhost:5000/user?email=${result.user.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data[0]==null) {
              modal.showModal();
            }
            navigate('/');
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="m-4">
      <div className="divider">OR</div>
      <button onClick={handleGoogleSignIn} className="btn">
        Google
      </button>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        id="my_modal_1"
        className="modal"
      >
        <div className="modal-box">
          <p className="py-4">Please enter your account information</p>
          <form onSubmit={add}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Account Type</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                name="accountType"
              >
                <option disabled selected>
                  Select Account Type
                </option>
                <option value="Job Seeker">Job Seeker</option>
                <option value="Employer">Employer</option>
              </select>
            </div>
            <div className="form-control my-5">
              <button className="btn">Add</button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SocialLogin;
