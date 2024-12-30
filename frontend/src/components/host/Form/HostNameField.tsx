import { Controller, useFormContext } from 'react-hook-form';
import { FormCell, Input, Label, Required } from './style';
import { FormValues } from '@type/hostInfo';

export default function HostNameField() {
  const { control } = useFormContext<FormValues>();

  return (
    <FormCell>
      <Label>
        호스트 이름<Required>*</Required>
      </Label>
      <Controller
        name="hostName"
        control={control}
        render={({ field }) => (
          <Input {...field} type="text" placeholder="호스트 이름을 입력해 주세요." maxLength={100} />
        )}
      />
    </FormCell>
  );
}
