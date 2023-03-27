import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const TransactionNavbar = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-2">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <button
          type="button"
          className="btn btn-outline-light me-3"
          onClick={handleBackClick}>
          <FiArrowLeft size={24} />
        </button>
        <a className="navbar-brand mt-1" href="/home">
          <strong>
            <h2>Walleto</h2>
          </strong>
        </a>
      </div>
    </nav>
  );
};

export default TransactionNavbar;
