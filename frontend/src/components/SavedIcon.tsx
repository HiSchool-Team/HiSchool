import React from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons/lib';
import { Tooltip } from 'antd';

type SavedIconProps = {
  isSaved: boolean,
  onSave: () => void,
  onUnsave: () => void,
};
export const SavedIcon: React.FC<SavedIconProps> = ({ isSaved, onSave, onUnsave }) => {
  console.log(`rendering SavedIcon with saved set to ${isSaved}`);

  return isSaved
    ? <Tooltip title={'click to unsave'}><StarFilled onClick={e => onUnsave()}/></Tooltip>
    : <Tooltip title={'click to save'}><StarOutlined onClick={e => onSave()}/></Tooltip>;
};
