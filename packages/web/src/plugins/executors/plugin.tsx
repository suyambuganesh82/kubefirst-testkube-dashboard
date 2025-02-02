import {useEffect} from 'react';

import {StoreProvider, createPlugin, external} from '@testkube/plugins';

import {ReactComponent as ExecutorsIcon} from '@assets/executor.svg';

import ExecutorDetails from '@pages/Executors/ExecutorDetails';
import ExecutorsList from '@pages/Executors/ExecutorsList/ExecutorsList';

import type ClusterStatusPlugin from '@plugins/cluster-status/plugin';
import type GeneralPlugin from '@plugins/general/plugin';
import type RtkPlugin from '@plugins/rtk/plugin';

import {executorsApi, useGetExecutorsQuery} from '@services/executors';

import {
  initializeExecutorsStore,
  useExecutors,
  useExecutorsField,
  useExecutorsPick,
  useExecutorsSync,
} from '@store/executors';

import {safeRefetch} from '@utils/fetchUtils';
import {PollingIntervals} from '@utils/numbers';

const generalStub = external<typeof GeneralPlugin>();
const clusterStatusStub = external<typeof ClusterStatusPlugin>();
const rtkStub = external<typeof RtkPlugin>();

export default createPlugin('dashboard/executors')
  .needs(clusterStatusStub.data('useSystemAccess', 'SystemAccess'))
  .needs(generalStub.slots('siderItems'))
  .needs(generalStub.data('useApiEndpoint'))
  .needs(rtkStub.slots('rtkServices'))

  .route('/executors', <ExecutorsList />)
  .route('/executors/:id', <ExecutorDetails />)
  .route('/executors/:id/settings/:settingsTab', <ExecutorDetails />)

  .provider(({useData}) => (
    <StoreProvider store={initializeExecutorsStore} dependencies={[useData.select(x => x.useApiEndpoint)()]} />
  ))
  .data({useExecutors, useExecutorsPick, useExecutorsField, useExecutorsSync})

  .provider(({useData}) => {
    const {useApiEndpoint, useSystemAccess, SystemAccess} = useData.pick(
      'useApiEndpoint',
      'useSystemAccess',
      'SystemAccess'
    );
    const {data: executors, refetch} = useGetExecutorsQuery(null, {
      pollingInterval: PollingIntervals.long,
      skip: !useSystemAccess(SystemAccess.agent),
    });
    useExecutorsSync({executors});
    useEffect(() => {
      safeRefetch(refetch);
    }, [useApiEndpoint()]);
  })

  .init(tk => {
    tk.slots.rtkServices.add(executorsApi);
    tk.slots.siderItems.add({path: '/executors', icon: ExecutorsIcon, title: 'Executors'}, {order: -80});
  });
