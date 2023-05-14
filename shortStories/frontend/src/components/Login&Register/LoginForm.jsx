import { useNavigate } from "react-router-dom";
import ButtonToggle from "./ButtonToggle";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../../context/userContext";


export default function LoginForm({ onClickToggle }) {
  const [userData, setUserData] = useState(
    {
      username: "",
      password: "",
    },
  );

  const [usernameExists, setUsernameExists] = useState(false);

  const {isLoggedIn, setIsLoggedIn, loginUsernameData, setLoginUsernameData} = useContext(UserContext)

  const API_URL_LOGIN = process.env.REACT_APP_API_LOGIN_URL
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserData({...userData, [name]: value});
  }

  function submitLogin(event) {
    event.preventDefault();

    axios.post(API_URL_LOGIN, userData)
    .then((response) => {
      setLoginUsernameData(response.data[0]) //grabs the username from backend response
      setIsLoggedIn(true);
      navigate("/");
    })
    .catch((e) => {
      setUsernameExists(true);
    })

  }

  return (
    <>

      {usernameExists && <ErrorMessage message="Something not quite right went wrong."/>}

      <div className="container">
        <div className="row mb-5 mt-5">
          <div className="col-md-8 col-xl-6 text-center mx-auto">
            <h2>Log in</h2>
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
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary d-block w-100"
                      type="submit"
                      onClick={submitLogin}
                    >
                      Login
                    </button>
                  </div>
                  <p>Forgot your password?</p>
                  <ButtonToggle
                    classes="btn-link"
                    onClickToggle={onClickToggle}
                  >
                    Still don't have an account?
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
