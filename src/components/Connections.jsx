import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Connection() {
  const [loading, setLoading] = useState(false);
  const [connectionsData, setConnectionsData] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function fetchConnections() {
    try {
      setLoading(true);
      const data = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
      setConnectionsData(data?.data?.connections);
    } catch (err) {
      setError(err);
      navigate("/error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connectionsData.length === 0) {
    return <h1 className="font-bold text-2xl px-5 py-3">No connections found!</h1>;
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-75">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : error ? (
        <>Something went wrong</>
      ) : (
        <>
          <h1 className="py-3 px-5 font-bold text-2xl">Connections</h1>
          <div className="flex justify-center mb-5">
            <div className="flex flex-col justify-center gap-4 overflow-y-auto max-h-[80vh] px-3 w-full sm:w-auto">
              {connectionsData.map((connection) => {
                return (
                  <div key={connection?._id} className="card card-side bg-base-300 shadow-sm w-full sm:w-[90%] md:w-[700px] flex-shrink-0">
                    <figure>
                      <img className="w-30" src={connection?.photoUrl} alt="photo" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title font-bold">{`${connection?.firstName} ${connection?.lastName}`}</h2>
                      <p>{connection?.about}</p>
                      <p>{`${connection?.age}, ${connection?.gender}`}</p>

                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Message!</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
