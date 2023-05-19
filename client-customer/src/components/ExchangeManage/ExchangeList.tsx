import { memo } from 'react';
import { IExchange } from '../../types/exchange.types';
import ExchangeListItemBuy from './ExchangeListItemBuy';
import ExchangeListItemSell from './ExchangeListItemSell';

interface Props {
  exchanges: IExchange[];
  party: 'buy' | 'sell';
  handleReload: VoidFunction;
}

const ExchangeList = ({ exchanges, party, handleReload }: Props) => {
  return (
    <div>
      {exchanges.map((exchange, index) =>
        party === 'buy' ? (
          <ExchangeListItemBuy
            key={index}
            exchange={exchange}
            handleReload={handleReload}
          />
        ) : (
          <ExchangeListItemSell
            key={index}
            exchange={exchange}
            handleReload={handleReload}
          />
        )
      )}
    </div>
  );
};

export default memo(ExchangeList);
