import { FC } from 'react';

import './Spinner.scss';

import { useAppSelector } from '@/hook/_index';

const Spinner: FC = () => {
  const { inviteInProgress } = useAppSelector(
    (state) => state.InviteStateSlice,
  );

  if (inviteInProgress) {
    return <div className="lds-dual-ring"></div>
  }

  return null;
};

export default Spinner;
