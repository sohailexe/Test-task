import TopCommentedPostsSection from "@/components/TopCommentedPostsSection";
import PostStatsChart from "@/components/PostStatsChart";
import OverviewWelcomeSection from "../sections/over-view-sections/overview-welcome-section";
import TopAuthorsSection from "../sections/over-view-sections/TopAuthorsSection";

const Overview = () => {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Welcome Section - Full Width */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <OverviewWelcomeSection />
            </div>
          </div>

          {/* Post Stats Chart */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Post Activity
              </h2>
              <PostStatsChart />
            </div>
          </div>

          {/* Top Commented Posts */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Top Commented Posts
              </h2>
              <TopCommentedPostsSection />
            </div>
          </div>

          {/* Top Authors Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Top Authors
              </h2>
              <TopAuthorsSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
