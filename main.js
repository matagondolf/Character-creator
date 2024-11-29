import './style.css';
import { createScene } from './src/scene.js';
import { createCharacter } from './src/character.js';
import { createControlMenu } from './src/controls.js';

async function init() {
  const { scene, camera, renderer, controls } = createScene();

  // Example of how to use custom GLB models
  const models = {
   head: '/models/head.glb',
    // torso: '/models/torso.glb',
    // breasts: '/models/breasts.glb',
    // leftArm: '/models/arm.glb',
    // rightArm: '/models/arm.glb',
    // leftLeg: '/models/leg.glb',
    // rightLeg: '/models/leg.glb'
  };

  const character = await createCharacter(models);
  scene.add(character);

  // Create control menu
  createControlMenu(character);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

init();
