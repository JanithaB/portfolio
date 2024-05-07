import Image from "next/image";

const Avatar = () => {
  return <div className="hidden xl:flex xl:max-w-none">
    <Image src={'/avatar.png'} width={900} height={900} alt="" className="w-full h-full translate-z-0"/>
  </div>;
};

export default Avatar;
