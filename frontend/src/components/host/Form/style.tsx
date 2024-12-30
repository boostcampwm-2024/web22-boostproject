import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  gap: 20px;

  input {
    flex: 1;
  }
`;

export const FormCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #525662;
  margin-bottom: 8px;
`;

export const Required = styled.em`
  color: #e63a3e;
  margin-left: 4px;
`;

export const CharCount = styled.span`
  font-size: 12px;
  color: #9da5b6;
  margin-top: 4px;
  align-self: flex-end;
`;

export const Bold = styled.span`
  font-weight: bold;
  color: #000;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: #4e41db;
  }
`;

export const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

export const FileInputLabel = styled.label`
  cursor: pointer;
  width: 100%;
`;

export const FileInput = styled.input`
  display: none;
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 4px;
  border: 1px solid #dddddd;
`;

export const PlaceholderImage = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed #dddddd;
  border-radius: 4px;
  background-color: #f5f6f8;
`;

export const UploadIcon = styled.svg`
  width: 24px;
  height: 24px;
  margin-bottom: 8px;
`;

export const UploadText = styled.span`
  font-family: 'NanumGothic', sans-serif;
  font-size: 12px;
  color: #9da5b6;
`;

export const Button = styled.button`
  padding: 12px;
  background-color: rgba(78, 65, 219, 0.1);
  color: rgba(78, 65, 219, 0.8);
  border: none;
  border-radius: 7px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: rgba(78, 65, 219, 0.2);
  }
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TagChipContainer = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background-color: #f3f4f6;
  border-radius: 9999px;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
  }
`;

export const RemoveButton = styled.button`
  margin-left: 8px;
  color: #6b7280;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.2s ease;
  background: none;
  border: none;
  padding: 0 4px;
  line-height: 1;

  &:hover {
    color: #374151;
  }

  &:focus {
    outline: none;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const ImageActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const ImageButton = styled.button`
  flex: 1;
  padding: 8px;
  background-color: #f3f4f6;
  border: none;
  border-radius: 4px;
  color: #4e41db;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
  }
`;
