import { getAbout, getFriends } from "@/src/lib/sanity";
import FriendsClient from "./FriendsClient";

export default async function FriendsPage() {
  const aboutData = await getAbout();
  const friendsData = await getFriends(); 
  
  return <FriendsClient aboutData={aboutData} friendsData={friendsData} />;
}


