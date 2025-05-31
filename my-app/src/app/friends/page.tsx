import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper";
import { getAbout, getFriends } from "@/src/lib/sanity";
import Link from "next/link";
import style from "@/src/components/page.module.css";
import { PortableText } from "next-sanity";
import Footer from "@/src/components/footer";


export default async function About() {
   const aboutData = await getAbout();
   const friendsData = await getFriends(); 
    
    // getHome returns an array, so we need to get the first item

    // Filter friends by status - updating case to match actual data
    const teamMembers = friendsData.filter(friend => friend.status === "Team");
    const boardMembers = friendsData.filter(friend => friend.status === "Board");
    const ironFriends = friendsData.filter(friend => friend.status === "Iron");
    const sulfurFriends = friendsData.filter(friend => friend.status === "Sulfur");
    const salineFriends = friendsData.filter(friend => friend.status === "Saline");

  return (
    <>
    
    <TwoColumnsWrapper padFirst padSecond>
      <dl className={style.container}>
        <dt>Contact</dt>
          <dd>
            <PortableText 
                    value={aboutData?.contact}
                    components={{
                      block: {
                        // Use your CSS module for paragraphs
                       normal: ({ children }) => <p>{children}</p>}}} />
            </dd>
        <dt>About</dt>
            <dd>
             <PortableText 
                    value={aboutData?.about}
                    components={{
                      block: {
                        // Use your CSS module for paragraphs
                       normal: ({ children }) => <p>{children}</p>}}} />
            </dd>
      </dl>
      <dl className={style.container}>
        <dt>Team & Collaborators</dt>
          <dd>
            <ul>
              {teamMembers.map((member, index) => (
                <li key={member._id || index}>
                  {member.slug ? (
                    <Link href={`/friends/${member.slug.current}`}>
                      <i className={style.friend}>{member.name}</i>{member.subtitle && `, ${member.subtitle}`}
                    </Link>
                  ) : (<>
                    <i>{member.name}</i>{member.subtitle && `, ${member.subtitle}`}
                  </>)}
                </li>
              ))}
            </ul>
          </dd>
        <dt>Board</dt>
          <dd>
            <ul>
              {boardMembers.map((member, index) => (
                <li key={member._id || index}>
                  <i>{member.name}</i>{member.subtitle && `, ${member.subtitle}`}
                </li>
              ))}
            </ul>
          </dd>
        <dt>2025 FRIENDS</dt>
          <dd>
            <div>
              Sulfur: {sulfurFriends.map((friend, index) => (
                  <span key={friend._id || index}>
                    {friend.name}
                    {index < sulfurFriends.length - 1 ? ', ' : ''}
                  </span>
                ))}
            </div>
            <div>
              Iron: {ironFriends.map((friend, index) => (
                  <span key={friend._id || index}>
                    {friend.name}
                    {index < ironFriends.length - 1 ? ', ' : ''}
                  </span>
                ))}
            </div>
            <div>
              Saline: {salineFriends.map((friend, index) => (
                  <span key={friend._id || index}>
                    {friend.name}
                    {index < salineFriends.length - 1 ? ', ' : ''}
                  </span>
                ))}
            </div>
          </dd>
        </dl>
    </TwoColumnsWrapper>
    <Footer />
    </>)}
    

