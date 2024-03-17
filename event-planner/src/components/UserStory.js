import React from 'react';

const UserStory = ({ userStory }) => {
  const { image, description, benefit, username } = userStory;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
      <img className="w-full h-56 object-cover" src={image} alt="User Story" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Description</div>
        <p className="text-gray-800 text-base">{description}</p>
        <div className="font-bold text-xl mt-4 mb-2">Benefit of Event Planner</div>
        <p className="text-gray-800 text-base">{benefit}</p>
        <div className="font-bold text-xl mt-4 mb-2">Username</div>
        <p className="text-gray-800 text-base">{username}</p>
      </div>
    </div>
  );
};

const UserStoryPage = () => {
  // Mock user stories data
  const userStories = [
    {
      id: 21,
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      description: 'Sarah is a small business owner planning a grand opening event for her new store. She needs an event planner to handle invitations, decorations, and coordinating with vendors.',
      benefit: 'Event Planner allows Sarah to focus on preparing her store for the grand opening while ensuring that the event attracts customers and creates a memorable experience.',
      username: 'sarah_smallbiz',
    },
    {
      id: 22,
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
      description: 'David is a high school teacher organizing a graduation ceremony for his students. He requires an event planner to assist with venue booking, seating arrangements, and audiovisual setup.',
      benefit: 'With Event Planner, David can ensure that the graduation ceremony runs smoothly and provides a memorable experience for students and their families.',
      username: 'david_teacher',
    },
    {
      id: 23,
      image: 'https://randomuser.me/api/portraits/women/5.jpg',
      description: 'Emily is hosting a themed birthday party for her daughter and wants everything to be perfect. She needs an event planner to handle decorations, entertainment, and party favors.',
      benefit: 'Event Planner allows Emily to enjoy her daughter\'s birthday party without worrying about the details, ensuring that it is a magical and stress-free experience for everyone.',
      username: 'emily_birthday',
    },
    {
      id: 24,
      image: 'https://randomuser.me/api/portraits/men/5.jpg',
      description: 'Daniel is planning a surprise anniversary celebration for his parents. He needs an event planner to organize the venue, catering, and entertainment.',
      benefit: 'Event Planner helps Daniel create a memorable anniversary celebration for his parents, filled with special touches and unforgettable moments.',
      username: 'daniel_anniversary',
    },
    {
      id: 25,
      image: 'https://randomuser.me/api/portraits/women/6.jpg',
      description: 'Sophia is a professional event organizer who wants to streamline her workflow and improve client satisfaction. She decides to use an event planner to manage multiple events simultaneously.',
      benefit: 'Event Planner enhances Sophia\'s productivity and organization, allowing her to deliver exceptional results for her clients and grow her event planning business.',
      username: 'sophia_eventpro',
    },
    {
      id: 26,
      image: 'https://randomuser.me/api/portraits/men/6.jpg',
      description: 'Jack is a college student organizing a charity concert to raise funds for a local cause. He requires an event planner to handle ticket sales, artist bookings, and logistics.',
      benefit: 'Event Planner empowers Jack to execute a successful charity concert, maximizing fundraising efforts and making a positive impact on the community.',
      username: 'jack_student',
    },
    {
      id: 27,
      image: 'https://randomuser.me/api/portraits/women/7.jpg',
      description: 'Olivia is a travel enthusiast planning a destination wedding in a tropical paradise. She needs an event planner to coordinate travel arrangements, accommodations, and activities for guests.',
      benefit: 'With Event Planner, Olivia can turn her dream destination wedding into reality, ensuring that every detail is taken care of and her guests have an unforgettable experience.',
      username: 'olivia_wanderlust',
    },
    {
      id: 28,
      image: 'https://randomuser.me/api/portraits/men/7.jpg',
      description: 'William is a conference organizer tasked with planning a large-scale industry event. He requires an event planner to manage venue logistics, exhibitor coordination, and attendee registration.',
      benefit: 'Event Planner enables William to execute a successful conference, impressing attendees and sponsors with seamless organization and professional execution.',
      username: 'william_conference',
    },
    {
      id: 29,
      image: 'https://randomuser.me/api/portraits/women/8.jpg',
      description: 'Amanda is a busy working mom planning a family reunion for her extended relatives. She needs an event planner to handle venue selection, meal planning, and coordinating activities for all ages.',
      benefit: 'Event Planner relieves Amanda of the stress of organizing a family reunion, allowing her to focus on spending quality time with her loved ones and creating lasting memories.',
      username: 'amanda_family',
    },
    {
      id: 30,
      image: 'https://randomuser.me/api/portraits/men/8.jpg',
      description: 'James is a sports coach organizing an end-of-season banquet for his team. He requires an event planner to arrange catering, awards presentations, and team photo sessions.',
      benefit: 'With Event Planner, James can host a memorable banquet to celebrate his team\'s achievements, fostering camaraderie and motivation for future seasons.',
      username: 'james_coach',
    },
    // Add more user stories here
  ];
  


  return (
    <div className="container mx-auto mt-8"><br /><br />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {userStories.map((userStory) => (
          <>
          <UserStory key={userStory.id} userStory={userStory} />
          </>
          
        ))}
      </div>
    </div>
  );
};

export default UserStoryPage;
