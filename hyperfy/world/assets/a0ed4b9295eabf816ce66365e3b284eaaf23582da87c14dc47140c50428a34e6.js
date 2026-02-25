● const blades = app.get('Windturbine_Blades')

  let speed = 1.5
  let targetSpeed = 1.5
  let time = 0
  let nextGust = 0

  app.on('update', delta => {
    time += delta

    // pick a new target speed at random intervals
    if (time >= nextGust) {
      targetSpeed = 0.5 + Math.random() * 3.5 // 0.5 to 4.0 rad/s
      nextGust = time + 1 + Math.random() * 3  // change every 1-4 seconds
    }

    // smoothly lerp toward target speed
    speed += (targetSpeed - speed) * delta * 0.8

    blades.rotation.z += speed * delta
  })