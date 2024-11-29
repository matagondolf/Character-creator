import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();
const loadedModels = new Map();

export async function loadModel(url) {
  if (loadedModels.has(url)) {
    return loadedModels.get(url).clone();
  }

  try {
    const gltf = await loader.loadAsync(url);
    const model = gltf.scene;
    loadedModels.set(url, model);
    return model.clone();
  } catch (error) {
    console.error(`Error loading model from ${url}:`, error);
    throw error;
  }
}