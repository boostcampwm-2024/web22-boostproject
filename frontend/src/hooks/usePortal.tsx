import ReactDOM from 'react-dom';

export function usePortal() {
  const createPortal = (children: React.ReactNode) => {
    const portalRoot = document.getElementById('portal');
    if (!portalRoot) {
      throw new Error('포털을 위한 DOM 노드가 존재하지 않습니다.');
    }
    
    return ReactDOM.createPortal(children, portalRoot);
  };

  return createPortal;
}
