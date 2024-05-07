import React, { useState } from "react";

// icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  // FaWordpress,
  FaFigma,
  FaLaravel,
  FaNodeJs,
  // FaPython,
  FaFlask,
  FaVuejs,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
} from "react-icons/si";


//  data
const aboutData = [
  {
    title: 'skills',
    info: [
      // {
      //   title: 'Web Development',
      //   icons: [
      //     <FaHtml5 key="html5" />,
      //     <FaCss3 key="css3" />,
      //     <FaJs key="js" />,
      //   ],
      // },
      // {
      //   title: 'Frameworks',
      //   icons: [
      //     <FaReact key="react" />,
      //     <SiNextdotjs key="next" />,
      //     <SiFramer key="framer" />,
      //     <FaLaravel key="laravel" />,
      //     <FaNodeJs key="nodejs" />,
      //     <FaFlask key="python" />,
      //     <FaVuejs key="vuejs" />
      //   ],
      // },
      // {
      //   title: 'UI/UX Design',
      //   icons: [<FaFigma key="figma"/> ],
      // },
    ],
  },
  {
    title: 'Certificates',
    info: [
      // {
      //   title: 'Certificate in Software Engineering - NIBM',
      //   stage: '2022',
      // },
      // {
      //   title: 'Certificate of Android Developer -FSD Codie',
      //   stage: '2023',
      // },
     
      {
        title: '',
        stage: '',
      }
    ],
  },
  {
    title: 'experience',
    info: [
      {
        title: 'Engineering Trainee - Sri Lanka Design & Innovation Lab',
        stage: '2023 Aug - Oct',
      },
      {
        title: 'Engineering Trainee - Sri Lanka Telecom PLC OPMC ',
        stage: '2022 May - 2022 Aug ',
      }
    ],
  },
  {
    title: 'credentials',
    info: [
      // {
      //   title: 'Bsc (Hons) Computing (undergraduate) - Coventry University',
      //   stage: '2023 - 2025',
      // },
      // {
      //   title: 'HND in SE - National Institute of Business Management',
      //   stage: '2022 - 2023',
      // },
      {
        title: 'B.SC in Electrical & Electronics Engineering',
        stage: '2019 - 2024',
      },
      {
        title: 'A/L - Physical Sciences - Maliyadeva College Kurunegala',
        stage: '2015 - 2017',
      }
     
    ],
  },
];

// Components
import Avatar from '../../components/Avatar';
import Circles from '../../components/Circles';

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import CountUp from "react-countup";

const About = () => {
  const [ index, setIndex ] = useState(0);
  console.log(index);
  return <div className="h-full py-32 text-center bg-primary/30 xl:text-left">
    <Circles />
    {/* avatrImg */}
    <motion.div
      variants={fadeIn('right', 0.2)}
      initial="hidden"
      animate="show"
      exit='hidden'
      class="hidden xl:flex absolute bottom-0 -right-[80px]"
      style={{ width: '500px', height: '500px' }}
    >
      <Avatar />
    </motion.div>
    <div className="container flex flex-col items-center h-full mx-auto xl:flex-row gap-x-6">
      {/* text */}
      <div className="flex flex-col justify-center flex-1">
        <motion.h2
          variants={fadeIn('right', 0.2)}
          initial="hidden"
          animate="show"
          exit='hidden'
          className="h2"
        >About <span className="text-accent">Me.</span>
        </motion.h2>
        <motion.p
          variants={fadeIn('right', 0.4)}
          initial="hidden"
          animate="show"
          exit='hidden'
          className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0"
        >Electrical and Electronic Engineering Undergraduate, University of Peradeniya</motion.p>
        {/* counters */}
        <motion.div
          variants={fadeIn('right', 0.6)}
          initial="hidden"
          animate="show"
          exit='hidden'
          className="hidden mx-auto mb-10 md:flex md:max-w-none xl:mx-0"
        >
          <div className="flex flex-1 xl:gap-x-6">
            {/* experience */}
            <div className="relative flex-0 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
              <div className="mb-2 text-2xl font-extrabold xl:text-4xl text-accent">
                <CountUp start={2} end={6} duration={10} /> +
              </div>
              <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">Experience (In Months)</div>
            </div>
            {/* project */}
            <div className="relative flex-0 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
              <div className="mb-2 text-2xl font-extrabold xl:text-4xl text-accent">
                <CountUp start={3} end={5} duration={10} /> +
              </div>
              <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[140px]">Project Conribution</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* info */}
      <motion.div
        variants={fadeIn('left', 0.4)}
        initial="hidden"
        animate="show"
        exit='hidden'
        className="flex flex-col w-full xl:max-w-[48%] h-[480px]"
      >
        <div className="flex mx-auto mb-4 gap-x-4 xl:gap-x-8 xl:mx-0">
        {aboutData.map((item, itemIndex) => (
          <div
            key={itemIndex}  // Add this line to provide a unique key
            className={`${
              index === itemIndex % aboutData.length &&
              'text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300'
            } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
            onClick={() => {
              setIndex(itemIndex);
            }}
          >
            {item.title}
          </div>
        ))}
        </div>
        <div className="flex flex-col items-center py-2 xl:py-6 gap-y-2 xl:gap-y-4 xl:items-start">
          {aboutData[index].info.map((item, itemIndex) => {
            return (
              <div
                key={itemIndex}
                className="flex flex-col items-center flex-1 md:flex-row max-w-max gap-x-2 text-white/60"
                >
                {/* title */}
                <div className="mb-2 font-light md:mb-0">{item.title}</div>
                <div className="hidden md:flex">-</div>
                <div>{item.stage}</div>
                <div className="flex gap-x-4">
                  {/* icons */}
                  {item.icons?.map((icon, itemIndex) => {
                    return (
                      <div key={itemIndex} className="text-2xl text-white">
                        {icon}
                      </div>
                    );
                  })}
              </div>
              </div>
            );
          })}
        </div>
      </motion.div>
      
    </div>
  </div>
};

export default About;
