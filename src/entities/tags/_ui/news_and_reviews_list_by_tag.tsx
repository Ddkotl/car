// "use client";

// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useInView } from "react-intersection-observer";

// export function NewsAndReviewsListByTag() {
//   const perPage = 20;
//   const { ref, inView } = useInView();

//   const {
//     data: tags,
//     isError,
//     isLoading,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["tags"],
//     queryFn: (pageParam) => getAllTagsWithPagination(pageParam.pageParam, perPage),
//     initialPageParam: 1,
//     getNextPageParam: (lastPage, allPage) => {
//       const nextPage = lastPage.length === perPage ? allPage.length + 1 : undefined;
//       return nextPage;
//     },
//   });
//   useEffect(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, fetchNextPage]);
//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }
//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr">
//         {Array.from({ length: perPage }).map((_, i) => (
//           <SkeletonTagCard key={i} />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className=" grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2 lg:gap-4 auto-rows-fr">
//       {tags?.pages.map((tags: TagsWithCounts[]) => {
//         return tags.map((tag, index) => {
//           if (tags.length == index + 1) {
//             return (
//               <div key={tag.id}>
//                 <TagCard
//                   tagSlug={tag.slug}
//                   tagTitle={tag.title}
//                   newsCount={tag._count.news}
//                   reviewsCount={tag._count.reviews}
//                   innerRef={ref}
//                 />
//               </div>
//             );
//           } else {
//             return (
//               <div key={tag.id}>
//                 <TagCard
//                   tagSlug={tag.slug}
//                   tagTitle={tag.title}
//                   newsCount={tag._count.news}
//                   reviewsCount={tag._count.reviews}
//                 />
//               </div>
//             );
//           }
//         });
//       })}
//       {isFetchingNextPage && Array.from({ length: perPage }).map((_, i) => <SkeletonTagCard key={i} />)}
//     </div>
//   );
// }
