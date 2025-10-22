export default function UserCard({ user }) {
  const { firstName, lastName, gender, skills, photoURL, about, age } = user;
  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoURL} alt="Profile picture" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{`${age || ""},  ${gender || ""}`}</p>
          <p>{about}</p>
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-soft btn-accent">Interested</button>
            <button className="btn btn-soft btn-secondary">Ignore</button>
          </div>
        </div>
      </div>
    </div>
  );
}
