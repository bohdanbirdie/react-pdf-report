import React from 'react';
import { useDataValue } from '../../../DataProvider';
import { TextColors, TextThemes } from '../../../Text/Text';
import { Identifier } from '../../Identifier.enum';
import { Text } from '../../../Text';

import { BaseBlock } from '../BaseBlock';

interface Metadata {
  theme?: TextThemes;
  color?: TextColors;
}

export class Title extends BaseBlock<Metadata, string | number> {
  identifier = Identifier.Title;

  Component: React.FC<Metadata> = ({ theme, color }) => {
    const value = useDataValue(this.accessor);

    if (value === undefined) {
      return null;
    }

    return (
      <Text theme={theme} color={color}>
        {value}
      </Text>
    );
  };
}
