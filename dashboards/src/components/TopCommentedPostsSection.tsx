import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { PostsAPI } from "@/apis/postsApi";

const TopCommentedPostsSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTopCommentedPosts = async () => {
    setLoading(true);
    try {
      const response = await PostsAPI.getTopCommentedPosts();
      if (response.success) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error fetching top commented posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopCommentedPosts();
  }, []);

  return (
    <div className="">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">Top Commented Posts</h1>
        <Button
          variant="outline"
          onClick={fetchTopCommentedPosts}
          disabled={loading}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Card
            key={post._id}
            className="flex-row items-center justify-between gap-4 p-4"
          >
            <CardContent className="flex-1 p-0">
              <CardTitle className="text-sm font-medium">
                {post.title}
              </CardTitle>
              <p className="text-sm text-gray-500">by {post.authorName}</p>
            </CardContent>
            <CardFooter className="p-0 justify-end flex">
              <span className="text-sm">
                {post.commentCount}{" "}
                {post.commentCount === 1 ? "comment" : "comments"}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopCommentedPostsSection;
