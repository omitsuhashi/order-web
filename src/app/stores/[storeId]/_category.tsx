import { PropsWithoutRef } from 'react';

type CategoryItemType = {
  isActive: boolean;
  label: string;
  action: () => void;
};

type CategoryType = {
  genre: string;
  children: Array<CategoryItemType>;
};

type Props = {
  items: Array<CategoryType>;
};

export default function Category({ items }: PropsWithoutRef<Props>) {
  const categories = items.map((v) => (
    <>
      <p className='menu-label'>{v.genre}</p>
      <ul className='menu-list'>
        {v.children.map((child, index) => (
          <li key={index}>
            <a
              className={child.isActive ? 'is-active' : ''}
              onClick={child.action}
            >
              {child.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  ));

  return (
    <aside className='menu'>
      <p className='menu-label'>General</p>
      <ul className='menu-list'>
        <li>
          <a>Dashboard</a>
        </li>
        <li>
          <a>Customers</a>
        </li>
      </ul>
      <p className='menu-label'>Administration</p>
      <ul className='menu-list'>
        <li>
          <a>Team Settings</a>
        </li>
        <li>
          <a className='is-active'>Manage Your Team</a>
          <ul>
            <li>
              <a>Members</a>
            </li>
            <li>
              <a>Plugins</a>
            </li>
            <li>
              <a>Add a member</a>
            </li>
          </ul>
        </li>
        <li>
          <a>Invitations</a>
        </li>
        <li>
          <a>Cloud Storage Environment Settings</a>
        </li>
        <li>
          <a>Authentication</a>
        </li>
      </ul>
      <p className='menu-label'>Transactions</p>
      <ul className='menu-list'>
        <li>
          <a>Payments</a>
        </li>
        <li>
          <a>Transfers</a>
        </li>
        <li>
          <a>Balance</a>
        </li>
      </ul>
      {categories}
    </aside>
  );
}
