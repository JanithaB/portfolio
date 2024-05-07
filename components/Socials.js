import Link from "next/link";

import { RiFacebookLine, RiGithubLine, RiLinkedinLine, RiWhatsappLine} from 'react-icons/ri'

const Socials = () => {
  return <div className="flex items-center text-lg gap-x-5">
    <Link href={'https://www.facebook.com/janithab1'} className="transition-all duration-300 hover:text-accent"><RiFacebookLine /></Link>
    <Link href={'https://github.com/JanithaB'} className="transition-all duration-300 hover:text-accent"><RiGithubLine /></Link>
    <Link href={'https://www.linkedin.com/in/jb-rathnayake/'} className="transition-all duration-300 hover:text-accent"><RiLinkedinLine /></Link>
    <Link href={'https://wa.link/hwh3vs'} className="transition-all duration-300 hover:text-accent"><RiWhatsappLine /></Link>
  </div>;
};

export default Socials;
