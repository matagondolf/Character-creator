import * as THREE from 'three';
import { 
  createHead, 
  createTorso, 
  createArm, 
  createLeg, 
  createBreasts
} from './bodyParts.js';

export async function createCharacter(models = {}) {
  const character = new THREE.Group();

  try {
    // Create all body parts
    const [head, torso, breasts, leftArm, rightArm, leftLeg, rightLeg] = await Promise.all([
      createHead(models.head),
      createTorso(models.torso),
      createBreasts(models.breasts),
      createArm(true, models.leftArm),
      createArm(false, models.rightArm),
      createLeg(true, models.leftLeg),
      createLeg(false, models.rightLeg)
    ]);

    // Add parts in specific order to match control indices
    const parts = [head, torso, breasts, leftArm, rightArm, leftLeg, rightLeg];
    parts.forEach((part, index) => {
      if (part) {
        character.add(part);
      } else {
        console.warn(`Body part at index ${index} could not be created`);
      }
    });
  } catch (error) {
    console.error('Error creating character:', error);
  }

  return character;
}