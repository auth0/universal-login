import { renderHook } from '@testing-library/react-hooks';
import { useLogin } from '../../src/hooks/useScreens';

test('should return login screen values', () => {
  const { result } = renderHook(() => useLogin());
  expect(result.current).toHaveProperty('title');
  expect(result.current).toHaveProperty('identifier');
});
