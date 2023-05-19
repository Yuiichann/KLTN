import BrokerFields from '../constants/BrokerFields.constants';

function getBrokerFieldLabel(value: string) {
  const current = BrokerFields.find((item) => item.value === value);

  return current ? current.label : '';
}

export default getBrokerFieldLabel;
