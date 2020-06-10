import React from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons/lib';

type SavedIconProps = {
  isSaved: boolean,
  onSave: () => void,
  onUnsave: () => void,
};
export const SavedIcon: React.FC<SavedIconProps> = ({ isSaved, onSave, onUnsave }) => {
  console.log(`rendering SavedIcon with saved set to ${isSaved}`);

  return isSaved
    ? <StarFilled style={{ fontSize: '1.9vw' }} onClick={e => onUnsave()}/>
    : <StarOutlined style={{ fontSize: '1.9vw' }} onClick={e => onSave()}/>;
};
