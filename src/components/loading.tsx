import { COMPONENT_TEST_ID } from '@/constants/testid';

export default function Loading() {
  return (
    <>
      <div data-testid={COMPONENT_TEST_ID.LOADING}>
        <p>Loading</p>
      </div>
    </>
  );
}
