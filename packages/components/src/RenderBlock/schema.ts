

import { BlockFragment } from './blocks/BlockFragment';
import { Padding } from './blocks/Padding';
import { Title } from './blocks/Title';

export const defaultTemplate = new BlockFragment({
  items: [
    new Padding({
      metadata: {
        right: 32,
        left: 32,
        bottom: 24
      },
      items: [
        new Title({
          accessor: 'firstNameTitle',
          metadata: {
            theme: 'h1',
            color: 'gray'
          }
        }),
        new Title({
          accessor: 'firstName',
          metadata: {
            theme: 'h1'
          }
        })
      ]
    }),
    new Padding({
      metadata: {
        right: 32,
        left: 32,
        bottom: 24
      },
      items: [
        new Title({
          accessor: 'lastNameTitle',
          metadata: {
            theme: 'h2',
            color: 'gray'
          }
        }),
        new Title({
          accessor: 'lastName',
          metadata: {
            theme: 'h2'
          }
        })
      ]
    }),
    new Padding({
      metadata: {
        right: 32,
        left: 32,
        bottom: 24
      },
      items: [
        new Title({
          accessor: 'ageTitle',
          metadata: {
            theme: 'h2',
            color: 'gray'
          }
        }),
        new Title({
          accessor: 'age',
          metadata: {
            color: 'red',
            theme: 'h2',
          }
        })
      ]
    })
  ]
});
