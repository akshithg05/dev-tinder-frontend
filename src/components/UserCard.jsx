export default function UserCard({ user, profile }) {
  const { firstName, lastName, gender, skills, photoUrl, about, age } = user;
  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="Profile picture" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{`${age || ""},  ${gender || ""}`}</p>
          <p>{about}</p>
          {!profile && (
            <div className="card-actions justify-center mt-2">
              <button className="btn btn-soft btn-accent">Interested</button>
              <button className="btn btn-soft btn-secondary">Ignore</button>
            </div>
          )}
          <div>
            <p className="text-xl pb-2">Skills</p>
            {skills.map((skill) => (
              <div key={skill} className="badge  badge-primary mr-2 mb-2">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
