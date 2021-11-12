// Global
import dynamic from 'next/dynamic';

const mockDynamic = (Component: () => JSX.Element): void => {
  // Mock out the SvgIcon dynamic import
  jest.mock('next/dynamic');

  beforeAll(() => {
    (dynamic as jest.Mock).mockImplementation(() => Component);
  });
};

export default mockDynamic;
