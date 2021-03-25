import { Link } from "react-router-dom";

import "./styles/link_to.css";

export default function LinkTo(props) {
  return (
    <>
      {props.external ? (
        <a href={props.to} target="_blank" rel="noreferrer" className="link">
          {props.children}
        </a>
      ) : (
        <Link
          to={props.to}
          className={!props.underline ? "link no-underline" : "link"}
          style={props.style}
        >
          {props.children}
        </Link>
      )}
    </>
  );
}
