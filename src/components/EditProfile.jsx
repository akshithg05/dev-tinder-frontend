import { useState } from "react";
import { isValidURL } from "../../utils/helpers";
import UserCard from "./UserCard";

export default function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [about, setAbout] = useState(user?.about);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState(user?.skills);
  const [error, setError] = useState("");
  const [urlError, setUrlError] = useState(false);
  const [ageError, setAgeError] = useState(false);

  function handleAgeChange(e) {
    setAgeError(false);
    const value = e.target.value;
    setAge(value);
    if (value < 18 || value > 99) {
      setAgeError(true);
    }
  }

  function handleAddSkill(newSkill) {
    setError("");
    if (skills.length >= 10) {
      setError("You can add up to 10 skills only.");
      return;
    }
    if (skills.includes(newSkill)) {
      setError("Skill already exists, enter different skill");
      return;
    }
    if (newSkill === "" || newSkill === undefined || newSkill === null) {
      setError("Skill cannot be empty");
      return;
    }
    setSkills([...skills, newSkill]);
    setSkill("");
  }

  function handleDeleteSkill(currSkill) {
    setError("");
    const newSkills = skills.filter((skill) => skill !== currSkill);
    setSkills(newSkills);
    setSkill("");
  }

  function handleUrlChange(e) {
    const url = e.target.value;
    setPhotoUrl(url);

    if (url.trim() === "") {
      setUrlError(false);
      return;
    }

    if (!isValidURL(url)) {
      setUrlError(true);
    } else {
      setUrlError(false);
    }
  }

  return (
    <div className="flex justify-center ">
      <div className="grid place-items-center mt-10 mr-5">
        <fieldset className="fieldset bg-base-300  shadow-sm border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Edit Profile</legend>

          <label className="label">First Name</label>
          <input
            type="text"
            value={firstName}
            className="input"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            value={lastName}
            className="input"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Age</label>
          <input
            type="number"
            value={age}
            className="input"
            placeholder="Age"
            onChange={handleAgeChange}
            min={18}
            max={99}
          />
          {age !== "" && (age < 18 || age > 99) && (
            <p className="text-red-500 text-sm mt-1">Age must be between 18 and 99.</p>
          )}

          <label className="label">About</label>
          <input
            type="text"
            value={about}
            className="input"
            placeholder="About"
            onChange={(e) => setAbout(e.target.value)}
          />

          <label className="label">Photo URL</label>
          <input type="text" value={photoUrl} className="input" placeholder="Photo" onChange={handleUrlChange} />
          {urlError && <p className="text-red-500 text-sm mt-1">Enter a valid URL</p>}

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

          <label className="label">Skills</label>
          <input
            type="text"
            className="input"
            value={skill}
            placeholder="Enter skills one by one"
            onChange={(e) => setSkill(e.target.value)}
          />
          <p className="text-red-500 text-sm mt-1">{error}</p>

          <div className="flex justify-end md-10">
            <button className="btn btn-soft btn-primary w-25" onClick={() => handleAddSkill(skill)}>
              Add skill
            </button>
          </div>

          <div>
            {skills.map((skill) => {
              return (
                <div key={skill} className="badge  badge-primary mr-2 mb-2">
                  <button className="cursor-pointer" onClick={() => handleDeleteSkill(skill)}>
                    {skill} ✕
                  </button>
                </div>
              );
            })}
          </div>

          <button disabled={ageError || urlError} className="btn btn-soft btn-primary mt-5">
            Save Profile
          </button>
        </fieldset>
      </div>
      <div className="mt-4">
        <UserCard user={{ firstName, lastName, age, about, gender, skills, photoUrl }} profile={true} />
      </div>
    </div>
  );
}
