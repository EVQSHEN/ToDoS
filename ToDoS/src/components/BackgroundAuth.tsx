import React from 'react';
import Image from 'next/image';
import image_d from '../../public/dark.webp';
import image_l from '../../public/light.webp';

const BackgroundAuth = () => {
  return (
    <div>
      <Image
        src={image_d}
        alt="bg"
        fill
        style={{ objectFit: 'cover' }}
        priority
        className="w-1/2 dark:block"
      />
      <Image
        src={image_l}
        alt="bg"
        fill
        style={{ objectFit: 'cover' }}
        priority
        className="w-1/2 dark:hidden"
      />
    </div>
  );
};

export default BackgroundAuth;
