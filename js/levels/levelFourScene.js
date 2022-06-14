/* global Phaser */

// Cristiano
// Final-Project---Cristiano
// June 7 2022
// LevelFour Scene

var powerUpActive = false
var greenKeysHeld = 0
var redKeysHeld = 0

/**
 * Phaser Scene
 */
class LevelFourScene extends Phaser.Scene {
  /**
   * Adds a dangerous box
   */
  addBox(boxX, boxY, boxType) {
    if (boxType == 1) {
      boxX = 100 + boxX * 200
      boxY = 100 + boxY * 200
      const box = this.physics.add
        .sprite(boxX, boxY, "steelBoxImage")
        .setScale(2.0)

      this.steelBoxGroup.add(box)
    } else {
      boxX = 100 + boxX * 200
      boxY = 100 + boxY * 200
      const box = this.physics.add.sprite(boxX, boxY, "boxImage").setScale(2.0)

      this.boxGroup.add(box)
    }
  }

  /**
   * Adds dangerous boxes in a line along the y axis
   */
  addBoxLoopY(boxX, numberOfBoxes, skippedBoxes, boxType) {
    for (let count = 0; count != numberOfBoxes; count++) {
      if (skippedBoxes > 0) {
        skippedBoxes = skippedBoxes - 1
      } else {
        this.addBox(boxX, count, boxType)
      }
    }
  }

  /**
   * Adds dangerous boxes in a line along the x axis
   */
  addBoxLoopX(boxY, numberOfBoxes, skippedBoxes, boxType) {
    for (let count = 0; count != numberOfBoxes; count++) {
      if (skippedBoxes > 0) {
        skippedBoxes = skippedBoxes - 1
      } else {
        this.addBox(count, boxY, boxType)
      }
    }
  }

  /**
   * Adds a green key door
   */
  addGreenKeyDoor(keyDoorX, keyDoorY) {
    keyDoorX = 100 + keyDoorX * 200
    keyDoorY = 100 + keyDoorY * 200
    const keyDoor = this.physics.add
      .sprite(keyDoorX, keyDoorY, "keyDoorImage")
      .setScale(2.0)

    this.greenKeyDoorGroup.add(keyDoor)
  }

  /**
   * Adds a red key door
   */
  addRedKeyDoor(keyDoorX, keyDoorY) {
    keyDoorX = 100 + keyDoorX * 200
    keyDoorY = 100 + keyDoorY * 200
    const keyDoor = this.physics.add
      .sprite(keyDoorX, keyDoorY, "redKeyDoorImage")
      .setScale(2.0)

    this.redKeyDoorGroup.add(keyDoor)
  }

  /**
   * Adds a green key that opens a green key door
   */
  addGreenKey(keyX, keyY) {
    keyX = 100 + keyX * 200
    keyY = 100 + keyY * 200
    const key = this.physics.add.sprite(keyX, keyY, "keyImage")

    this.greenKeyGroup.add(key)
  }

  /**
   * Adds a red key that opens a red key door
   */
  addRedKey(keyX, keyY) {
    keyX = 100 + keyX * 200
    keyY = 100 + keyY * 200
    const key = this.physics.add.sprite(keyX, keyY, "redKeyImage")

    this.redKeyGroup.add(key)
  }

  /**
   * Adds a red key that opens a red key door
   */
  addPowerUp(powerUpX, powerUpY) {
    powerUpX = 100 + powerUpX * 200
    powerUpY = 100 + powerUpY * 200
    const powerUp = this.physics.add.sprite(powerUpX, powerUpY, "powerUpImage")

    this.powerUpGroup.add(powerUp)
  }

  /**
   * Adds the goal post
   */
  addGoal(goalX, goalY) {
    goalX = 100 + goalX * 200
    goalY = 100 + goalY * 200
    const goal = this.physics.add.sprite(goalX, goalY, "goalImage")

    this.goalGroup.add(goal)
  }

  /**
   * Constructs varibles
   */
  constructor() {
    super({ key: "levelFourScene" })

    // Player Element
    this.player = null

    // Gui Elements
    this.timesLost = null
    this.bottomGui = null
    this.sideGui = null

    // Text Elements
    this.loseText = null
    this.loseTextStyle = {
      font: "50px Arial",
      fill: "#ffffff",
      align: "center",
    }
    this.tutorialText = null
    this.tutorialTextStyle = {
      font: "45px Arial",
      fill: "#ffffff",
      align: "center",
    }
    this.greenKeyCountText = null
    this.greenKeyCountTextStyle = {
      font: "100px Arial",
      fill: "#6aa84fff",
      align: "center",
    }
    this.redKeyCountText = null
    this.redKeyCountTextStyle = {
      font: "100px Arial",
      fill: "#cc0000ff",
      align: "center",
    }
  }

  /**
   * Initializes groups
   */
  init(data) {
    this.cameras.main.setBackgroundColor("#000000")
  }

  /**
   * Preloads files
   */
  preload() {
    console.log("Level Four Scene")

    this.load.image("playerImage", "assets/playerImage.png")
    this.load.image("playerPoweredUpImage", "assets/playerPoweredUp.png")
    this.load.image("boxImage", "assets/box.png")
    this.load.image("steelBoxImage", "assets/steelBox.png")
    this.load.image("goalImage", "assets/goal.png")
    this.load.image("powerUpImage", "assets/powerUp.png")
    this.load.image("keyImage", "assets/key.png")
    this.load.image("keyDoorImage", "assets/keyDoor.png")
    this.load.image("redKeyImage", "assets/redKey.png")
    this.load.image("redKeyDoorImage", "assets/redKeyDoor.png")
    this.load.image("bottomGui", "assets/bottomGUI.png")
    this.load.image("sideGui", "assets/sideGUI.png")
  }

  /**
   * Creates varibles and functions
   */
  create(data) {
    // Set times lost
    this.timesLost = 0
    // Add Player
    this.player = this.physics.add.sprite(100, 100, "playerImage")
    // Generate level one
    this.powerUpGroup = this.add.group()
    this.addPowerUp(0, 4)
    this.goalGroup = this.add.group()
    this.addGoal(8, 0)
    this.greenKeyGroup = this.add.group()
    this.addGreenKey(2, 0)
    this.greenKeyDoorGroup = this.add.group()
    this.addGreenKeyDoor(4, 3)
    this.redKeyGroup = this.add.group()
    this.addRedKey(4, 4)
    this.redKeyDoorGroup = this.add.group()
    this.addRedKeyDoor(8, 1)
    this.boxGroup = this.add.group()
    this.steelBoxGroup = this.add.group()
    this.addBoxLoopY(1, 5)
    this.addBoxLoopY(2, 5)
    this.addBoxLoopY(3, 3)
    this.addBoxLoopY(3, 5, 3, 1)
    this.addBoxLoopY(4, 3)
    this.addBoxLoopY(5, 3)
    this.addBoxLoopY(5, 5, 3, 1)
    this.addBoxLoopY(6, 5)
    this.addBoxLoopY(7, 2, 0, 1)
    this.addBoxLoopY(7, 5, 2)
    // Add Gui
    this.bottomGui = this.physics.add.sprite(0, 1197, "bottomGui").setScale(4.0)
    this.sideBui = this.physics.add.sprite(1965, 0, "sideGui").setScale(3.0)
    // Add Text
    this.loseText = this.add.text(
      20,
      1015,
      "Times lost: " + this.timesLost,
      this.loseTextStyle
    )
    this.tutorialText = this.add.text(
      318,
      345,
      "After grabbing a power up, you can destroy regular boxes.\nSome boxes may have things hidden in them.",
      this.tutorialTextStyle
    )
    this.greenKeyCountText = this.add.text(
      1832,
      0,
      greenKeysHeld,
      this.greenKeyCountTextStyle
    )
    this.redKeyCountText = this.add.text(
      1832,
      100,
      redKeysHeld,
      this.redKeyCountTextStyle
    )
    // Box collision functions
    this.physics.add.collider(
      this.player,
      this.boxGroup,
      function (playerCollide, boxCollide) {
        if (powerUpActive != true) {
          this.timesLost++
          this.loseText.text = "Times lost: " + this.timesLost
          playerCollide.x = 100
          playerCollide.y = 100
        } else {
          boxCollide.destroy()
        }
      }.bind(this)
    )
    this.physics.add.collider(
      this.player,
      this.steelBoxGroup,
      function (playerCollide, boxCollide) {
        this.timesLost++
        this.loseText.text = "Times lost: " + this.timesLost
        playerCollide.x = 100
        playerCollide.y = 100
      }.bind(this)
    )
    // Power Up collision functions
    this.physics.add.collider(
      this.player,
      this.powerUpGroup,
      function (playerCollide, powerUpCollide) {
        playerCollide.setTexture("playerPoweredUpImage")
        powerUpCollide.destroy()
        powerUpActive = true
      }.bind(this)
    )
    // Green key collision functions
    this.physics.add.collider(
      this.player,
      this.greenKeyDoorGroup,
      function (playerCollide, boxCollide) {
        if (greenKeysHeld > 0) {
          boxCollide.destroy()
          greenKeysHeld = greenKeysHeld - 1
          this.greenKeyCountText.text = greenKeysHeld
        } else {
          this.timesLost++
          this.loseText.text = "Times lost: " + this.timesLost
          playerCollide.x = 100
          playerCollide.y = 100
        }
      }.bind(this)
    )
    this.physics.add.collider(
      this.player,
      this.greenKeyGroup,
      function (playerCollide, keyCollide) {
        keyCollide.destroy()
        greenKeysHeld++
        this.greenKeyCountText.text = greenKeysHeld
      }.bind(this)
    )
    // Red key collision functions
    this.physics.add.collider(
      this.player,
      this.redKeyDoorGroup,
      function (playerCollide, boxCollide) {
        if (redKeysHeld > 0) {
          boxCollide.destroy()
          redKeysHeld = redKeysHeld - 1
          this.redKeyCountText.text = redKeysHeld
        } else {
          this.timesLost++
          this.loseText.text = "Times lost: " + this.timesLost
          playerCollide.x = 100
          playerCollide.y = 100
        }
      }.bind(this)
    )
    this.physics.add.collider(
      this.player,
      this.redKeyGroup,
      function (playerCollide, keyCollide) {
        keyCollide.destroy()
        redKeysHeld++
        this.redKeyCountText.text = redKeysHeld
      }.bind(this)
    )
    // Goal collision function
    this.physics.add.collider(
      this.player,
      this.goalGroup,
      function (playerCollide, goalCollide) {
        console.log("Finished Level Four")
        //this.scene.switch("levelFiveScene")
      }.bind(this)
    )
  }

  /**
   * Updates every milisecond
   */
  update(time, delta) {
    // Movement
    const keyUpArrow = this.input.keyboard.addKey("UP")
    const keyDownArrow = this.input.keyboard.addKey("DOWN")
    const keyLeftArrow = this.input.keyboard.addKey("LEFT")
    const keyRightArrow = this.input.keyboard.addKey("RIGHT")
    const keyW = this.input.keyboard.addKey("W")
    const keyS = this.input.keyboard.addKey("S")
    const keyA = this.input.keyboard.addKey("A")
    const keyD = this.input.keyboard.addKey("D")

    if (keyUpArrow.isDown || keyW.isDown === true) {
      this.player.y -= 10
      if (this.player.y < 50) {
        this.player.y = 50
      }
    }

    if (keyDownArrow.isDown || keyS.isDown === true) {
      this.player.y += 10
      if (this.player.y > 950) {
        this.player.y = 950
      }
    }

    if (keyLeftArrow.isDown || keyA.isDown === true) {
      this.player.x -= 10
      if (this.player.x < 50) {
        this.player.x = 50
      }
    }

    if (keyRightArrow.isDown || keyD.isDown === true) {
      this.player.x += 10
      if (this.player.x > 1750) {
        this.player.x = 1750
      }
    }
  }
}

export default LevelFourScene