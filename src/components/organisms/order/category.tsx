import React, { PropsWithoutRef } from 'react';
import { CategoryType } from '@/types/store/order';
import { ID } from '@/types';

type Props = {
  items: Array<CategoryType>;
  id?: ID;
  onClickCategoryItem: (categoryId: ID) => () => Promise<void>;
};

function Category({ items, id, onClickCategoryItem }: PropsWithoutRef<Props>) {
  const categories = items.map((v, parentIndex) => (
    <div key={parentIndex}>
      <p className='menu-label'>{v.label}</p>
      <ul className='menu-list'>
        {v.children.map((child, index) => (
          <li key={index} onClick={onClickCategoryItem(child.id)}>
            <a
              className={
                child.id.toString() === id?.toString() ? 'is-active' : ''
              }
            >
              {child.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ));

  return <aside className='menu'>{categories}</aside>;
}

export default React.memo(Category);
