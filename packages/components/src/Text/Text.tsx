import React from 'react';
import cn from 'classnames';

import colors from './Text.colors.module.scss';
import themes from './Text.themes.module.scss';

export type TextThemes = keyof typeof themes;
export type TextColors = keyof typeof colors;

interface Props {
  className?: string;
  theme?: keyof typeof themes;
  color?: keyof typeof colors;
}

export const Text: React.FC<Props> = ({
  className,
  theme = 'h1',
  color,
  children
}) => (
  <span
    className={cn(
      themes[theme],
      color && colors[color],
      className
    )}
  >
    {children}
  </span>
);
