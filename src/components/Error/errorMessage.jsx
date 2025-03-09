import PropTypes from "prop-types";

export default function ErrorMessage({ children }) {
  return <p>{children}</p>;
}

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};
