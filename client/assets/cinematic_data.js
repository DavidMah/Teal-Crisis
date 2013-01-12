// An Example
// {
//   type: "cinematic",
//   data: {
//     images: ['assets/images/cinematics/test/small-DSC_5883.JPG', 'assets/images/cinematics/test/small-DSC_5884.JPG', 'assets/images/cinematics/test/small-DSC_5885.JPG', 'assets/images/cinematics/test/small-DSC_5886.JPG', 'assets/images/cinematics/test/small-DSC_5887.JPG', 'assets/images/cinematics/test/small-DSC_5888.JPG', 'assets/images/cinematics/test/small-DSC_5889.JPG', 'assets/images/cinematics/test/small-DSC_5890.JPG', 'assets/images/cinematics/test/small-DSC_5891.JPG', 'assets/images/cinematics/test/small-DSC_5892.JPG', 'assets/images/cinematics/test/small-DSC_5893.JPG', 'assets/images/cinematics/test/small-DSC_5894.JPG', 'assets/images/cinematics/test/small-DSC_5895.JPG', 'assets/images/cinematics/test/small-DSC_5896.JPG', 'assets/images/cinematics/test/small-DSC_5897.JPG', 'assets/images/cinematics/test/small-DSC_5898.JPG', 'assets/images/cinematics/test/small-DSC_5899.JPG', 'assets/images/cinematics/test/small-DSC_5900.JPG', 'assets/images/cinematics/test/small-DSC_5901.JPG', 'assets/images/cinematics/test/small-DSC_5902.JPG', 'assets/images/cinematics/test/small-DSC_5903.JPG', 'assets/images/cinematics/test/small-DSC_5904.JPG', 'assets/images/cinematics/test/small-DSC_5905.JPG', 'assets/images/cinematics/test/small-DSC_5906.JPG', 'assets/images/cinematics/test/small-DSC_5907.JPG', 'assets/images/cinematics/test/small-DSC_5908.JPG', 'assets/images/cinematics/test/small-DSC_5909.JPG', 'assets/images/cinematics/test/small-DSC_5910.JPG'],
//     frames: {width: 800, height: 536},
//     animations: {
//       play: [0, 25, false, 3],
//     }
//   },
//   sounds: [
//     // { file: 'assets/sounds/eeuugh.ogg', time: 0.5, offset: ms, volume: 0 to 1},
//     { file: 'assets/sounds/eeuugh.ogg', time: 0.5, offset: 0},
//     { file: 'assets/sounds/eeuugh.ogg', time: 1}
//   ],
//   time: 5
// },
var cinematicData = {
  livingRoom: {
    type: "cinematic",
    data: {
      images: ['assets/images/cinematics/living-room/001.jpg', 'assets/images/cinematics/living-room/002.jpg', 'assets/images/cinematics/living-room/003.jpg', 'assets/images/cinematics/living-room/004.jpg', 'assets/images/cinematics/living-room/005.jpg', 'assets/images/cinematics/living-room/006.jpg', 'assets/images/cinematics/living-room/007.jpg', 'assets/images/cinematics/living-room/008.jpg', 'assets/images/cinematics/living-room/009.jpg', 'assets/images/cinematics/living-room/010.jpg', 'assets/images/cinematics/living-room/011.jpg', 'assets/images/cinematics/living-room/012.jpg', 'assets/images/cinematics/living-room/013.jpg', 'assets/images/cinematics/living-room/014.jpg', 'assets/images/cinematics/living-room/015.jpg', 'assets/images/cinematics/living-room/016.jpg', 'assets/images/cinematics/living-room/017.jpg', 'assets/images/cinematics/living-room/018.jpg', 'assets/images/cinematics/living-room/019.jpg', 'assets/images/cinematics/living-room/020.jpg', 'assets/images/cinematics/living-room/021.jpg', 'assets/images/cinematics/living-room/022.jpg', 'assets/images/cinematics/living-room/023.jpg', 'assets/images/cinematics/living-room/024.jpg', 'assets/images/cinematics/living-room/025.jpg', 'assets/images/cinematics/living-room/026.jpg', 'assets/images/cinematics/living-room/027.jpg', 'assets/images/cinematics/living-room/028.jpg', 'assets/images/cinematics/living-room/029.jpg'],
      frames: { width: 800, height: 536 },
      animations: {
        play: [0, 3, 'play2', 15],
        play2: [0, 7, 'play3', 3],
        play3: [8, 9, 'play4', 30],
        play4: [9, 28, 'stop', 5],
        stop:  [28, 28, false, 3]
      }
    },
    sounds: [],
    time: 9999
  },
  kitchen: {
    type: "cinematic",
    data: {
      images: ['assets/images/cinematics/kitchen/001.jpg', 'assets/images/cinematics/kitchen/002.jpg', 'assets/images/cinematics/kitchen/003.jpg', 'assets/images/cinematics/kitchen/004.jpg', 'assets/images/cinematics/kitchen/005.jpg', 'assets/images/cinematics/kitchen/006.jpg', 'assets/images/cinematics/kitchen/007.jpg', 'assets/images/cinematics/kitchen/008.jpg', 'assets/images/cinematics/kitchen/009.jpg', 'assets/images/cinematics/kitchen/010.jpg', 'assets/images/cinematics/kitchen/011.jpg', 'assets/images/cinematics/kitchen/012.jpg', 'assets/images/cinematics/kitchen/013.jpg', 'assets/images/cinematics/kitchen/014.jpg', 'assets/images/cinematics/kitchen/015.jpg', 'assets/images/cinematics/kitchen/016.jpg', 'assets/images/cinematics/kitchen/017.jpg', 'assets/images/cinematics/kitchen/018.jpg', 'assets/images/cinematics/kitchen/019.jpg', 'assets/images/cinematics/kitchen/020.jpg', 'assets/images/cinematics/kitchen/021.jpg', 'assets/images/cinematics/kitchen/022.jpg', 'assets/images/cinematics/kitchen/023.jpg', 'assets/images/cinematics/kitchen/024.jpg', 'assets/images/cinematics/kitchen/025.jpg', 'assets/images/cinematics/kitchen/026.jpg', 'assets/images/cinematics/kitchen/027.jpg', 'assets/images/cinematics/kitchen/028.jpg', 'assets/images/cinematics/kitchen/029.jpg', 'assets/images/cinematics/kitchen/030.jpg', 'assets/images/cinematics/kitchen/031.jpg', 'assets/images/cinematics/kitchen/032.jpg', 'assets/images/cinematics/kitchen/033.jpg', 'assets/images/cinematics/kitchen/034.jpg', 'assets/images/cinematics/kitchen/035.jpg', 'assets/images/cinematics/kitchen/036.jpg', 'assets/images/cinematics/kitchen/037.jpg', 'assets/images/cinematics/kitchen/038.jpg', 'assets/images/cinematics/kitchen/039.jpg', 'assets/images/cinematics/kitchen/040.jpg', 'assets/images/cinematics/kitchen/041.jpg', 'assets/images/cinematics/kitchen/042.jpg', 'assets/images/cinematics/kitchen/043.jpg', 'assets/images/cinematics/kitchen/044.jpg', 'assets/images/cinematics/kitchen/045.jpg', 'assets/images/cinematics/kitchen/046.jpg', 'assets/images/cinematics/kitchen/047.jpg', 'assets/images/cinematics/kitchen/048.jpg'],
      frames: { width: 800, height: 536 },
      animations: {
        play: [0, 47, 'stop', 3],
        stop: [47, 47, false, 3]
      },
    },
    sounds: [],
    time: 9999

  },
  basement: {
    type: "cinematic",
    data: {
      images: ['assets/images/cinematics/basement/001.jpg', 'assets/images/cinematics/basement/002.jpg', 'assets/images/cinematics/basement/003.jpg', 'assets/images/cinematics/basement/004.jpg', 'assets/images/cinematics/basement/005.jpg', 'assets/images/cinematics/basement/006.jpg', 'assets/images/cinematics/basement/007.jpg', 'assets/images/cinematics/basement/008.jpg', 'assets/images/cinematics/basement/009.jpg', 'assets/images/cinematics/basement/010.jpg', 'assets/images/cinematics/basement/011.jpg', 'assets/images/cinematics/basement/012.jpg', 'assets/images/cinematics/basement/013.jpg', 'assets/images/cinematics/basement/014.jpg', 'assets/images/cinematics/basement/015.jpg', 'assets/images/cinematics/basement/016.jpg', 'assets/images/cinematics/basement/017.jpg', 'assets/images/cinematics/basement/018.jpg', 'assets/images/cinematics/basement/019.jpg', 'assets/images/cinematics/basement/020.jpg', 'assets/images/cinematics/basement/021.jpg', 'assets/images/cinematics/basement/022.jpg', 'assets/images/cinematics/basement/023.jpg', 'assets/images/cinematics/basement/024.jpg', 'assets/images/cinematics/basement/025.jpg', 'assets/images/cinematics/basement/026.jpg', 'assets/images/cinematics/basement/027.jpg', 'assets/images/cinematics/basement/028.jpg', 'assets/images/cinematics/basement/029.jpg', 'assets/images/cinematics/basement/030.jpg', 'assets/images/cinematics/basement/031.jpg', 'assets/images/cinematics/basement/032.jpg', 'assets/images/cinematics/basement/033.jpg', 'assets/images/cinematics/basement/034.jpg', 'assets/images/cinematics/basement/035.jpg', 'assets/images/cinematics/basement/036.jpg'],
      frames: { width: 800, height: 536 },
      animations: {
        play: [0, 35, 'stop', 3],
        stop: [35, 35, false, 3]
      },
    },
    sounds: [],
    time: 9999

  },
  leaveBasement: {
    type: "cinematic",
    data: {
      images: ['assets/images/cinematics/leave-basement/001.jpg', 'assets/images/cinematics/leave-basement/002.jpg', 'assets/images/cinematics/leave-basement/003.jpg', 'assets/images/cinematics/leave-basement/004.jpg', 'assets/images/cinematics/leave-basement/005.jpg', 'assets/images/cinematics/leave-basement/006.jpg', 'assets/images/cinematics/leave-basement/007.jpg', 'assets/images/cinematics/leave-basement/008.jpg', 'assets/images/cinematics/leave-basement/009.jpg', 'assets/images/cinematics/leave-basement/010.jpg', 'assets/images/cinematics/leave-basement/011.jpg', 'assets/images/cinematics/leave-basement/012.jpg', 'assets/images/cinematics/leave-basement/013.jpg', 'assets/images/cinematics/leave-basement/014.jpg', 'assets/images/cinematics/leave-basement/015.jpg', 'assets/images/cinematics/leave-basement/016.jpg', 'assets/images/cinematics/leave-basement/017.jpg', 'assets/images/cinematics/leave-basement/018.jpg', 'assets/images/cinematics/leave-basement/019.jpg', 'assets/images/cinematics/leave-basement/020.jpg'],

      frames: { width: 800, height: 536 },
      animations: {
        play: [0, 16, 'play2', 3],
        play2: [17, 19, 'stop', 5],
        stop: [19, 19, false, 3]
      },
    },
    sounds: [],
    time: 9999


  },
  upstairs: {
    type: "cinematic",
    data: {
      images: ['assets/images/cinematics/upstairs/001.jpg', 'assets/images/cinematics/upstairs/002.jpg', 'assets/images/cinematics/upstairs/003.jpg', 'assets/images/cinematics/upstairs/004.jpg', 'assets/images/cinematics/upstairs/005.jpg', 'assets/images/cinematics/upstairs/006.jpg', 'assets/images/cinematics/upstairs/007.jpg', 'assets/images/cinematics/upstairs/008.jpg', 'assets/images/cinematics/upstairs/009.jpg', 'assets/images/cinematics/upstairs/010.jpg', 'assets/images/cinematics/upstairs/011.jpg', 'assets/images/cinematics/upstairs/012.jpg', 'assets/images/cinematics/upstairs/013.jpg', 'assets/images/cinematics/upstairs/014.jpg', 'assets/images/cinematics/upstairs/015.jpg', 'assets/images/cinematics/upstairs/016.jpg', 'assets/images/cinematics/upstairs/017.jpg', 'assets/images/cinematics/upstairs/018.jpg', 'assets/images/cinematics/upstairs/019.jpg', 'assets/images/cinematics/upstairs/020.jpg', 'assets/images/cinematics/upstairs/021.jpg', 'assets/images/cinematics/upstairs/022.jpg', 'assets/images/cinematics/upstairs/023.jpg', 'assets/images/cinematics/upstairs/024.jpg', 'assets/images/cinematics/upstairs/025.jpg', 'assets/images/cinematics/upstairs/026.jpg', 'assets/images/cinematics/upstairs/027.jpg', 'assets/images/cinematics/upstairs/028.jpg', 'assets/images/cinematics/upstairs/029.jpg', 'assets/images/cinematics/upstairs/030.jpg', 'assets/images/cinematics/upstairs/031.jpg', 'assets/images/cinematics/upstairs/032.jpg', 'assets/images/cinematics/upstairs/033.jpg', 'assets/images/cinematics/upstairs/034.jpg', 'assets/images/cinematics/upstairs/035.jpg', 'assets/images/cinematics/upstairs/036.jpg', 'assets/images/cinematics/upstairs/037.jpg', 'assets/images/cinematics/upstairs/038.jpg', 'assets/images/cinematics/upstairs/039.jpg', 'assets/images/cinematics/upstairs/040.jpg', 'assets/images/cinematics/upstairs/041.jpg', 'assets/images/cinematics/upstairs/042.jpg', 'assets/images/cinematics/upstairs/043.jpg', 'assets/images/cinematics/upstairs/044.jpg', 'assets/images/cinematics/upstairs/045.jpg', 'assets/images/cinematics/upstairs/046.jpg', 'assets/images/cinematics/upstairs/047.jpg', 'assets/images/cinematics/upstairs/048.jpg', 'assets/images/cinematics/upstairs/049.jpg', 'assets/images/cinematics/upstairs/050.jpg', 'assets/images/cinematics/upstairs/051.jpg', 'assets/images/cinematics/upstairs/052.jpg', 'assets/images/cinematics/upstairs/053.jpg', 'assets/images/cinematics/upstairs/054.jpg', 'assets/images/cinematics/upstairs/055.jpg', 'assets/images/cinematics/upstairs/056.jpg', 'assets/images/cinematics/upstairs/057.jpg', 'assets/images/cinematics/upstairs/058.jpg', 'assets/images/cinematics/upstairs/059.jpg', 'assets/images/cinematics/upstairs/060.jpg', 'assets/images/cinematics/upstairs/061.jpg', 'assets/images/cinematics/upstairs/062.jpg', 'assets/images/cinematics/upstairs/063.jpg', 'assets/images/cinematics/upstairs/064.jpg', 'assets/images/cinematics/upstairs/065.jpg', 'assets/images/cinematics/upstairs/066.jpg', 'assets/images/cinematics/upstairs/067.jpg', 'assets/images/cinematics/upstairs/068.jpg', 'assets/images/cinematics/upstairs/069.jpg', 'assets/images/cinematics/upstairs/070.jpg', 'assets/images/cinematics/upstairs/071.jpg', 'assets/images/cinematics/upstairs/072.jpg', 'assets/images/cinematics/upstairs/073.jpg', 'assets/images/cinematics/upstairs/074.jpg', 'assets/images/cinematics/upstairs/075.jpg', 'assets/images/cinematics/upstairs/076.jpg', 'assets/images/cinematics/upstairs/077.jpg', 'assets/images/cinematics/upstairs/078.jpg', 'assets/images/cinematics/upstairs/079.jpg', 'assets/images/cinematics/upstairs/080.jpg', 'assets/images/cinematics/upstairs/081.jpg', 'assets/images/cinematics/upstairs/082.jpg', 'assets/images/cinematics/upstairs/083.jpg', 'assets/images/cinematics/upstairs/084.jpg', 'assets/images/cinematics/upstairs/085.jpg', 'assets/images/cinematics/upstairs/086.jpg', 'assets/images/cinematics/upstairs/087.jpg', 'assets/images/cinematics/upstairs/088.jpg', 'assets/images/cinematics/upstairs/089.jpg', 'assets/images/cinematics/upstairs/090.jpg', 'assets/images/cinematics/upstairs/091.jpg', 'assets/images/cinematics/upstairs/092.jpg', 'assets/images/cinematics/upstairs/093.jpg', 'assets/images/cinematics/upstairs/094.jpg', 'assets/images/cinematics/upstairs/095.jpg', 'assets/images/cinematics/upstairs/096.jpg', 'assets/images/cinematics/upstairs/097.jpg', 'assets/images/cinematics/upstairs/098.jpg', 'assets/images/cinematics/upstairs/099.jpg', 'assets/images/cinematics/upstairs/100.jpg', 'assets/images/cinematics/upstairs/101.jpg', 'assets/images/cinematics/upstairs/102.jpg', 'assets/images/cinematics/upstairs/103.jpg', 'assets/images/cinematics/upstairs/104.jpg', 'assets/images/cinematics/upstairs/105.jpg', 'assets/images/cinematics/upstairs/106.jpg', 'assets/images/cinematics/upstairs/107.jpg', 'assets/images/cinematics/upstairs/108.jpg', 'assets/images/cinematics/upstairs/109.jpg', 'assets/images/cinematics/upstairs/110.jpg', 'assets/images/cinematics/upstairs/111.jpg', 'assets/images/cinematics/upstairs/112.jpg', 'assets/images/cinematics/upstairs/113.jpg', 'assets/images/cinematics/upstairs/114.jpg', 'assets/images/cinematics/upstairs/115.jpg', 'assets/images/cinematics/upstairs/116.jpg', 'assets/images/cinematics/upstairs/117.jpg', 'assets/images/cinematics/upstairs/118.jpg', 'assets/images/cinematics/upstairs/119.jpg', 'assets/images/cinematics/upstairs/120.jpg', 'assets/images/cinematics/upstairs/121.jpg', 'assets/images/cinematics/upstairs/122.jpg', 'assets/images/cinematics/upstairs/123.jpg', 'assets/images/cinematics/upstairs/124.jpg', 'assets/images/cinematics/upstairs/125.jpg', 'assets/images/cinematics/upstairs/126.jpg', 'assets/images/cinematics/upstairs/127.jpg', 'assets/images/cinematics/upstairs/128.jpg', 'assets/images/cinematics/upstairs/129.jpg', 'assets/images/cinematics/upstairs/130.jpg', 'assets/images/cinematics/upstairs/131.jpg', 'assets/images/cinematics/upstairs/132.jpg', 'assets/images/cinematics/upstairs/133.jpg', 'assets/images/cinematics/upstairs/134.jpg', 'assets/images/cinematics/upstairs/135.jpg', 'assets/images/cinematics/upstairs/136.jpg', 'assets/images/cinematics/upstairs/137.jpg', 'assets/images/cinematics/upstairs/138.jpg', 'assets/images/cinematics/upstairs/139.jpg', 'assets/images/cinematics/upstairs/140.jpg', 'assets/images/cinematics/upstairs/141.jpg', 'assets/images/cinematics/upstairs/142.jpg', 'assets/images/cinematics/upstairs/143.jpg', 'assets/images/cinematics/upstairs/144.jpg', 'assets/images/cinematics/upstairs/145.jpg', 'assets/images/cinematics/upstairs/146.jpg', 'assets/images/cinematics/upstairs/147.jpg', 'assets/images/cinematics/upstairs/148.jpg', 'assets/images/cinematics/upstairs/149.jpg', 'assets/images/cinematics/upstairs/150.jpg', 'assets/images/cinematics/upstairs/151.jpg'],

      frames: { width: 800, height: 536 },
      animations: {
        play: [0, 150, 'stop', 3],
        stop: [150, 150, false, 3]
      },
    },
    sounds: [],
    time: 9999

  },
  davidRoom: {
    type: "cinematic",
    data: {
images: ['assets/images/cinematics/david-room/001.jpg', 'assets/images/cinematics/david-room/002.jpg', 'assets/images/cinematics/david-room/003.jpg', 'assets/images/cinematics/david-room/004.jpg', 'assets/images/cinematics/david-room/005.jpg', 'assets/images/cinematics/david-room/006.jpg', 'assets/images/cinematics/david-room/007.jpg', 'assets/images/cinematics/david-room/008.jpg', 'assets/images/cinematics/david-room/009.jpg', 'assets/images/cinematics/david-room/010.jpg', 'assets/images/cinematics/david-room/011.jpg', 'assets/images/cinematics/david-room/012.jpg', 'assets/images/cinematics/david-room/013.jpg', 'assets/images/cinematics/david-room/014.jpg', 'assets/images/cinematics/david-room/015.jpg', 'assets/images/cinematics/david-room/016.jpg', 'assets/images/cinematics/david-room/017.jpg', 'assets/images/cinematics/david-room/018.jpg', 'assets/images/cinematics/david-room/019.jpg', 'assets/images/cinematics/david-room/020.jpg', 'assets/images/cinematics/david-room/021.jpg', 'assets/images/cinematics/david-room/022.jpg', 'assets/images/cinematics/david-room/023.jpg', 'assets/images/cinematics/david-room/024.jpg', 'assets/images/cinematics/david-room/025.jpg', 'assets/images/cinematics/david-room/026.jpg'],


      frames: { width: 800, height: 536 },
      animations: {
        play: [0, 36, 'stop', 3],
        stop: [0, 36, false, 3]
      },
    },
    sounds: [],
    time: 9999

  },
  jinRoom: {
    type: "cinematic",
    data: {
      images: ['assets/images/cinematics/jin-room/001.jpg', 'assets/images/cinematics/jin-room/002.jpg', 'assets/images/cinematics/jin-room/003.jpg', 'assets/images/cinematics/jin-room/004.jpg', 'assets/images/cinematics/jin-room/005.jpg', 'assets/images/cinematics/jin-room/006.jpg', 'assets/images/cinematics/jin-room/007.jpg', 'assets/images/cinematics/jin-room/008.jpg', 'assets/images/cinematics/jin-room/009.jpg', 'assets/images/cinematics/jin-room/010.jpg', 'assets/images/cinematics/jin-room/011.jpg', 'assets/images/cinematics/jin-room/012.jpg', 'assets/images/cinematics/jin-room/013.jpg', 'assets/images/cinematics/jin-room/014.jpg', 'assets/images/cinematics/jin-room/015.jpg', 'assets/images/cinematics/jin-room/016.jpg', 'assets/images/cinematics/jin-room/017.jpg', 'assets/images/cinematics/jin-room/018.jpg', 'assets/images/cinematics/jin-room/019.jpg', 'assets/images/cinematics/jin-room/020.jpg', 'assets/images/cinematics/jin-room/021.jpg', 'assets/images/cinematics/jin-room/022.jpg', 'assets/images/cinematics/jin-room/023.jpg', 'assets/images/cinematics/jin-room/024.jpg', 'assets/images/cinematics/jin-room/025.jpg', 'assets/images/cinematics/jin-room/026.jpg', 'assets/images/cinematics/jin-room/027.jpg', 'assets/images/cinematics/jin-room/028.jpg', 'assets/images/cinematics/jin-room/029.jpg', 'assets/images/cinematics/jin-room/030.jpg', 'assets/images/cinematics/jin-room/031.jpg', 'assets/images/cinematics/jin-room/032.jpg', 'assets/images/cinematics/jin-room/033.jpg', 'assets/images/cinematics/jin-room/034.jpg', 'assets/images/cinematics/jin-room/035.jpg', 'assets/images/cinematics/jin-room/036.jpg', 'assets/images/cinematics/jin-room/037.jpg', 'assets/images/cinematics/jin-room/038.jpg', 'assets/images/cinematics/jin-room/039.jpg', 'assets/images/cinematics/jin-room/040.jpg', 'assets/images/cinematics/jin-room/041.jpg', 'assets/images/cinematics/jin-room/042.jpg', 'assets/images/cinematics/jin-room/043.jpg', 'assets/images/cinematics/jin-room/044.jpg', 'assets/images/cinematics/jin-room/045.jpg', 'assets/images/cinematics/jin-room/046.jpg', 'assets/images/cinematics/jin-room/047.jpg', 'assets/images/cinematics/jin-room/048.jpg', 'assets/images/cinematics/jin-room/049.jpg', 'assets/images/cinematics/jin-room/050.jpg', 'assets/images/cinematics/jin-room/051.jpg', 'assets/images/cinematics/jin-room/052.jpg', 'assets/images/cinematics/jin-room/053.jpg', 'assets/images/cinematics/jin-room/054.jpg', 'assets/images/cinematics/jin-room/055.jpg', 'assets/images/cinematics/jin-room/056.jpg', 'assets/images/cinematics/jin-room/057.jpg', 'assets/images/cinematics/jin-room/058.jpg', 'assets/images/cinematics/jin-room/059.jpg', 'assets/images/cinematics/jin-room/060.jpg', 'assets/images/cinematics/jin-room/061.jpg', 'assets/images/cinematics/jin-room/062.jpg', 'assets/images/cinematics/jin-room/063.jpg', 'assets/images/cinematics/jin-room/064.jpg', 'assets/images/cinematics/jin-room/065.jpg', 'assets/images/cinematics/jin-room/066.jpg', 'assets/images/cinematics/jin-room/067.jpg', 'assets/images/cinematics/jin-room/068.jpg', 'assets/images/cinematics/jin-room/069.jpg', 'assets/images/cinematics/jin-room/070.jpg', 'assets/images/cinematics/jin-room/071.jpg', 'assets/images/cinematics/jin-room/072.jpg', 'assets/images/cinematics/jin-room/073.jpg', 'assets/images/cinematics/jin-room/074.jpg', 'assets/images/cinematics/jin-room/075.jpg', 'assets/images/cinematics/jin-room/076.jpg', 'assets/images/cinematics/jin-room/077.jpg', 'assets/images/cinematics/jin-room/078.jpg', 'assets/images/cinematics/jin-room/079.jpg', 'assets/images/cinematics/jin-room/080.jpg', 'assets/images/cinematics/jin-room/081.jpg', 'assets/images/cinematics/jin-room/082.jpg', 'assets/images/cinematics/jin-room/083.jpg', 'assets/images/cinematics/jin-room/084.jpg', 'assets/images/cinematics/jin-room/085.jpg', 'assets/images/cinematics/jin-room/086.jpg', 'assets/images/cinematics/jin-room/087.jpg', 'assets/images/cinematics/jin-room/088.jpg'],

      frames: { width: 800, height: 536 },
      animations: {
        play: [0, 87, 'stop', 3],
        stop: [87, 87, false, 3]
      },
    },
    sounds: [],
    time: 9999
  }
}

console.log(cinematicData);
