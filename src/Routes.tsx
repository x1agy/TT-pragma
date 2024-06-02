import { Suspense } from 'react';
import { Button } from 'antd';
import { createBrowserRouter, Link, Outlet } from 'react-router-dom';

import { AppHeader } from '@/components';
import { LoginPage, LogoutPage, TasksPage } from '@/pages';

const SuspenseLayout = () => (
  <Suspense fallback={<div></div>}>
    <AppHeader />
    <Outlet />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    Component: SuspenseLayout,
    path: '/',
    errorElement: (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
      >
        Ooops! We are sorry for that <br />
        <Button>
          <Link to="/">go back</Link>
        </Button>
      </div>
    ),

    children: [
      {
        index: true,
        Component: LoginPage,
      },
      {
        path: 'tasks',
        Component: TasksPage,
      },
      {
        path: 'logout',
        Component: LogoutPage,
      },
    ],
  },
]);
