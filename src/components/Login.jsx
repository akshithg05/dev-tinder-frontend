import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogIn, setIsLogIn] = useState(true);

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setError(null);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setError(null);
  }

  async function handleLogin() {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      setError(null);
      dispatch(addUser(res?.data.loggedInUser));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleSignUp() {
    try {
      setLoading(true);
      let res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName: firstName,
          lastName: lastName,
          emailId: email,
          password: password,
          age: age,
          gender: gender,
        },
        {
          withCredentials: true,
        }
      );
      res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.loggedInUser));
      return navigate("/feed");
    } catch (err) {
      if (err?.response?.data?.message?.startsWith("E11000")) {
        setError("Email id already exists!");
      } else {
        setError(err?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleAuthMethod() {
    setError(null);
    setIsLogIn(!isLogIn);
  }

  return (
    <div className="grid place-items-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{isLogIn ? "Login!" : "Sign up"}</h2>

          {!isLogIn && (
            <>
              <label className="label">First name</label>
              <label className="input validator">
                <input
                  required
                  type="text"
                  placeholder="First name"
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                  pattern="[A-Za-z\s\-]+"
                  title="Only letters, spaces, or hyphens allowed"
                  value={firstName}
                />
              </label>
              <div className="validator-hint hidden">Enter a valid name</div>

              <label className="label">Last name</label>
              <label className="input validator">
                <input
                  type="text"
                  placeholder="Last name"
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </label>

              <label className="label">Last name</label>
              <label className="input validator">
                <input
                  type="text"
                  placeholder="Age"
                  className="input"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                />
              </label>

              <label className="label">Gender</label>
              <div className="flex">
                <input
                  type="radio"
                  value="male"
                  name="radio-4"
                  className="radio radio-primary"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                <p className="pt-1 pl-3">Male</p>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  value="female"
                  name="radio-4"
                  className="radio radio-primary"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                <p className="pt-1 pl-3">Female</p>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  value="others"
                  name="radio-4"
                  className="radio radio-primary"
                  checked={gender === "others"}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                <p className="pt-1 pl-3">Others</p>
              </div>
            </>
          )}

          <label className="label">Email</label>
          <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              value={email}
              placeholder="mail@site.com"
              required
              onChange={handleEmailChange}
              autoComplete="off"
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          <label className="label">Password</label>
          <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
          {error && <p className="text-red-600">{error || "Something went wrong, try again later"}</p>}

          <button onClick={isLogIn ? handleLogin : handleSignUp} disabled={loading} className="btn btn-primary mt-4">
            {loading ? "Loading..." : isLogIn ? "Login" : "Sign up!"}
          </button>
          <p className="mt-2">
            {isLogIn ? "New user ? " : "Returning user ? "}
            <button className="cursor-pointer" onClick={handleAuthMethod}>
              <p className="font-bold ">{isLogIn ? "Sign up here!" : "Login here"}</p>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
