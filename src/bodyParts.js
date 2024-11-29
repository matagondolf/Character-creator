import * as THREE from 'three';
import { loadModel } from './utils/modelLoader.js';

export async function createHead(modelUrl) {
  if (modelUrl) {
    try {
      const model = await loadModel(modelUrl);
      model.position.y = 4;
      return model;
    } catch (error) {
      console.warn('Failed to load head model, falling back to default:', error);
    }
  }

  const headGroup = new THREE.Group();
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 32, 32),
    new THREE.MeshPhongMaterial({ color: 0xf5d0c5 })
  );
  const jaw = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 32, 16),
    new THREE.MeshPhongMaterial({ color: 0xf5d0c5 })
  );
  jaw.scale.set(1, 0.7, 0.85);
  jaw.position.y = -0.2;
  headGroup.add(head);
  headGroup.add(jaw);
  headGroup.position.y = 4;
  return headGroup;
}

export async function createTorso(modelUrl) {
  if (modelUrl) {
    try {
      const model = await loadModel(modelUrl);
      model.position.y = 2;
      return model;
    } catch (error) {
      console.warn('Failed to load torso model, falling back to default:', error);
    }
  }

  // Default torso implementation...
  const torsoGroup = new THREE.Group();
  const points = [];
  for (let i = 0; i <= 10; i++) {
    const y = (i / 10) * 3;
    const x = 0.8 + Math.sin((i / 10) * Math.PI) * 0.2;
    points.push(new THREE.Vector2(x, y));
  }
  const torsoGeometry = new THREE.LatheGeometry(points, 32);
  const torso = new THREE.Mesh(
    torsoGeometry,
    new THREE.MeshPhongMaterial({ color: 0xf5d0c5 })
  );
  torso.scale.z = 0.7;
  torsoGroup.add(torso);
  torsoGroup.position.y = 2;
  return torsoGroup;
}

export async function createBreasts(modelUrl) {
  if (modelUrl) {
    try {
      const model = await loadModel(modelUrl);
      model.position.set(0, 3, 0);
      return model;
    } catch (error) {
      console.warn('Failed to load breasts model, falling back to default:', error);
    }
  }

  const breastsGroup = new THREE.Group();
  const breastGeometry = new THREE.SphereGeometry(0.4, 32, 32);
  const leftBreast = new THREE.Mesh(
    breastGeometry,
    new THREE.MeshPhongMaterial({ color: 0xf5d0c5 })
  );
  leftBreast.position.set(-0.4, 3, 0.4);
  leftBreast.scale.set(1, 0.8, 0.6);
  const rightBreast = new THREE.Mesh(
    breastGeometry,
    new THREE.MeshPhongMaterial({ color: 0xf5d0c5 })
  );
  rightBreast.position.set(0.4, 3, 0.4);
  rightBreast.scale.set(1, 0.8, 0.6);
  breastsGroup.add(leftBreast);
  breastsGroup.add(rightBreast);
  return breastsGroup;
}

export async function createArm(isLeft, modelUrl) {
  if (modelUrl) {
    try {
      const model = await loadModel(modelUrl);
      model.position.set(isLeft ? -1.25 : 1.25, 2.5, 0);
      if (!isLeft) model.scale.x *= -1; // Mirror for right arm
      return model;
    } catch (error) {
      console.warn('Failed to load arm model, falling back to default:', error);
    }
  }

  const armGroup = new THREE.Group();
  const upperArm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.2, 1.2, 8, 16),
    new THREE.MeshPhongMaterial({ color: 0xf5d0c5 })
  );
  upperArm.position.y = 0.6;
  const lowerArm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.15, 1.2, 8, 16),
    new THREE.MeshPhongMaterial({ color: 0xf5d0c5 })
  );
  lowerArm.position.y = -0.7;
  armGroup.add(upperArm);
  armGroup.add(lowerArm);
  armGroup.position.set(isLeft ? -1.25 : 1.25, 2.5, 0);
  return armGroup;
}

export async function createLeg(isLeft, modelUrl) {
  if (modelUrl) {
    try {
      const model = await loadModel(modelUrl);
      model.position.set(isLeft ? -0.5 : 0.5, -0.5, 0);
      if (!isLeft) model.scale.x *= -1; // Mirror for right leg
      return model;
    } catch (error) {
      console.warn('Failed to load leg model, falling back to default:', error);
    }
  }

  const legGroup = new THREE.Group();
  const thigh = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.25, 1.5, 8, 16),
    new THREE.MeshPhongMaterial({ color: 0xf5d0c5 })
  );
  thigh.position.y = 0.7;
  const calf = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.2, 1.5, 8, 16),
    new THREE.MeshPhongMaterial({ color: 0xf5d0c5 })
  );
  calf.position.y = -0.9;
  legGroup.add(thigh);
  legGroup.add(calf);
  legGroup.position.set(isLeft ? -0.5 : 0.5, -0.5, 0);
  return legGroup;
}