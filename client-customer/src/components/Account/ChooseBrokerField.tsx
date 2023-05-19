import Tippy from '@tippyjs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { CiSquareRemove } from 'react-icons/ci';
import { IFieldBroker } from '../../types/broker.types';
import { IDistrict, IProvince } from '../../types/nhaDat.types';
import SelectDistrict from '../Brokers/SelectDistrict';
import SelectProvince from '../Brokers/SelectProvince';
import SelectTypeNhadat from '../Brokers/SelectTypeNhadat';

interface ITypeNhaDat {
  label: string;
  value: string;
}

interface Props {
  field: IFieldBroker;
  index: number;
  setFields: React.Dispatch<React.SetStateAction<IFieldBroker[]>>;
}

const ChooseBrokerField = ({ field, index, setFields }: Props) => {
  const [typeNhaDat, setTypeNhaDat] = useState<ITypeNhaDat>(field.field);
  const [province, setProvince] = useState<IProvince>(field.province);
  const [district, setDistrict] = useState<IDistrict>(field.district);

  //   Xóa 1 field
  const handleRemoveField = useCallback(() => {
    setFields((fields) => {
      const newFields = [...fields];
      newFields.splice(index, 1);
      return newFields;
    });
  }, [setFields, index]);

  //   nếu chọn thông tin thì sẽ update state của comp cha
  useEffect(() => {
    setFields((fields) => {
      const newFields = [...fields];

      newFields[index].field = typeNhaDat;
      newFields[index].province = province;
      newFields[index].district = district;

      return newFields;
    });
  }, [typeNhaDat, province, district, setFields, index]);

  return (
    <div className="flex gap-3 items-center flex-col md:flex-row mb-4 pb-2">
      <div className="min-w-fit font-medium flex items-center gap-1">
        <span>Lĩnh vực {index + 1}</span>
        <Tippy content="Xóa" animation="fade">
          <button
            onClick={handleRemoveField}
            className="text-red-500 text-xl md:text-16"
          >
            <CiSquareRemove />
          </button>
        </Tippy>
      </div>

      {/* choose Field */}
      <div className="flex-1 w-full">
        <SelectTypeNhadat
          typeNhaDat={typeNhaDat}
          setTypeNhaDat={setTypeNhaDat}
        />
      </div>

      <div className="flex-1 w-full">
        {/* province */}
        <SelectProvince
          province={province}
          setProvince={setProvince}
          setDistrict={setDistrict}
        />
      </div>

      <div className="flex-1 w-full">
        {/* district */}
        <SelectDistrict
          district={district}
          setDistrict={setDistrict}
          districtList={province.districts as any}
        />
      </div>
    </div>
  );
};

export default React.memo(ChooseBrokerField);
