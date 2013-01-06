var gameData = [
  {
    type: "opening"
  },
  {
    type: "cinematic",
    data: {
      images: ["assets/images/zone1.jpg", "assets/images/zone2.jpg"],
      frames: {width: 800, height: 600},
      animations: {
        play: {
          frames: [0, 1],
          next: "play",
          frequency: 10
        }
      }
    },
    time: 5
  },
  {
    type: "battle",
    image: "assets/images/zone1.jpg",
    time: 2,
    bodies: [
      {
        health: 5,
        x: 200,
        y: 400,
        entryTime: 0,
        states: [
          {
            subbodies: [
              {x: 60.0,  y: 90.0, radius: 50.0},
              {x: 30.0,  y: 20.0, radius: 40.0},
              {x: 70.0,  y: 40.0, radius: 30.0},
              {x: 80.0,  y: 10.0, radius: 20.0},
              {x: 30.0,  y: 50.0, radius: 10.0}
            ],
            time: 5,
            image: "assets/images/temp.jpg",
            attackSequence: [2, 4]
          },
          {
            subbodies: [
              {x: 40.0,  y: 20.0, radius: 10.0},
              {x: 60.0,  y: 90.0, radius: 20.0},
              {x: 80.0,  y: 30.0, radius: 30.0},
              {x: 120.0, y: 20.0, radius: 40.0},
              {x: 90.0,  y: 50.0, radius: 50.0}
            ],
            time: 2,
            image: "assets/images/temp2.jpg",
            attackSequence: null
          }
        ]
      },
      {
        health: 5,
        x: 400,
        y: 400,
        entryTime: 3,
        states: [
          {
            subbodies: [
              {x: 40.0,  y: 20.0, radius: 10.0},
              {x: 60.0,  y: 90.0, radius: 20.0},
              {x: 80.0,  y: 30.0, radius: 30.0},
              {x: 120.0, y: 20.0, radius: 40.0},
              {x: 90.0,  y: 50.0, radius: 50.0}
            ],
            time: 9999,
            attackSequence: null
          }
        ]
      }
    ]
  },
  {
    type: "battle",
    image: "assets/images/zone2.jpg",
    time: 42,
    bodies: [
      {
        health: 5,
        x: 100,
        y: 200,
        entryTime: 0,
        states: [
          {
            subbodies: [
              {x: 60.0,  y: 90.0, radius: 50.0},
              {x: 30.0,  y: 20.0, radius: 40.0},
              {x: 70.0,  y: 40.0, radius: 30.0},
              {x: 80.0,  y: 10.0, radius: 20.0},
              {x: 30.0,  y: 50.0, radius: 10.0}
            ],
            time: 5,
            image: "assets/images/temp.jpg",
            attackSequence: [2, 4]
          },
          {
            subbodies: [
              {x: 40.0,  y: 20.0, radius: 10.0},
              {x: 60.0,  y: 90.0, radius: 20.0},
              {x: 80.0,  y: 30.0, radius: 30.0},
              {x: 120.0, y: 20.0, radius: 40.0},
              {x: 90.0,  y: 50.0, radius: 50.0}
            ],
            time: 2,
            image: "assets/images/temp2.jpg",
            attackSequence: null
          }
        ]
      },
      {
        health: 5,
        x: 400,
        y: 400,
        entryTime: 3,
        states: [
          {
            subbodies: [
              {x: 40.0,  y: 20.0, radius: 10.0},
              {x: 60.0,  y: 90.0, radius: 20.0},
              {x: 80.0,  y: 30.0, radius: 30.0},
              {x: 120.0, y: 20.0, radius: 40.0},
              {x: 90.0,  y: 50.0, radius: 50.0}
            ],
            time: 9999,
            attackSequence: null
          }
        ]
      }
    ]
  },
  {
    type: "closing"
  }
]

