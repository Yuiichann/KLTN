import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import Loading from './Loading';

interface Props {
  children: JSX.Element;
}

const ProtectedLayout = ({ children }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { isGlobalLoading } = useSelector(
    (state: RootState) => state.globalLoading
  );

  if (isGlobalLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedLayout;
