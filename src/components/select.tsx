import { ChangeEventHandler } from 'react';

export type OptionType<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  textLabel: string;
  options: Array<OptionType<T>>;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  defaultValue: T;
};

export default function SelectComponent<
  T extends string | number | readonly string[] | undefined,
>({ textLabel, options, onChange, defaultValue }: Props<T>) {
  return (
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label'>{textLabel}</label>
      </div>
      <div className='field-body'>
        <div className='field is-narrow'>
          <div className='control'>
            <div className='select'>
              <select onChange={onChange} defaultValue={defaultValue}>
                {options.map((value, index) => (
                  <option key={index} value={value.value}>
                    {value.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
