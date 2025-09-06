import { Routes, Route } from 'react-router';
import AdminLayout from '@/modules/admin/layouts/admin-layout';
import Overview from '@/modules/admin/views/over-view';
import ViewsLayout from '@/modules/admin/layouts/views-layout';
import BlogsLayout from '@/modules/admin/layouts/blogs-layout';
import SettingLayout from '@/modules/admin/layouts/setting-layout';
import SettingView from '@/modules/admin/views/setting-view';
import BlogsView from '@/modules/admin/views/Blogs';
import AddBlogView from "@/modules/admin/views/AddBlogView";
const AdminPage = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route
          path="/"
          element={
            <ViewsLayout>
              <Overview />
            </ViewsLayout>
          }
        />
        <Route
          path="/add-blog"
          element={
            <BlogsLayout>
              <AddBlogView />
            </BlogsLayout>
          }
        />
        <Route
          path="/blogs"
          element={
            <BlogsLayout>
              <BlogsView />
            </BlogsLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <SettingLayout>
              <SettingView />
            </SettingLayout>
          }
        />
        <Route
          path="/goals"
          element={
            <SettingLayout>
              <SettingView />
            </SettingLayout>
          }
        />

        <Route
          path="/calendar"
          element={
            <BlogsLayout>
              <BlogsView />
            </BlogsLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <BlogsLayout>
              <BlogsView />
            </BlogsLayout>
          }
        />
      </Route>
    </Routes>
  );
};

export default AdminPage;
