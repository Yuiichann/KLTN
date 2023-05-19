import { IBroker, IFieldBroker } from '../types/broker.types';
import { chooseDistrict, chooseProvince } from './chooseLocation.utils';

function formatFieldsResponse(fields: IBroker['fields']) {
  return fields.map((item) => {
    const field = {
      value: item.field_code,
      label: item.field_name,
    };

    const currentProvince = chooseProvince(item.location.province.code);

    const currentDistrict = chooseDistrict(
      item.location.province.code,
      item.location.district.code
    );

    if (currentProvince.code === -1 || currentDistrict.code === -1) {
      throw Error('Không thể format Field!! Đây là lỗi phía server');
    }

    return {
      field,
      province: currentProvince as any,
      district: currentDistrict as any,
    } as IFieldBroker;
  });
}

export default formatFieldsResponse;
