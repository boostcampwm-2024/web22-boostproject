import { ComponentType, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCheckReplayExist } from '@apis/queries/replay/useCheckReplayExist';

export default function withReplayExistCheck<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithReplayExistCheckComponent(props: P) {
    const { id: videoId } = useParams();
    const navigate = useNavigate();

    const { data: isReplayExistData } = useCheckReplayExist({ videoId: videoId as string });
    const isReplayExist = isReplayExistData?.existed;

    useEffect(() => {
      if (!isReplayExist) {
        navigate('/error');
      }
    }, [isReplayExistData]);

    return <WrappedComponent {...props} />;
  };
}
