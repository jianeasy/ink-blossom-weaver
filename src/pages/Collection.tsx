import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookmarkCheck, Home, Loader2, ArrowLeft } from "lucide-react";
import { getCollectImageListApi, cancelCollectImageApi } from "@/request/api";
import { toast } from "sonner";

interface CollectionItem {
  uuid: string;
  url: string;
  prompt: string;
  createDate: string;
}

const Collection = () => {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const fetchCollections = async (currentPage = page) => {
    setLoading(true);
    try {
      const response = await getCollectImageListApi({
        page: currentPage,
        pageSize,
        toolName: "ai-chinese-image-generate",
      });

      if (response.data) {
        const newList = response.data.list.map((item) => {
          return {
            ...JSON.parse(JSON.parse(item.setting).setting),
            uuid: item.uuid,
          };
        });
        console.log("newList", newList);

        setCollections(newList || []);
        setTotalPages(Math.ceil((response.data.total || 0) / pageSize));
      } else {
        toast.error("获取收藏列表失败");
      }
    } catch (error) {
      console.error("获取收藏列表失败:", error);
      toast.error("获取收藏列表失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [page]);

  const handleCancelCollect = async (uuid: string) => {
    try {
      await cancelCollectImageApi({ uuid });
      toast.success("已取消收藏");
      fetchCollections(); // 刷新列表
    } catch (error) {
      console.error("取消收藏失败:", error);
      toast.error("取消收藏失败，请重试");
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="min-h-screen pb-16">
      <header className="text-center py-8 border-b border-chinese-red/30 relative animate-ink-flow">
        <h1 className="text-4xl md:text-5xl font-heading text-chinese-red">
          收藏作品
        </h1>
      </header>

      <main className="container px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            asChild
            className="border-chinese-brown text-chinese-black hover:bg-chinese-brown/10"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回创作页
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-chinese-red" />
          </div>
        ) : collections.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {collections.map((item) => (
                <Card
                  key={item.uuid}
                  className="border-chinese-brown/30 overflow-hidden"
                >
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg truncate text-chinese-black">
                      {new Date(item.createDate).toLocaleDateString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="aspect-square overflow-hidden rounded-md mb-3 bg-chinese-white/60">
                      <img
                        src={item.url}
                        alt="收藏的国画作品"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-xs text-chinese-black/70 line-clamp-2">
                      {item.prompt}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="outline"
                      className="w-full border-chinese-brown text-chinese-black hover:bg-chinese-brown/10"
                      onClick={() => handleCancelCollect(item.uuid)}
                    >
                      <BookmarkCheck className="mr-2 h-4 w-4" />
                      取消收藏
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="my-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(page - 1)}
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-2">
                      第 {page} 页 / 共 {totalPages} 页
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(page + 1)}
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <div className="text-center py-12 animate-ink-flow">
            <BookmarkCheck className="mx-auto h-16 w-16 text-chinese-black/30" />
            <p className="mt-4 text-xl text-chinese-black/70">暂无收藏作品</p>
            <Button className="chinese-button mt-6" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                回到创作页面
              </Link>
            </Button>
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-chinese-black/60 text-sm border-t border-chinese-red/30">
        <p>基于 AI 技术的国画生成器</p>
      </footer>
    </div>
  );
};

export default Collection;
