import { Spinner } from "react-bootstrap";
const Loader: React.FC = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "50px",
        height: "50px",
        margin: "auto",
        display: "block",
      }}
      data-testid="spinner"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
