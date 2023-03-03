import { IPlayerState } from '@/store/reducers/types/shipLocation';

const ResultTable = ({ user, name }: { user: IPlayerState; name: string }) => {
  return (
    <div className="users-result">
      <span>{name}</span>
      <span>{`Количество промахов: ${user.misses.length}`}</span>
      <span>{`Количество убитых кораблей: ${
        user.ships.filter((ship) => ship.decks === ship.woundedCells.length)
          .length
      }`}</span>
    </div>
  );
};

export default ResultTable;
