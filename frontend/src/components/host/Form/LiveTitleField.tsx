import { Controller, useFormContext } from 'react-hook-form';
import { Bold, CharCount, FormCell, Input, Label, Required } from './style';
import { FormValues } from '@type/hostInfo';

export default function LiveTitleField() {
  const { control } = useFormContext<FormValues>();

  return (
    <FormCell>
      <Label>
        방송 제목<Required>*</Required>
      </Label>
      <Controller
        name="liveTitle"
        control={control}
        render={({ field }) => (
          <>
            <Input {...field} type="text" placeholder="방송 제목을 입력해주세요." maxLength={100} />
            <CharCount>
              <Bold>{field.value?.length || 0}</Bold>/100
            </CharCount>
          </>
        )}
      />
    </FormCell>
  );
}
