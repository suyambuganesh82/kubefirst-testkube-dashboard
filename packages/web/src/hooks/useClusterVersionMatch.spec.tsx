import {renderHook} from '@testing-library/react';

import {PluginScopeMockProvider} from '@testkube/plugins/test';

import useClusterVersionMatch from './useClusterVersionMatch';

describe('useClusterVersionMatch', () => {
  const createWrapper =
    (version: string | undefined) =>
    ({children}: {children: any}) =>
      (
        <PluginScopeMockProvider data={{useClusterDetails: (fn: any) => fn({version})}}>
          {children}
        </PluginScopeMockProvider>
      );

  it('should return true if the cluster version matches the required version', () => {
    const requiredVersion = 'v1.2.3';
    const clusterVersion = 'v1.2.3';

    const {result} = renderHook(() => useClusterVersionMatch(requiredVersion), {
      wrapper: createWrapper(clusterVersion),
    });

    expect(result.current).toBe(true);
  });

  it('should return false if the cluster version does not match the required version', () => {
    const requiredVersion = 'v1.20.0';

    const {result} = renderHook(() => useClusterVersionMatch(requiredVersion), {wrapper: createWrapper('v1.2.3')});

    expect(result.current).toBe(false);
  });

  it('should return false if the cluster version does not match the required version', () => {
    const requiredVersion = 'v1.20.0';

    const {result} = renderHook(() => useClusterVersionMatch(requiredVersion, true), {
      wrapper: createWrapper(undefined),
    });

    expect(result.current).toBe(true);
  });
});
