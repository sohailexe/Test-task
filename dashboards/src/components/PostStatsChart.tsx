"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { PostsAPI } from "@/apis/postsApi";

const chartConfig = {
  postsCreated: {
    label: "Posts Created",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const PostStatsChart = () => {
  const [postStats, setPostStats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPostStats = async () => {
    setLoading(true);
    try {
      const response = await PostsAPI.getPostStatsLast7Days();
      if (response.success) {
        // Format dates to show only day and month (e.g., "Sep 06")
        const formattedData = response.data.map((item) => ({
          ...item,
          date: new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          }),
        }));
        setPostStats(formattedData);
      }
    } catch (error) {
      console.error("Error fetching post stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostStats();
  }, []);

  // Calculate average posts
  const averagePosts =
    postStats.length > 0
      ? Math.round(
          postStats.reduce((sum, item) => sum + item.postsCreated, 0) /
            postStats.length
        )
      : 0;

  return (
    <div className="rounded-lg p-6 shadow-sm border">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Post Activity (Last 7 Days)
          </h2>
          <p className="text-sm">Daily post creation statistics</p>
        </div>
        <Button variant="outline" onClick={fetchPostStats} disabled={loading}>
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart
          accessibilityLayer
          data={postStats}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            className="opacity-30"
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            className="text-sm"
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            className="text-sm"
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => [
                  `${value} posts`,
                  chartConfig[name]?.label,
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />
            }
          />
          <Bar
            dataKey="postsCreated"
            fill="var(--chart-1)"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ChartContainer>

      <div className="mt-4">
        <div className="text-center p-3 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{averagePosts}</div>
          <div className="text-sm">Average Posts per Day</div>
        </div>
      </div>
    </div>
  );
};

export default PostStatsChart;
