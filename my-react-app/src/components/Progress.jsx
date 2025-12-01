import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as d3 from 'd3';
import boxImage from '../assets/box.png';

import Map from '../assets/TreasureMap.png';
const courses = [
  { id: 'CS_111', name: 'CS 111- Intro To Algorithmic Problem Solving', type: 'cs' },
  { id: 'CS_211', name: 'CS 211- Object-Oriented-Programming (C++)',  type: 'cs' },
  { id: 'CS_220', name: 'CS 220- Discrete', type: 'cs' },
  {id :'CS_320',name:'CS 320-Theory of Comp',type:'cs'},
  { id: 'CS_212', name: 'CS 212- Object-Oriented-Programming (JAVA)', type: 'cs' },
  { id: 'CS_313', name: 'CS 313- Data Structures',  type: 'cs' },
  { id: 'CS_323', name: 'CS 323- Theory of Computation',  type: 'cs' },
  { id: 'CS_343', name: 'CS 343- Computer Networks',  type: 'cs' },
  { id: 'CS_370', name: 'CS 370- Operating Systems',  type: 'cs' },
  { id: 'CS_316', name: 'CS 316- Database Systems',  type: 'cs' },
  { id: 'CS_340', name: 'CS 340- Software Engineering',  type: 'cs' },
  {id:'CS_240',name:'CS 240-Comp org and assembly language',type:'cs'},
  {id: 'CS_331', name:'CS 331- DataBase Systems', type:'cs'},
  

  { id: 'MATH_122', name: 'MATH 122- Precalculus',  type: 'math' },
  { id: 'MATH_141', name: 'MATH 141- Calculus 1', type: 'math' },
  {id: 'MATH_151', name: 'MATH 151- Calculus 1',  type: 'math' },
  {id: 'MATH_152', name: 'MATH 152- Calculus 2',  type: 'math' },
  {id:'MATH_142', name:'MATH 142- Calculus 2', type:'math'},
  {id:'MATH_143', name:'MATH 143- Calculus 3', type:'math'},
  {id:'MATH_241', name:'MATH 241- Prob & Stat', type:'math'},
  { id: 'MATH_120', name: 'MATH 120- Discrete Math',  type: 'math' },

];
const links= [
  { source: 'CS_111', target: 'CS_211' },
  { source: 'CS_111', target: 'CS_212' },
  { source: 'CS_111', target: 'CS_240' },
  
  { source: 'CS_211', target: 'CS_313' },
  { source: 'CS_212', target: 'CS_313' },
  { source: 'CS_220', target: 'CS_320' },
  { source: 'CS_313', target: 'CS_323' },
  { source: 'CS_313', target: 'CS_331' },
  { source: 'CS_313', target: 'CS_370' },
  
  { source: 'CS_313', target: 'CS_316' },
  { source: 'CS_320', target: 'CS_316' },
  { source: 'CS_240', target: 'CS_316' },
  
  { source: 'CS_313', target: 'CS_340' },
  { source: 'CS_240', target: 'CS_340' },
  
  { source: 'CS_240', target: 'CS_343' },
  { source: 'CS_320', target: 'CS_343' },
  
  { source: 'MATH_122', target: 'MATH_141' },
  { source: 'MATH_122', target: 'MATH_151' },
  { source: 'MATH_122', target: 'MATH_120' },
  { source: 'MATH_141', target: 'MATH_142' },
  { source: 'MATH_142', target: 'MATH_143' },
  { source: 'MATH_143', target: 'MATH_241' },
  { source: 'MATH_151', target: 'MATH_152' },
  { source: 'MATH_152', target: 'MATH_241' },
  { source: 'MATH_120', target: 'CS_211' },
  { source: 'MATH_120', target: 'CS_212' },
];
const simulation = d3.forceSimulation(courses)
  .force("link", d3.forceLink(links).id(d => d.id).distance(80))
  .force("charge", d3.forceManyBody().strength(-200))
  .force("collision", d3.forceCollide(50))
  .force("y", d3.forceY(d => {
    // CS Tree (left side)
    if(d.id === 'CS_111') return 100;  // Root
if(d.id === 'CS_211' || d.id === 'CS_212' || d.id === 'CS_220' || d.id === 'CS_240') return 200;  // Level 2
if(d.id === 'CS_313') return 300;  // Level 3
if(d.id === 'CS_320' || d.id === 'CS_323' || d.id === 'CS_331' || d.id === 'CS_370') return 400;  // Level 4
if(d.id === 'CS_343' || d.id === 'CS_316' || d.id === 'CS_340') return 500;  // Level 5
    // Math Tree (right side)
    if(d.id === 'MATH_122') return 100;  // Root
    if(d.id === 'MATH_141' || d.id === 'MATH_151' || d.id === 'MATH_120') return 200;  // Level 2
    if(d.id === 'MATH_142' || d.id === 'MATH_152') return 320;  // Level 3
    if(d.id === 'MATH_143') return 420;  // Level 4
    if(d.id === 'MATH_241') return 520;  // Level 5 (bottom)
    
    return 300;
  }).strength(1.0))
  .force("x", d3.forceX(d => {
    // CS Tree - Left side (centered around x=200)
    if(d.id === 'CS_111') return 200;
    if(d.id === 'CS_211') return 150;
    if(d.id === 'CS_212') return 200;
    if(d.id === 'CS_220') return 250;
    if(d.id === 'CS_313') return 200;
    if(d.id === 'CS_320') return 200;
    if(d.id === 'CS_316') return 120;
    if(d.id === 'CS_340') return 180;
    if(d.id === 'CS_323') return 220;
    if(d.id === 'CS_343') return 280;
    if(d.id === 'CS_240') return 100;
if(d.id === 'CS_331') return 260;
if(d.id === 'CS_370') return 140;
    // Math Tree - Right side (centered around x=450)
    if(d.id === 'MATH_122') return 450;
    if(d.id === 'MATH_120') return 380;
    if(d.id === 'MATH_141') return 480;
    if(d.id === 'MATH_151') return 420;
    if(d.id === 'MATH_142') return 500;
    if(d.id === 'MATH_152') return 420;
    if(d.id === 'MATH_143') return 500;
    if(d.id === 'MATH_241') return 460;
    
    return 300;
  }).strength(0.8))
  .stop();

for (let i = 0; i < 400; ++i) {
  simulation.tick();
}
const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="mb-4 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

const AnimatedList = ({
  items = [],
  onItemSelect,
  completedIds = new Set(),
  unlockedIds = new Set(),
  showGradients = true,
  displayScrollbar = true,
}) => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);
  

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };

  return (
    <div className="relative w-full">
      <div
        ref={listRef}
        className={`max-h-[400px] overflow-y-auto p-4 ${
          displayScrollbar
            ? '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-amber-200 [&::-webkit-scrollbar-thumb]:bg-amber-700 [&::-webkit-scrollbar-thumb]:rounded'
            : 'scrollbar-hide'
        }`}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.05 * index}
            index={index}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => {
              setSelectedIndex(index);
              if (onItemSelect) {
                onItemSelect(item, index);
              }
            }}
          >
            <div className={`p-4 rounded-lg border-2 transition-all ${
              completedIds.has(item.id)
                ? 'bg-green-100 border-green-600'
                : unlockedIds.has(item.id)
                ? 'bg-amber-50 border-amber-600'
                : 'bg-amber-100 border-amber-800'
            } ${selectedIndex === index ? 'ring-2 ring-amber-500' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  completedIds.has(item.id)
                    ? 'bg-green-600 border-green-700'
                    : 'bg-white border-amber-400'
                }`}>
                  {completedIds.has(item.id) && (
                    <span className="text-white text-sm font-bold">✓</span>
                  )}
                </div>
                <p className="text-amber-900 m-0 flex-1">{item.name}</p>
              </div>
            </div>
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-amber-50 to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: topGradientOpacity }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-50 to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: bottomGradientOpacity }}
          />
        </>
      )}
    </div>
  );
};

function Progress() {
  const [completedCourses, setCompletedCourses] = useState(new Set([]));
  const[unlockedCourses,setUnlockedCourses]=useState(new Set(['MATH_122','CS_111']))
  const [toggled,setToggled]=useState({MATH_122:true,CS_111:true});
  const check_220=(completed)=>{
  const hasCS111=completed.has('CS_111');
  const hasMATH120=completed.has('MATH_120');
  const hasCalculus=completed.has('MATH_141')||completed.has('MATH_151');
  return hasCS111&&hasMATH120&&hasCalculus;
  }

    const check_313=(completed)=>{
    const hasCS211=completed.has('CS_211');
    const hasCS212=completed.has('CS_212');
    const hasCS220=completed.has('CS_220');
    return hasCS211&&hasCS211&&hasCS220;
    }


  const toggleCourse = (courseId) => {
    if (!unlockedCourses.has(courseId)) {
      return;
    }

    // Helper to normalize link refs (they may be strings or objects after D3)
    const getId = (ref) => (typeof ref === 'string' ? ref : ref.id);

    setCompletedCourses(prev => {
      const newSet = new Set(prev);
      const isUnchecking = newSet.has(courseId);

      if (isUnchecking) {
        // Un-complete the course and remove downstream completions & unlocks
        newSet.delete(courseId);

        const removeDownstream = (id) => {
          links.forEach(link => {
            const sourceId = getId(link.source);
            const targetId = getId(link.target);
            if (sourceId === id) {
              // remove completed downstream course and recurse
              if (newSet.has(targetId)) {
                newSet.delete(targetId);
                removeDownstream(targetId);
              }
              // always remove the unlocked state for downstream course
              setUnlockedCourses(prevUnlocked => {
                const newUnlocked = new Set(prevUnlocked);
                newUnlocked.delete(targetId);
                return newUnlocked;
              });
            }
          });
        };

        removeDownstream(courseId);




        if (!check_220(newSet)) {
          setUnlockedCourses((prevUnlocked) => {
            const newUnlocked = new Set(prevUnlocked);
            newUnlocked.delete('CS_220');
            return newUnlocked;
          });
        }
      } else {
        // Complete the course and unlock downstream courses
        newSet.add(courseId);

        // Unlock direct downstream courses
        links.forEach(link => {
          const sourceId = getId(link.source);
          const targetId = getId(link.target);
          if (sourceId === courseId) {
            setUnlockedCourses(prevUnlocked => {
              const newUnlocked = new Set(prevUnlocked);
              newUnlocked.add(targetId);
              return newUnlocked;
            });
          }
        });

        // Special handling: unlock CS_220 if prerequisites are satisfied
        if (check_220(newSet)) {
          setUnlockedCourses(prevUnlocked => {
            const newUnlocked = new Set(prevUnlocked);
            newUnlocked.add('CS_220');
            return newUnlocked;
          });
        }

        // Special handling for mutual math alternatives: ensure the alternative is locked when one is chosen
        if (courseId === 'MATH_141') {
          setUnlockedCourses(prevUnlocked => {
            const newUnlocked = new Set(prevUnlocked);
            newUnlocked.delete('MATH_151');
            return newUnlocked;
          });
        } else if (courseId === 'MATH_151') {
          setUnlockedCourses(prevUnlocked => {
            const newUnlocked = new Set(prevUnlocked);
            newUnlocked.delete('MATH_141');
            return newUnlocked;
          });
        }
      }

      return newSet;
    });
  };
      // } else {
      //   newSet.add(courseId);
      //   links.forEach(link=>{
      //     if(link.source.id===courseId ){
      //       setUnlockedCourses((prevUnlocked)=>{
      //        const newUnlocked=new Set(prevUnlocked);
      //        newUnlocked.add(link.target.id);
      //        return newUnlocked;
           // });
         // }});
           
      

  const csCourses = courses.filter(c => c.type === 'cs');
  const mathCourses = courses.filter(c => c.type === 'math');
  
  // Format courses for AnimatedList with IDs
  const csItems = csCourses.map(c => ({ id: c.id, name: c.name }));
  const mathItems = mathCourses.map(c => ({ id: c.id, name: c.name }));

  return (
   <div className="min-h-screen bg-amber-50 p-8 font-press">
      <h1 className="text-4xl font-bold text-amber-900 mb-6">Course Progress Tracker</h1>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Map Section */}
        <div>
          <div className="relative border-4 border-amber-800 rounded-lg shadow-2xl overflow-hidden">
            <img src={Map} alt="Treasure Map" className="w-full" />
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {links.map((link, index) => {
               
                
                  return (
                    <line
                      key={index}
                      x1={link.source.x}
                      y1={link.source.y}
                      x2={link.target.x}
                      y2={link.target.y}
                      stroke="rgba(20, 18, 2, 0.7)"
                      strokeWidth="2"
                    />
                  );
                
              })}
            </svg>
       {courses.map(course => (
  <div
    key={course.id}
    onClick={() => unlockedCourses.has(course.id) && toggleCourse(course.id)}
    className={`absolute transform -translate-x-1/2 -translate-y-1/2 
      ${unlockedCourses.has(course.id) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
    style={{ left: `${course.x}px`, top: `${course.y}px` }}
    title={course.name}
  >
    <img
      src={boxImage}
      alt="course box"
      className={`transition-all shadow-lg
        ${!unlockedCourses.has(course.id) 
          ? 'opacity-40 grayscale'
          : completedCourses.has(course.id)
          ? 'brightness-125 saturate-150' 
          : 'hover:brightness-110'
        }`}
      style={{ width: '200px', height: '56px' }}
    />
    <div className={`absolute inset-0 flex items-center justify-center font-bold text-xs
      ${!unlockedCourses.has(course.id) 
        ? 'text-gray-600'
        : completedCourses.has(course.id)
        ? 'text-green-700' 
        : 'text-amber-900'
      }`}>
      {course.id.replace('_', ' ')}
    </div>
    {completedCourses.has(course.id) && (
      <div className="absolute top-0 right-0 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transform translate-x-1 -translate-y-1">
        ✓
      </div>
    )}
  </div>
))}
          </div>
        </div>

        {/* Course Lists with AnimatedList */}
        {/* Course Lists with AnimatedList */}
<div className="space-y-6">
<div>
  <div className="flex items-center justify-center mb-4">
    
    <h2 className="text-2xl font-bold text-amber-900 text-center">
      COMPUTER SCIENCE COURSES
    </h2>
  </div>

  <AnimatedList
            items={csItems}
            onItemSelect={(item, index) => toggleCourse(item.id)}
            completedIds={completedCourses}
            unlockedIds={unlockedCourses}
            showGradients={true}
            displayScrollbar={true}
          />
</div>

        <div>
          <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">
            MATH COURSES
          </h2>
          <AnimatedList
            items={mathItems}
            onItemSelect={(item, index) => toggleCourse(item.id)}
            completedIds={completedCourses}
            unlockedIds={unlockedCourses}
            showGradients={true}
            displayScrollbar={true}
          />
        </div>

        <div className="bg-amber-800 text-white p-4 rounded-lg text-center">
          <p className="text-xl font-bold">
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Progress;