var gameData = [
  {
    type: "wait",
    text: "Teal Crisis!!\n\nStory of Everyday Antics within the\n\nPalace of Braj Household\n\nClick to Proceed",
    font: "20 pt Arial",
    background: "assets/images/misc/opening.JPG",
    canProceed: true
  },
  cinematicData.livingRoom,
  battleData.diningRoom,
  cinematicData.kitchen,
  cinematicData.basement,
  battleData.maxRoom,
  cinematicData.leaveBasement,
  cinematicData.upstairs,
  battleData.davidRoom,
  cinematicData.davidRoom,
  battleData.jinRoom,
  cinematicData.jinRoom,
  // The Normal Game Ending
  {
    type: "wait",
    text: "End of Game.\n\nYou Won\n\nHappy Birthday Nick!",
    font: "20 pt Arial",
    background: "assets/images/misc/victory.jpg"
  },
  // The Game Over Screen -- Not normally accessible because the 
  // Normal Game Ending has no way to proceed
  {
    type: "wait",
    text: "Game Over.\n\nYou Lost\n\nHappy Birthday Nick!",
    font: "20 pt Arial",
    background: "assets/images/misc/defeat.JPG"
  }
];
