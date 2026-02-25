const blades = app.get('Windturbine_Blades')

  const speed = 2.0 // radians per second

  app.on('update', delta => {
    blades.rotation.z += speed * delta
  })

  That's it. Drop this into your app's index.js (or paste it in the in-world script editor via
  right-click > script).

  Notes:
  - app.get('Windturbine_Blades') grabs the mesh by its Blender object name
  - Rotation is on the Z axis since turbine blades typically spin facing forward — change to
  .rotation.y or .rotation.x if your model is oriented differently
  - delta keeps rotation frame-rate independent
  - Adjust speed to taste (2.0 rad/s is a moderate spin)