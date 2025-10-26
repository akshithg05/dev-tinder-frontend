import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

export default function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function getFeed() {
    try {
      setLoading(true);
      const newFeed = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      dispatch(addFeed(newFeed?.data?.data));
    } catch (err) {
      if (!user) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center">
      {loading ? (
        <div className="flex justify-center mt-75">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : feed?.length === 0 ? (
        <div className="flex justify-center mt-75">
          <h1 className="text-2xl font-bold">No users</h1>
        </div>
      ) : (
        feed && <UserCard user={feed[0]} />
      )}
    </div>
  );
}
