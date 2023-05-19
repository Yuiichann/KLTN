import React from 'react';
import { IBroker } from '../../types/broker.types';
import BrokerListItem from './BrokerListItem';

interface Props {
  brokers: IBroker[];
}

const BrokerList = ({ brokers }: Props) => {
  return (
    <div>
      {brokers.map((broker, index) => (
        <BrokerListItem broker={broker} key={index} />
      ))}
    </div>
  );
};

export default React.memo(BrokerList);
