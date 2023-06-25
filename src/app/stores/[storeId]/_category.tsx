import { PropsWithoutRef } from 'react';

type CategoryItemType = {
  id: number;
  label: string;
};

type CategoryType = {
  genre: string;
  children: Array<CategoryItemType>;
};

type Props = {
  items: Array<CategoryType>;
  currentId: number;
};

export default function Category({ items, currentId }: PropsWithoutRef<Props>) {
  const categories = items.map((v, parentIndex) => (
    <div key={parentIndex}>
      <p className='menu-label'>{v.genre}</p>
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
