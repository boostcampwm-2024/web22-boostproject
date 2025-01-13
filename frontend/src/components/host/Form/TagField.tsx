import { Controller, useFormContext } from 'react-hook-form';
import { FormValues } from '@type/hostInfo';
import {
  Button,
  Flex,
  FormCell,
  Input,
  Label,
  RemoveButton,
  TagChipContainer,
  TagContainer,
  UploadText
} from './style';
import { KeyboardEvent } from 'react';

export default function TagField() {
  const { control, setValue, getValues } = useFormContext<FormValues>();

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      onAddTag();
    }
  };

  const onAddTag = () => {
    const currentTag = getValues('tag').trim();
    if (currentTag) {
      const currentTags = getValues('tags');
      setValue('tags', [...currentTags, currentTag]);
      setValue('tag', '');
    }
  };

  const onRemoveTag = (indexToRemove: number) => {
    const currentTags = getValues('tags');
    setValue(
      'tags',
      currentTags.filter((_: string, index: number) => index !== indexToRemove)
    );
  };

  return (
    <FormCell>
      <Label>태그</Label>
      <Flex>
        <Controller
          name="tag"
          control={control}
          render={({ field }) => <Input {...field} type="text" placeholder="태그 추가하기" onKeyDown={onKeyDown} />}
        />
        <Button type="button" onClick={onAddTag}>
          추가
        </Button>
      </Flex>
      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <>{field.value.length > 0 && <TagList tags={field.value} onRemoveTag={onRemoveTag} />}</>
        )}
      />
      <UploadText>공백 및 특수 문자 없이 15자까지 입력할 수 있습니다.</UploadText>
    </FormCell>
  );
}

const TagChip = ({ tag, onRemove }: { tag: string; onRemove: () => void }) => (
  <TagChipContainer>
    {tag}
    <RemoveButton onClick={onRemove}>×</RemoveButton>
  </TagChipContainer>
);

const TagList = ({ tags, onRemoveTag }: { tags: string[]; onRemoveTag: (index: number) => void }) => (
  <TagContainer>
    {tags.map((tag, index) => (
      <TagChip key={tag + index} tag={tag} onRemove={() => onRemoveTag(index)} />
    ))}
  </TagContainer>
);
