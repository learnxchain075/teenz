export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Breadcrumb Skeleton */}
          <div className="flex gap-2 mb-8">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Skeleton */}
            <div>
              <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-2xl mb-4"></div>
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square w-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-6">
              <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded"></div>
                ))}
              </div>
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 flex-1 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                <div className="h-12 flex-1 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Reviews Skeleton */}
          <div className="mb-16">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white dark:bg-card rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products Skeleton */}
          <div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white dark:bg-card rounded-xl overflow-hidden">
                  <div className="aspect-square bg-gray-200 dark:bg-gray-800"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}