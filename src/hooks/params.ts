import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useQueryParams<T extends string | number>(key: string) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const queryParam = current.get(key);

  function setQueryParam(value?: T) {
    if (value === undefined) {
      current.delete(key);
    } else {
      current.set(key, value.toString());
    }
    const query = current ? current : '';
    router.push(`${pathname}?${query}`);
  }

  return [queryParam, setQueryParam] as const;
}
