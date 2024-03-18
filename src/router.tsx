import React from 'react'
import { createHashRouter, RouteObject, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import ErrorPage from './components/error-page'
import { getDefaultLayout } from './components/layout'
import HomePage from './pages/home'
import { AffiliateDashboard, Dashboard, LoginPage, StoreOnboarding, StorePreview } from './pages'
import Test from './pages/Test'
import SocketContextComponent from './contexts/SocketContextComponent'

export const routerObjects: RouteObject[] = [
  {
    path: '/',
    Component: HomePage,
  },
]

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login/*" element={<LoginPage />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/affiliate/*" element={<AffiliateDashboard />} />
      <Route path="/store-onboarding/*" element={<StoreOnboarding />} />
      <Route
        path="/store-preview/:id/*"
        element={
          <SocketContextComponent>
            <StorePreview />
          </SocketContextComponent>
        }
      />
      <Route path="/test" element={<Test />} />
    </>,
  ),
)

export function createRouter(): ReturnType<typeof createHashRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    const getLayout = router.Component?.getLayout || getDefaultLayout
    const Component = router.Component!
    const page = getLayout(<Component />)
    return {
      ...router,
      element: page,
      Component: null,
      ErrorBoundary: ErrorPage,
    }
  })
  return createHashRouter(routeWrappers)
}
