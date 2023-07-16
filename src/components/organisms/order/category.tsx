import { PropsWithoutRef } from 'react';
import { CategoryType } from '@/types/store/order';
import { ID } from '@/types';

type Props = {
  items: Array<CategoryType>;
  currentId?: ID;
};

export default function Category({ items, currentId }: PropsWithoutRef<Props>) {
  const categories = items.map((v, parentIndex) => (
    <div key={parentIndex}>
      <p className='menu-label'>{v.label}</p>
      <ul className='menu-list'>
        {v.children.map((child, index) => (
          <li key={index}>
            <a className={child.id === currentId ? 'is-active' : ''}>
              {child.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ));

  return <aside className='menu'>{categories}</aside>;
}
