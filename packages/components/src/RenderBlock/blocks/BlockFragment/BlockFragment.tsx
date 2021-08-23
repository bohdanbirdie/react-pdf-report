import React, { Fragment } from 'react';
import { Identifier } from '../../Identifier.enum';

import { BaseBlock } from '../BaseBlock';

export class BlockFragment extends BaseBlock {
  identifier = Identifier.BlockFragment;

  Component: React.FC = ({ children }) => {
    return <Fragment>{children}</Fragment>;
  };
}
