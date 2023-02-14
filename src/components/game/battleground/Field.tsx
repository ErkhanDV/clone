import Cell from '../cell/Cell';

import './field.scss';

const Field = ({
  isRival,
  isAbleShoot = true,
  isStarted = true,
}: {
  isStarted?: boolean;
  isRival?: boolean;
  isAbleShoot?: boolean;
}) => {
  const field: string[] = new Array(100).fill('empty');
  return (
    <div
      style={{ opacity: isAbleShoot && isStarted ? 1 : 0.5 }}
      className="battleground"
    >
      {field.map((_, index) => (
        <Cell key={index} coordinate={index} isRival={isRival} />
      ))}
    </div>
  );
};

export default Field;