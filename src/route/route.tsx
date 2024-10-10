import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "../layout/Root";
import { analysisRoute, dashboardRoute, rootRoute } from "../utils/constants";
import NotFound from "../components/NotFound";
import Auth from "../pages/Auth";
import ProtectedRoute from "../layout/ProtectedRoute";
import DashboardPage from "../pages/Dashboard";
import Analysis from "../components/dashboard/analysis/Analysis";
import AddEventForm from "../components/dashboard/event/AddEventForm";
import RedirectToDashboard from "../layout/RedirectToDashboard";
import EventList from "../components/dashboard/analysis/EventList";
import AnalysisLayout from "../layout/AnalysisLayout";
import EventDetail from "../components/dashboard/analysis/EventDetail";
import EventAnalysis from "../components/dashboard/analysis/EventAnalysis";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={rootRoute} element={<Root />} errorElement={<NotFound />}>
      <Route
        index
        element={
          <RedirectToDashboard>
            <Auth />
          </RedirectToDashboard>
        }
      />
      <Route
        path={dashboardRoute}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<AddEventForm />} />
        <Route path={analysisRoute} element={<AnalysisLayout />}>
          <Route index element={<Analysis />} />
          <Route path="events" element={<EventList />} />
          <Route path="event/details/:id" element={<EventDetail/>} />
          <Route path="event/analysis" element={<EventAnalysis/>} />

        </Route>
      </Route>
    </Route>
  )
);

export default router;
