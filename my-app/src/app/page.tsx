import { getHome } from '@/src/lib/sanity';
import Image from 'next/image';
import { urlForImage } from '@/src/lib/sanityImageUrl';
import ImageWithCaption from '../components/atoms/ImageWithCaption';

export default async function Home() {
  const homePage = await getHome();
  
  // getHome returns an array, so we need to get the first item
  
  
  return (
    <main>
      {homePage?.image?.file && (
        <div style={{ 
          position: 'relative', 
          width: '50%', 
          height: '50vh',
          margin: '0 auto' 
        }}>
          <ImageWithCaption
            file={homePage.image.file}
            caption={homePage.image.caption}/>
        </div>
      )}
    </main>
  );
}

