const blades = app.get('Windturbine_Blades')

  const speed = 2.0 // radians per second

  app.on('update', delta => {
    blades.rotation.z += speed * delta
  })