var gameData = [
  {
    type: "wait",
    text: "Teal Crisis!!\n\nClick to Shoot\n\nSpace to Hide/Reload\n\nShoot to Continue",
    font: "20 pt Arial",
    canProceed: true
  },
  cinematicData.livingRoom,
  // battleData.diningRoom,
  cinematicData.kitchen,
  cinematicData.basement,
  // battleData.maxRoom,
  cinematicData.leaveBasement,
  cinematicData.upstairs,
  // battleData.davidRoom,
  cinematicData.davidRoom,
  // battleData.jinRoom,
  cinematicData.jinRoom,
  // The Normal Game Ending
  {
    type: "wait",
    text: "End of Game.\n\nYou Won\n\nHappy Birthday Nick!",
    font: "20 pt Arial"
  },
  // The Game Over Screen -- Not normally accessible because the 
  // Normal Game Ending has no way to proceed
  {
    type: "wait",
    text: "Game Over.\n\nYou Lost\n\nHappy Birthday Nick!",
    font: "20 pt Arial"
  }
]
