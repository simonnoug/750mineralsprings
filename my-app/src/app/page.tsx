import { getHome } from '@/src/lib/sanity';
import Image from 'next/image';
import { urlForImage } from '@/src/lib/sanityImageUrl';

export default async function Home() {
  const homeData = await getHome();
  
  // getHome returns an array, so we need to get the first item
  const homePage = homeData[0];
  
  console.log('homeData:', homePage); // For debugging
  
  return (
    <main>
      {homePage?.image?.file && (
        <div style={{ 
          position: 'relative', 
          width: '50%', 
          height: '50vh',
          margin: '0 auto' 
        }}>
          <Image 
            src={urlForImage(homePage.image.file).url()}
            alt={homePage.image.caption || 'Home image'}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}
    </main>
  );
}

