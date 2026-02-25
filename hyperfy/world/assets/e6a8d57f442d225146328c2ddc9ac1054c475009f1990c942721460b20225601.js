const blades = app.get('Windturbine_Blades')

  let speed = 1.5

  // deterministic wind using layered sine waves off world time
  // every instance computes the same value independently
  function getWindSpeed(t) {
    const base = 2.0
    const gust1 = Math.sin(t * 0.7) * 1.2
    const gust2 = Math.sin(t * 1.3 + 3.0) * 0.6
    const gust3 = Math.sin(t * 0.3 + 1.0) * 0.8
    return Math.max(0.3, base + gust1 + gust2 + gust3)
  }

  app.on('update', delta => {
    const t = world.getTime() // shared clock across all instances

    const targetSpeed = getWindSpeed(t)

    // smooth lerp so each turbine eases into the gust at its own pace
    speed += (targetSpeed - speed) * delta * 0.8

    blades.rotation.z += speed * delta
  })