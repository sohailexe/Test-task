import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { PostsAPI } from "@/apis/postsApi";
import { useState, useEffect } from "react";

const TopAuthorsSection = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTopAuthors = async () => {
    setLoading(true);
    try {
      const response = await PostsAPI.getTopAuthors();
      if (response.success) {
        setAuthors(response.data);
      }
    } catch (error) {
      console.error("Error fetching top authors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopAuthors();
  }, []);

  return (
    <div className="">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">Top Authors</h1>
        <Button variant="outline" onClick={fetchTopAuthors} disabled={loading}>
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-medium">Name</th>
              <th className="p-3 text-left font-medium">Posts</th>
              <th className="p-3 text-left font-medium">Author ID</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.authorId} className="border-b hover:bg-gray-50">
                <td className="p-3">{author.name}</td>
                <td className="p-3">{author.postCount}</td>
                <td className="p-3 text-sm text-gray-500">{author.authorId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopAuthorsSection;
