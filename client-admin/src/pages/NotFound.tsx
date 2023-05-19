import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen bg-sidebar text-white h-screen flex flex-col gap-6 items-center justify-center select-none">
      <div className="flex items-start gap-12">
        <h1 className="text-9xl">4</h1>
        <h1 className="text-9xl">0</h1>
        <h1 className="text-9xl">4</h1>
      </div>

      <button className="text-xl underline p-2" onClick={() => navigate(-1)}>
        Quay Lại
      </button>
    </div>
  );
};

export default NotFound;
