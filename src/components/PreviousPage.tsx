import { useNavigate } from "react-router-dom";
import BackImg from "../assets/icon-arrow-left.svg";

function PreviousPage(props: { title: string }) {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="sr-only">{props.title}</h1>
      <button className="btn flex btn-return" onClick={() => navigate(-1)}>
        <img src={BackImg} alt="" aria-hidden={true} />
        Go back
      </button>
    </div>
  );
}

export default PreviousPage;
