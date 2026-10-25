// Logs every asset that fails to load. The loader keeps going after an error,
// so the scene still runs. A missing texture falls back to Phaser's placeholder.
export function logLoadErrors(scene) {
  scene.load.on('loaderror', (file) => {
    console.error(
      `[luci] Could not load ${file.type} "${file.key}" from ${file.url}. Continuing without it.`,
    );
  });
}
