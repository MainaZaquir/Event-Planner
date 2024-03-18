import React from 'react';
import UserStory from './UserStory';

const UserStoryPage = () => {
  // Mock user stories data
  const userStories = [
    {
      id: 21,
      description: 'Sarah is a small business owner planning a grand opening event for her new store. She needs an event planner to handle invitations, decorations, and coordinating with vendors.',
      benefit: 'Event Planner allows Sarah to focus on preparing her store for the grand opening while ensuring that the event attracts customers and creates a memorable experience.',
      username: 'sarah_smallbiz',
    },
    {
      id: 22,
      description: 'David is a high school teacher organizing a graduation ceremony for his students. He requires an event planner to assist with venue booking, seating arrangements, and audiovisual setup.',
      benefit: 'With Event Planner, David can ensure that the graduation ceremony runs smoothly and provides a memorable experience for students and their families.',
      username: 'david_teacher',
    },
    // Add more user stories here
  ];

  return (
    <>
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {userStories.map((userStory) => (
          <UserStory key={userStory.id} userStory={userStory} />
        ))}
      </div>
    </div> <br /> <br />
    </>
  );
};

export default UserStoryPage;
