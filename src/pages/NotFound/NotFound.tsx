import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <ScreenContainer>
      <h1>Page Not Found</h1>
      <p>
        Sorry, the page you were looking for doesn’t exist. It might have been
        moved, deleted, or the URL could be incorrect.
      </p>
      <p>
        Please check the URL for mistakes or click the button below to return to
        the homepage.
      </p>
      <Link to="/">
        <button
          style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
        >
          Go to Home
        </button>
      </Link>
    </ScreenContainer>
  );
};

export default NotFound;
