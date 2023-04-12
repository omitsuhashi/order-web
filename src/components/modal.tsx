import { PropsWithChildren } from 'react';

type Props = {
  isActive: boolean;
  onClose: () => void;
};

export default function Modal({
  children,
  onClose,
  isActive,
}: PropsWithChildren<Props>) {
  const activeClass = isActive ? 'is-active' : '';

  return (
    <div className={`modal ${activeClass}`}>
      <div className='modal-background' onClick={onClose}></div>
      <div className='modal-content'>
        <div className='box'>{children}</div>
      </div>
      <button
        className='modal-close is-large'
        aria-label='close'
        onClick={onClose}
      ></button>
    </div>
  );
}
