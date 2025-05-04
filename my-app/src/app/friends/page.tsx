import TwoColumnsWrapper from "@/src/components/layouts/TwoColumnsWrapper";
import { getAbout, getFriends } from "@/src/lib/sanity";

export default async function About() {
   const aboutData = await getAbout();
   const friendsData = await getFriends(); 
    
    // getHome returns an array, so we need to get the first item
    const homePage = aboutData[0];

    // Filter friends by status - updating case to match actual data
    const teamMembers = friendsData.filter(friend => friend.status === "Team");
    const boardMembers = friendsData.filter(friend => friend.status === "Board");
    const ironFriends = friendsData.filter(friend => friend.status === "Iron");
    const sulfurFriends = friendsData.filter(friend => friend.status === "Sulfur");
    const salineFriends = friendsData.filter(friend => friend.status === "Saline");

  return (
    <TwoColumnsWrapper padFirst padSecond>
      <div>
        <div>
          <h1>CONTACT</h1>
          <p>Email: friends@750mineralsprings.gr</p>
          <p>Instagram: 750mineralsprings.gr</p>
        </div>
        <div>
          ABOUT <br /> {homePage.about}
        </div>
      </div>
      <div>
          <div>
          TEAM & COLLABORATORS
          <ul>
            {teamMembers.map((member, index) => (
              <li key={member._id || index}>
                {member.name} {member.subtitle && `, ${member.subtitle}`}
              </li>
            ))}
          </ul>
        </div>
        <div>
          BOARD
          <ul>
            {boardMembers.map((member, index) => (
              <li key={member._id || index}>
                {member.name} {member.subtitle && `, ${member.subtitle}`}
              </li>
            ))}
          </ul>
        </div>
        <div>
          2025 FRIENDS
          <div>
            Sulfur:
              {sulfurFriends.map((friend, index) => (
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
        </div>
      </div>
    </TwoColumnsWrapper>
  )
}

