import { ComponentType, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCheckLiveExist } from '@apis/queries/client/useCheckLiveExist';

export default function withLiveExistCheck<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithLiveExistCheckComponent(props: P) {
    const { id: liveId } = useParams();
    const navigate = useNavigate();

    const { data: isLiveExistData } = useCheckLiveExist({ liveId: liveId as string });
    const isLiveExist = isLiveExistData?.exited;

    useEffect(() => {
      if (!isLiveExist) {
        navigate('/error');
      }
    }, [isLiveExistData]);

    return <WrappedComponent {...props} />;
  };
}
