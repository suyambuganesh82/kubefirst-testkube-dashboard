import {FC, ReactNode} from 'react';

import {TestWithExecution} from '@models/test';
import {TestSuiteWithExecution} from '@models/testSuite';

import {Item} from '@molecules/EntityGrid/EntityGridItemPure';

export type Entity = 'test-suites' | 'tests';

export type EntityListBlueprint = {
  pageTitle: string;

  pageTitleAddon?: ReactNode;

  pageDescription?: any;

  entity: Entity;

  emptyDataComponent: any;

  initialFiltersState: any;

  itemKey: string;

  // TODO: Fix types
  CardComponent: FC<{item: any; onClick: (item: Item) => void; onAbort: (item: Item) => void}>;

  /**
   * RTK action to set data fetched from Backend to the Redux store
   */

  setData?: any;

  /**
   * RTK action to set query filters to the Redux store
   */

  setQueryFilters?: any;

  addEntityButtonText?: string;

  dataTest?: string;

  queryFilters: any;
  data?: TestSuiteWithExecution[] | TestWithExecution[];

  isLoading: boolean;
  isFetching: boolean;

  onAdd: () => void;
  onItemClick: (item: any) => void;
  onItemAbort: (item: any) => void;
};
