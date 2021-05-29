import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import "./styles/link_to.css";

const LinkTo = ({ external, to, underline, style, children }) => {
	return (
		<>
			{external ? (
				<a href={to} target='_blank' rel='noreferrer' className='link'>
					{children}
				</a>
			) : (
				<Link to={to} className={underline ? "link" : "link no-underline"} style={style}>
					{children}
				</Link>
			)}
		</>
	);
};

LinkTo.propTypes = {
	external: PropTypes.bool,
	to: PropTypes.string.isRequired,
	underline: PropTypes.bool,
	style: PropTypes.object,
	children: PropTypes.element,
};

LinkTo.defaultProps = {
	external: false,
	underline: false,
};

export default LinkTo;
