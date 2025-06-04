import { getHome } from '@/src/lib/sanity';
import ImageWithCaption from '../components/atoms/ImageWithCaption';

export default async function Home() {
  const homePage = await getHome();
  
  // getHome returns an array, so we need to get the first item
  
  
  return (
    <main>
      {homePage?.image?.file && (
        <div style={{ 
          position: 'relative', 
          width: '70%',
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

