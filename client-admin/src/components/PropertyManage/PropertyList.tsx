import { memo } from 'react';
import { INhaDat } from '../../types/nhaDat.types';
import PropertyListItem from './PropertyListItem';

interface Props {
  properties: INhaDat[];
}

const PropertyList = ({ properties }: Props) => {
  return (
    <div>
      {properties.map((item, index) => (
        <PropertyListItem property={item} key={index} />
      ))}
    </div>
  );
};

export default memo(PropertyList);
