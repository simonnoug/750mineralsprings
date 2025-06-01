'use client'

import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper";
import Link from "next/link";
import style from "@/src/components/page.module.css";
import { PortableText } from "next-sanity";
import Footer from "@/src/components/footer";
import { useEffect } from "react";
import { useMobileNav } from "@/src/contexts/MobileNavContext";
import { About, Friend } from "@/src/types"; // You might need to create or adjust these types

interface FriendsClientProps {
  aboutData: About;
  friendsData: Friend[];
}

export default function FriendsClient({ aboutData, friendsData }: FriendsClientProps) {
  // Filter friends by status
  const teamMembers = friendsData.filter(friend => friend.status === "Team");
  const boardMembers = friendsData.filter(friend => friend.status === "Board");
  const ironFriends = friendsData.filter(friend => friend.status === "Iron");
  const sulfurFriends = friendsData.filter(friend => friend.status === "Sulfur");
  const salineFriends = friendsData.filter(friend => friend.status === "Saline");

  const { setMobileLeftExtras, setMobileMiddleExtras } = useMobileNav();

  useEffect(() => {
    setMobileLeftExtras(
      null
    );
    setMobileMiddleExtras(
      null
    );
    return () => {
      setMobileLeftExtras(null);
      setMobileMiddleExtras(null);
    };
  }, [setMobileLeftExtras, setMobileMiddleExtras]);

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
                  normal: ({ children }) => <p>{children}</p>
                }
              }} 
            />
          </dd>
          <dt>About</dt>
          <dd>
            <PortableText 
              value={aboutData?.about}
              components={{
                block: {
                  normal: ({ children }) => <p>{children}</p>
                }
              }} 
            />
          </dd>
        </dl>
        <dl className={style.container}>
          {/* ... rest of your existing JSX ... */}
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
    </>
  );
}
