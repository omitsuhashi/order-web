import { MouseEventHandler, PropsWithoutRef } from 'react';
import { CategoryType } from '@/types/store/order';
import { ID } from '@/types';
import useQueryParams from '@/hooks/params';

type Props = {
  items: Array<CategoryType>;
  currentId?: ID;
  keyName: string;
};

export default function Category({
  items,
  currentId,
  keyName,
}: PropsWithoutRef<Props>) {
  const [, setQueryParam] = useQueryParams(keyName);
  const onClickCategory =
    (categoryId: ID): MouseEventHandler<HTMLLIElement> | undefined =>
    () =>
      setQueryParam(categoryId);
  const categories = items.map((v, parentIndex) => (
    <div key={parentIndex}>
      <p className='menu-label'>{v.label}</p>
      <ul className='menu-list'>
        {v.children.map((child, index) => (
          <li key={index} onClick={onClickCategory(child.id)}>
            <a
              className={
                child.id.toString() === currentId?.toString() ? 'is-active' : ''
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
