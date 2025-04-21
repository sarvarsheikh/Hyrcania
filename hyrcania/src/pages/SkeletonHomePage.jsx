import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonHomePage = () => {
    return (
        <div className="relative flex flex-col bg-white w-screen h-screen mt-20 ">

            {/* Heading Skeleton */}
            <div className="flex justify-end mr-2">
                <Skeleton className="h-24 sm:h-28 md:h-32 lg:h-40 xl:h-200 w-full rounded-xl mb-2" />
            </div>

            {/* Banner Image Skeleton */}
            <Skeleton className="h-40 sm:h-1/3 md:h-1/5 lg:h-1/3 xl:h-1/2 rounded-xl mx-2 mb-9" />

            {/* Discovery section header */}
            <div className="flex flex-row justify-end mr-2 mb-4">
                <Skeleton className="h-8 w-24 rounded-md" />
            </div>

            {/* Cards skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 px-2">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    );
};

// Skeleton for the ArabicCard component
const SkeletonCard = () => {
    return (
        <div className="flex-1 mb-4 sm:mb-0">
            <Skeleton className="h-80 w-full rounded-lg mb-2" />
            <div className="flex flex-col items-end">
                <Skeleton className="h-6 w-3/4 rounded-md mb-1" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
        </div>
    );
};

export default SkeletonHomePage;