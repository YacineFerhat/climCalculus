import * as React from 'react';
import { MenuDashboard } from '../menuDash';

interface Props {
  readonly children?: any;
}

export const DashboardContainer: React.FunctionComponent<Props> = (
  props: Props
) => {
  const { children } = props;
  return (
    <main className="relative  rounded-2xl bg-gray-100">
      <div className="flex items-start justify-between">
        <MenuDashboard />
        <div className="flex w-full flex-col ml-4 pl-0 md:space-y-4 ">
          <div className="h-screen overflow-auto mt-4 ">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};
