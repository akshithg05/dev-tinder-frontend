import { useNavigate } from "react-router-dom";

export default function Modal({
  title,
  children,
  isOpen,
  onClose,
  showConnectionButton,
}) {
  const navigate = useNavigate();
  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="py-2">{children}</div>

        <div className="modal-action">
          {showConnectionButton && (
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/connections");
              }}
            >
              Go to connections
            </button>
          )}
          <button className="btn btn-soft btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
