import LightBox from '@/src/components/atoms/LightBox'
import { getHome } from '@/src/lib/sanity'


export default async function Test() {
  const homePage = await getHome();
  console.log(homePage);
  console.log(homePage?.image.file);
    return (
        <div>
            <LightBox file={homePage.image.file} caption={homePage.image.caption}/>
        </div>
    );
};
