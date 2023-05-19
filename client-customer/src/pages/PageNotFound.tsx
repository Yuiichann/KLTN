import { useNavigate } from 'react-router-dom';
import ImgNotFound from '../assets/img/page_not_found.png';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-[calc(100vh-96px)] flex flex-col items-center justify-center gap-4">
      <img alt="page-not-found" src={ImgNotFound} className="w-1/5 h-1/4 object-cover min-w-fit" />

      <button onClick={() => navigate(-1)} type="button" className="btn btn-sm btn-secondary px-12">
        Quay lại
      </button>
    </div>
  );
};

export default PageNotFound;
