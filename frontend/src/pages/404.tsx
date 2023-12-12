import { allImages, buttonType } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';
import Button from "../components/Button/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center mt-5">
        <img src={allImages.imageNotFound} width={"40%"} alt="not found" />
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        <Heading title="Something went wrong" className="text-center" />
        <Button
          onClick={() => navigate("/")}
          className={`${buttonType.primary} mt-6`}
        >
          Go to Home
        </Button>
      </div>
    </>
  );
};

export default NotFound;