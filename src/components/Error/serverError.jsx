import PropTypes from "prop-types";

export default function ServerError({ children }) {
  return <p>{children}</p>;
}

ServerError.propTypes = {
  children: PropTypes.node.isRequired,
};
