import React, { useMemo } from 'react';
import { Identifier } from '../../Identifier.enum';

import { BaseBlock } from '../BaseBlock';

interface Metadata {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}
export class Padding extends BaseBlock<Metadata> {
  identifier = Identifier.Padding;

  Component: React.FC<Metadata> = ({ children, left, right, top, bottom }) => {
    const style = useMemo(
      () => ({
        paddingLeft: left,
        paddingRight: right,
        paddingBottom: bottom,
        paddingTop: top
      }),
      [left, right, top, bottom]
    );

    return <div style={style}>{children}</div>;
  };
}
