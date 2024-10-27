// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import { MoreHorizontal } from 'lucide-react';
// import Tag from '@/components/tag';

// interface TagContainerProps {
//   tags: string[];
// }

// const TagContainer: React.FC<TagContainerProps> = ({ tags }) => {
//   const [showAll, setShowAll] = useState(false);
//   const [visibleTags, setVisibleTags] = useState<string[]>([]);
//   const [hiddenCount, setHiddenCount] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const measureRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const calculateVisibleTags = () => {
//       const containerWidth = containerRef.current?.offsetWidth ?? 0;
//       const moreButtonWidth = 80;
//       let availableWidth = containerWidth - moreButtonWidth;
//       let visibleCount = 0;
//       let currentWidth = 0;

//       if (showAll || !containerRef.current || !measureRef.current) {
//         setVisibleTags(tags);
//         setHiddenCount(0);
//         return;
//       }

//       const measureDiv = measureRef.current;
//       measureDiv.style.visibility = 'hidden';
//       measureDiv.style.position = 'absolute';
//       measureDiv.innerHTML = '';

//       // 使用你的原始Tag样式进行测量
//       for (let i = 0; i < tags.length; i++) {
//         const tagSpan = document.createElement('span');
//         tagSpan.className = 'bg-[#18181880] flex-shrink-0 text-gray-400 text-xs font-medium px-2.5 py-0.5 rounded border border-[#1f1f1f] mr-1';
//         tagSpan.textContent = `# ${tags[i]}`;
//         measureDiv.appendChild(tagSpan);

//         const tagWidth = tagSpan.offsetWidth + 4; // 4px for margin

//         if (currentWidth + tagWidth <= availableWidth) {
//           currentWidth += tagWidth;
//           visibleCount++;
//         } else {
//           break;
//         }
//       }

//       visibleCount = Math.max(1, visibleCount);
//       const newVisibleTags = tags.slice(0, visibleCount);
//       const newHiddenCount = tags.length - visibleCount;

//       setVisibleTags(newVisibleTags);
//       setHiddenCount(newHiddenCount);
//     };

//     calculateVisibleTags();

//     const resizeObserver = new ResizeObserver(() => {
//       calculateVisibleTags();
//     });

//     if (containerRef.current) {
//       resizeObserver.observe(containerRef.current);
//     }

//     return () => {
//       resizeObserver.disconnect();
//     };
//   }, [tags, showAll]);

//   return (
//     <div className="relative w-full" ref={containerRef}>
//       <div ref={measureRef} className="absolute top-0 left-0 opacity-0 pointer-events-none" />

//       <div className="flex flex-wrap items-center space-x-1">
//         {(showAll ? tags : visibleTags).map((tag, index) => (
//           <Tag key={index} text={tag} />
//         ))}

//         {hiddenCount > 0 && !showAll && (
//           <button
//             onClick={() => setShowAll(true)}
//             className="flex-shrink-0 text-gray-400 text-xs hover:text-gray-300 flex items-center gap-0.5"
//           >
//             <MoreHorizontal className="w-3 h-3" />
//             <span>
//               +{hiddenCount}
//             </span>
//           </button>
//         )}

//         {showAll && hiddenCount > 0 && (
//           <button
//             onClick={() => setShowAll(false)}
//             className="flex-shrink-0 text-gray-400 text-xs hover:text-gray-300"
//           >
//             收起
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TagContainer;
