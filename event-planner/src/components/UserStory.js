import React from 'react';

const UserStory = ({ userStory }) => {
  const { description, benefit, username } = userStory;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto bg-gray-100">
      <img className="w-full h-56 object-cover" src={`https://randomuser.me/api/portraits/men/${userStory.id}.jpg`} alt="User Story" />
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

export default UserStory;
