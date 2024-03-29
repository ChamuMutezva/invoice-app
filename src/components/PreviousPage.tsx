import { useNavigate } from "react-router-dom";
import BackImg from "../assets/icon-arrow-left.svg";

function PreviousPage(props: { title: string; page: string }) {
  const navigate = useNavigate();
  return (
    <div className="wrapper-intro">
      <h1 className="sr-only">{props.title}</h1>
      <button className="btn flex btn-return" onClick={() => navigate(-1)}>
        <img
          src={BackImg}
          alt=""
          aria-hidden={true}
          width={"7"}
          height={"10"}
        />
        Return
        <span className="sr-only">to {props.page}</span>
      </button>
    </div>
  );
}

export default PreviousPage;
