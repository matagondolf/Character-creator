import { GUI } from 'dat.gui';

export function createControlMenu(character) {
  const gui = new GUI();
  
  // Get all body parts from the character
  const bodyParts = character.children;
  if (!bodyParts || bodyParts.length === 0) {
    console.warn('No body parts found in character');
    return gui;
  }

  const partIndices = {
    head: 0,
    torso: 1,
    breasts: 2,
    leftArm: 3,
    rightArm: 4,
    leftLeg: 5,
    rightLeg: 6
  };

  // Create controls for each body part if it exists
  if (bodyParts[partIndices.head]) {
    const headFolder = gui.addFolder('Head');
    addScaleControls(headFolder, bodyParts[partIndices.head], 0.5, 2);
    addPositionControl(headFolder, bodyParts[partIndices.head], 'y', 3, 5);
    headFolder.open();
  }

  if (bodyParts[partIndices.torso]) {
    const torsoFolder = gui.addFolder('Torso');
    addScaleControls(torsoFolder, bodyParts[partIndices.torso], 0.5, 3);
    addPositionControl(torsoFolder, bodyParts[partIndices.torso], 'y', 1, 3);
    torsoFolder.open();
  }

  if (bodyParts[partIndices.breasts]) {
    const breastsFolder = gui.addFolder('Breasts');
    addScaleControls(breastsFolder, bodyParts[partIndices.breasts], 0.5, 2);
    addPositionControl(breastsFolder, bodyParts[partIndices.breasts], 'y', 2, 4);
    addPositionControl(breastsFolder, bodyParts[partIndices.breasts], 'z', 0, 1);
    breastsFolder.open();
  }

  if (bodyParts[partIndices.leftArm] && bodyParts[partIndices.rightArm]) {
    const armsFolder = gui.addFolder('Arms');
    // Left arm
    addScaleControl(armsFolder, bodyParts[partIndices.leftArm], 'x', 0.5, 2, 'Left Width');
    addScaleControl(armsFolder, bodyParts[partIndices.leftArm], 'y', 0.5, 2, 'Left Length');
    addPositionControl(armsFolder, bodyParts[partIndices.leftArm], 'x', -2, -1, 'Left Position X');
    // Right arm
    addScaleControl(armsFolder, bodyParts[partIndices.rightArm], 'x', 0.5, 2, 'Right Width');
    addScaleControl(armsFolder, bodyParts[partIndices.rightArm], 'y', 0.5, 2, 'Right Length');
    addPositionControl(armsFolder, bodyParts[partIndices.rightArm], 'x', 1, 2, 'Right Position X');
    armsFolder.open();
  }

  if (bodyParts[partIndices.leftLeg] && bodyParts[partIndices.rightLeg]) {
    const legsFolder = gui.addFolder('Legs');
    // Left leg
    addScaleControl(legsFolder, bodyParts[partIndices.leftLeg], 'x', 0.5, 2, 'Left Width');
    addScaleControl(legsFolder, bodyParts[partIndices.leftLeg], 'y', 0.5, 2, 'Left Length');
    addPositionControl(legsFolder, bodyParts[partIndices.leftLeg], 'x', -1, -0.2, 'Left Position X');
    // Right leg
    addScaleControl(legsFolder, bodyParts[partIndices.rightLeg], 'x', 0.5, 2, 'Right Width');
    addScaleControl(legsFolder, bodyParts[partIndices.rightLeg], 'y', 0.5, 2, 'Right Length');
    addPositionControl(legsFolder, bodyParts[partIndices.rightLeg], 'x', 0.2, 1, 'Right Position X');
    legsFolder.open();
  }

  return gui;
}

function addScaleControls(folder, object, min, max) {
  addScaleControl(folder, object, 'x', min, max, 'Width');
  addScaleControl(folder, object, 'y', min, max, 'Height');
  addScaleControl(folder, object, 'z', min, max, 'Depth');
}

function addScaleControl(folder, object, axis, min, max, name) {
  if (object && object.scale) {
    folder.add(object.scale, axis, min, max).name(name);
  }
}

function addPositionControl(folder, object, axis, min, max, name = `Position ${axis.toUpperCase()}`) {
  if (object && object.position) {
    folder.add(object.position, axis, min, max).name(name);
  }
}