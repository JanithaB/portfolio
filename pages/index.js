// image
import Image from 'next/image'

// components
import ParticlesContainer from '../components/ParticlesContainer'
import ProjectBtn from '../components/ProjectsBtn'
import Avatar from '../components/Avatar'

// framer motion
import { motion } from 'framer-motion'

// variants
import { fadeIn } from '../variants'
import { HiArrowDown } from 'react-icons/hi2'

const Home = () => {
  return (
    <div className='h-full bg-primary/68'> 
      <div className='w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10'>
        <div className='container flex flex-col justify-center h-full mx-auto text-center xl:pt-20 xl:text-left'>
          {/* title */}
          <motion.h1
            variants={fadeIn('down', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h1' style={{ fontSize: '3em' }}>Hello, I&apos;m Janitha Rathnayake<br/>{' '}
            <span className='text-accent' style={{ fontSize: '0.8em' }}> Electrical & Electronics Engineer</span>
          {/* <span className='text-accent'> Electrical & Electronics Engineer</span> */}
          </motion.h1>
          {/* subtitile */}
          <motion.p
            variants={fadeIn('down', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-sm mx-auto mb-10 xl:max-w-xl xl:mx-0 xl:mb-16'
          >
            I am a problem solver by nature and enjoy working in a fast-paced, dynamic environment. I am always eager to learn new technologies and stay up-to-date with industry trends to bring the best solutions to clients.
          </motion.p>
          {/* btn */}
          <div className='relative flex justify-center xl:hidden'>
            <ProjectBtn />
          </div>
          <motion.div 
            variants={fadeIn('down', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden xl:flex'
          >
            <ProjectBtn />
          </motion.div>
        </div>
      </div>
      {/* image */}
      <div className='w-[1200px] h-full absolute right-0 bottom-0'>
        <div className='absolute w-full h-full bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat mix-blend-color-dodge translate-z-0'></div>
        {/* practicles */}
        <ParticlesContainer />
        {/* avatar */}
        <motion.div
          variants={fadeIn('up', 0.5)}
          initial='hidden'
          animate='show'
          exit='hidden'
          transition={{duration: 1, ease: 'easeInOut '}}
          className='w-full h-full max-w-[600px] max-h-[600px] absolute -bottom-32 lg:bottom-0 lg:right-[8%]'
        >
          <Avatar />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
