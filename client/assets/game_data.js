var gameData = [
  {
    type: "opening"
  },
  {
    type: "cinematic",
    data: {
      images: ['assets/images/cinematics/test/small-DSC_5883.JPG', 'assets/images/cinematics/test/small-DSC_5884.JPG', 'assets/images/cinematics/test/small-DSC_5885.JPG', 'assets/images/cinematics/test/small-DSC_5886.JPG', 'assets/images/cinematics/test/small-DSC_5887.JPG', 'assets/images/cinematics/test/small-DSC_5888.JPG', 'assets/images/cinematics/test/small-DSC_5889.JPG', 'assets/images/cinematics/test/small-DSC_5890.JPG', 'assets/images/cinematics/test/small-DSC_5891.JPG', 'assets/images/cinematics/test/small-DSC_5892.JPG', 'assets/images/cinematics/test/small-DSC_5893.JPG', 'assets/images/cinematics/test/small-DSC_5894.JPG', 'assets/images/cinematics/test/small-DSC_5895.JPG', 'assets/images/cinematics/test/small-DSC_5896.JPG', 'assets/images/cinematics/test/small-DSC_5897.JPG', 'assets/images/cinematics/test/small-DSC_5898.JPG', 'assets/images/cinematics/test/small-DSC_5899.JPG', 'assets/images/cinematics/test/small-DSC_5900.JPG', 'assets/images/cinematics/test/small-DSC_5901.JPG', 'assets/images/cinematics/test/small-DSC_5902.JPG', 'assets/images/cinematics/test/small-DSC_5903.JPG', 'assets/images/cinematics/test/small-DSC_5904.JPG', 'assets/images/cinematics/test/small-DSC_5905.JPG', 'assets/images/cinematics/test/small-DSC_5906.JPG', 'assets/images/cinematics/test/small-DSC_5907.JPG', 'assets/images/cinematics/test/small-DSC_5908.JPG', 'assets/images/cinematics/test/small-DSC_5909.JPG', 'assets/images/cinematics/test/small-DSC_5910.JPG'],
      frames: {width: 800, height: 500},
      animations: {
        play: [0, 25, true, 3]
      }
    },
    time: 5
  },
  {
    type: "battle",
    image: "assets/images/zone1.jpg",
    time: 15,
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
    image: "assets/images/zone1.jpg",
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

