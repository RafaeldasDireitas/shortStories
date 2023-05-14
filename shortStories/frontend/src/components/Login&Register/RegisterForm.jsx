import ButtonToggle from "./ButtonToggle";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function RegisterForm({ onClickToggle }) {
  const [loginData, setLoginData] = useState(
    {
      username: "",
      password: "",
      email: "",
    },
  );

  const [usernameExists, setUsernameExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUsernameData, setLoginUsernameData } = useContext(UserContext);
  const checkNonNumeric = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i; //REGEX EXPRESSION

  const API_URL_REGISTER = process.env.REACT_APP_API_REGISTER_URL;
  const navigate = useNavigate();

  const handleInputChange = (input) => {
    const { name, value } = input.target;
    setLoginData({ ...loginData, [name]: value });
  };

  function submitRegister(event) {
    event.preventDefault();

    if (checkNonNumeric.test(loginData.email)) {
      setLoginData(loginData.email);

      axios
      .post(API_URL_REGISTER, loginData)
      .then((response) => {
        navigate("/");
      })
      .catch((e) => {
        setUsernameExists(true);

        if (e.response.status === 401) {
          setErrorMessage(e.response.data.message);
        }
        if (e.response.status === 400) {
          setErrorMessage(e.response.data.message);
        }
      });
    } else {
      setUsernameExists(true);
      const error = "This email is not valid.";
      setErrorMessage(error);
    }
  }

  return (
    <>
      {usernameExists ? <ErrorMessage message={errorMessage} /> : <h1></h1>}

      <div className="container">
        <div className="row mb-5 mt-5">
          <div className="col-md-8 col-xl-6 text-center mx-auto">
            <h2>Register</h2>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 col-xl-4">
            <div className="card mb-5">
              <div className="card-body d-flex flex-column align-items-center">
                <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                  <svg
                    className="bi bi-person"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                  </svg>
                </div>
                <form className="text-center" method="post">
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      value={loginData.username}
                      onChange={handleInputChange}
                      name="username"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="email"
                      value={loginData.email}
                      onChange={handleInputChange}
                      name="email"
                      placeholder="Email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="password"
                      value={loginData.password}
                      onChange={handleInputChange}
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary d-block w-100"
                      onClick={submitRegister}
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                  <ButtonToggle
                    classes="btn-link"
                    onClickToggle={onClickToggle}
                  >
                    Already have an account?
                  </ButtonToggle>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
