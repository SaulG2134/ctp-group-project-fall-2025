// import React, { useRef, useState, useEffect } from 'react';
// import { motion, useInView } from 'framer-motion';

// const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { amount: 0.5, once: false });
  
//   return (
//     <motion.div
//       ref={ref}
//       data-index={index}
//       onMouseEnter={onMouseEnter}
//       onClick={onClick}
//       initial={{ scale: 0.7, opacity: 0 }}
//       animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
//       transition={{ duration: 0.2, delay }}
//       className="mb-4 cursor-pointer"
//     >
//       {children}
//     </motion.div>
//   );
// };

// const AnimatedList = ({
//   items = [],
//   onItemSelect,
//   completedIds = new Set(),
//   showGradients = true,
//   enableArrowNavigation = true,
//   displayScrollbar = true,
//   initialSelectedIndex = -1
// }) => {
//   const listRef = useRef(null);
//   const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
//   const [keyboardNav, setKeyboardNav] = useState(false);
//   const [topGradientOpacity, setTopGradientOpacity] = useState(0);
//   const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

//   const handleScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     setTopGradientOpacity(Math.min(scrollTop / 50, 1));
//     const bottomDistance = scrollHeight - (scrollTop + clientHeight);
//     setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
//   };

//   useEffect(() => {
//     if (!enableArrowNavigation) return;
    
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
//         e.preventDefault();
//         setKeyboardNav(true);
//         setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
//       } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
//         e.preventDefault();
//         setKeyboardNav(true);
//         setSelectedIndex(prev => Math.max(prev - 1, 0));
//       } else if (e.key === 'Enter') {
//         if (selectedIndex >= 0 && selectedIndex < items.length) {
//           e.preventDefault();
//           if (onItemSelect) {
//             onItemSelect(items[selectedIndex], selectedIndex);
//           }
//         }
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

//   useEffect(() => {
//     if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    
//     const container = listRef.current;
//     const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`);
    
//     if (selectedItem) {
//       const extraMargin = 50;
//       const containerScrollTop = container.scrollTop;
//       const containerHeight = container.clientHeight;
//       const itemTop = selectedItem.offsetTop;
//       const itemBottom = itemTop + selectedItem.offsetHeight;
      
//       if (itemTop < containerScrollTop + extraMargin) {
//         container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
//       } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
//         container.scrollTo({
//           top: itemBottom - containerHeight + extraMargin,
//           behavior: 'smooth'
//         });
//       }
//     }
//     setKeyboardNav(false);
//   }, [selectedIndex, keyboardNav]);

//   return (
//     <div className="relative w-full">
//       <div
//         ref={listRef}
//         className={`max-h-[400px] overflow-y-auto p-4 ${
//           displayScrollbar
//             ? '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-amber-200 [&::-webkit-scrollbar-thumb]:bg-amber-700 [&::-webkit-scrollbar-thumb]:rounded'
//             : ''
//         }`}
//         onScroll={handleScroll}
//       >
//         {items.map((item, index) => (
//           <AnimatedItem
//             key={index}
//             delay={0.05 * index}
//             index={index}
//             onMouseEnter={() => setSelectedIndex(index)}
//             onClick={() => {
//               setSelectedIndex(index);
//               if (onItemSelect) {
//                 onItemSelect(item, index);
//               }
//             }}
//           >
//             <div className={`p-4 rounded-lg border-2 transition-all ${
//               completedIds.has(item.id)
//                 ? 'bg-green-100 border-green-600'
//                 : 'bg-amber-100 border-amber-800'
//             } ${selectedIndex === index ? 'ring-2 ring-amber-500' : ''}`}>
//               <div className="flex items-center gap-3">
//                 <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
//                   completedIds.has(item.id)
//                     ? 'bg-green-600 border-green-700'
//                     : 'bg-white border-amber-400'
//                 }`}>
//                   {completedIds.has(item.id) && (
//                     <span className="text-white text-sm font-bold">✓</span>
//                   )}
//                 </div>
//                 <p className="text-amber-900 m-0 flex-1">{item.name}</p>
//               </div>
//             </div>
//           </AnimatedItem>
//         ))}
//       </div>
//       {showGradients && (
//         <>
//           <div
//             className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-amber-50 to-transparent pointer-events-none transition-opacity duration-300"
//             style={{ opacity: topGradientOpacity }}
//           />
//           <div
//             className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-50 to-transparent pointer-events-none transition-opacity duration-300"
//             style={{ opacity: bottomGradientOpacity }}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default AnimatedList;