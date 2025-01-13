import { ComponentType } from 'react';
import { initializeUserId } from '@utils/id';

export default function withUserId<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithUserIdComponent(props: P) {
    initializeUserId();
    return <WrappedComponent {...props} />;
  };
}
