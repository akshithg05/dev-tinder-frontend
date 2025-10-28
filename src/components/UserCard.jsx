import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { BASE_URL } from "../../utils/constants";
import { removeUserFromFeed } from "../store/feedSlice";

export default function UserCard({ user, profile }) {
  const [ignoreLoading, setIgnoreLoading] = useState(false);
  const [interestedLoading, setInterestedLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [action, setAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);

  const { _id, firstName, lastName, gender, skills, photoUrl, about, age } =
    user;

  const dispatch = useDispatch();

  async function handleSwipe(requesterId, action) {
    try {
      if (action === "interested") {
        setInterestedLoading(true);
      } else {
        setIgnoreLoading(true);
      }
      setAction(action);
      const res = await axios.post(
        `${BASE_URL}/request/send/${action}/${requesterId}`,
        {},
        { withCredentials: true }
      );
      if (res?.data?.isMatch) {
        setShowModal(res?.data?.isMatch);
        const matched = await axios.get(
          `${BASE_URL}/user/${res?.data?.data?.fromUserId}`,
          { withCredentials: true }
        );
        setMatchedUser(matched?.data?.user);
      }

      dispatch(removeUserFromFeed(requesterId));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      setError(err);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } finally {
      setInterestedLoading(false);
      setIgnoreLoading(false);
    }
  }

  if (error) {
    <h1 className="font-bold text-2xl">Something went wrong!</h1>;
  }

  return (
    <>
      {showModal && (
        <Modal
          isOpen={showModal}
          title="It is a match!!"
          onClose={() => setShowModal(false)}
          showConnectionButton={true}
        >
          You can go to your connections and begin your conversation with{" "}
          <h1 className="font-bold">
            {matchedUser?.firstName} {matchedUser?.lastName} !
          </h1>
        </Modal>
      )}
      {showToast && (
        <div className="toast toast-center toast-top">
          <div
            className={`alert ${
              action === "interested" ? "alert-success" : "alert-warning"
            }`}
          >
            {action === "interested" ? (
              <span>{action} ! 😄</span>
            ) : (
              <span>{action} ☹️</span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-center my-10 w-[100%] md:w-[86%]">
        <div className="card bg-base-300 w-96 shadow-sm">
          <figure>
            <img
              className="h-100 w-full"
              src={photoUrl}
              alt="Profile picture"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
            <p>{`${age || ""},  ${gender || ""}`}</p>
            <p>{about}</p>

            <div>
              <p className="text-xl pb-2">Skills</p>
              {skills.map((skill) => (
                <div key={skill} className="badge  badge-primary mr-2 mb-2">
                  {skill}
                </div>
              ))}
            </div>
            {!profile && (
              <div className="card-actions justify-center mt-2">
                <button
                  disabled={interestedLoading || ignoreLoading}
                  className="btn btn-soft btn-accent w-30"
                  onClick={() => handleSwipe(_id, "interested")}
                >
                  {interestedLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Interested"
                  )}
                </button>
                <button
                  disabled={ignoreLoading || interestedLoading}
                  className="btn btn-soft btn-secondary w-30"
                  onClick={() => handleSwipe(_id, "ignored")}
                >
                  {ignoreLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Ignore"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
