import React from 'react';

import { BaseBlock } from './blocks/BaseBlock/BaseBlock';

interface Props {
  schema: BaseBlock;
}

export const RenderBlock: React.FC<Props> = ({ schema }) => {
  return (
    <schema.Component {...schema.metadata}>
      {schema.items.map((item, index) => (
        <RenderBlock schema={item} key={item.identifier + index} />
      ))}
    </schema.Component>
  );
};

