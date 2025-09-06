"use client";

import React, { useState } from "react";
import { usePostsStore } from "@/store/postStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";

const AddBlogView = () => {
  const { createPost, loading } = usePostsStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      await createPost({ title, content });
      setTitle("");
      setContent("");
      // optionally show a toast here

      navigate("/admin/blogs");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-lg shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Add Blog Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Write your content..."
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            onClick={handleCreatePost}
            disabled={loading.create}
            className="w-full"
          >
            {loading.create ? "Creating..." : "Create Post"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlogView;
