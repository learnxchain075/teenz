export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Search Bar Skeleton */}
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg mb-8"></div>
          
          <div className="flex gap-8">
            {/* Sidebar Skeleton */}
            <div className="hidden lg:block w-64 bg-white dark:bg-card rounded-xl p-6">
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-4"></div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Grid Skeleton */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white dark:bg-card rounded-xl overflow-hidden">
                    <div className="aspect-square bg-gray-200 dark:bg-gray-800"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}