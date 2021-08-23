import React from 'react';
import { Data } from '../../../DataProvider';
import { Identifier } from '../../Identifier.enum';

type KeysMatching<T, V> = {
  [K in keyof T]?: T[K] extends V ? K : never;
}[keyof T];

export abstract class BaseBlock<T = {}, A = unknown> {
  public abstract readonly identifier: Identifier;
  public metadata?: T;
  public accessor?: KeysMatching<Data, A | undefined>;
  public items: BaseBlock[] = [];

  constructor({
    items = [],
    metadata,
    accessor
  }: {
    accessor?: KeysMatching<Data, A | undefined>;
    items?: BaseBlock[];
    metadata?: T;
  }) {
    this.items = items;
    this.metadata = metadata;
    this.accessor = accessor;
  }

  public abstract Component: React.FC<T>;
}
