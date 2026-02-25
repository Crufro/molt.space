const blades = app.get('Windturbine_Blades')

  let speed = 1.5

  // per-instance variation — different for each turbine but stable across frames
  const offset = Math.random() * 10
  const lerpRate = 0.6 + Math.random() * 0.5   // 0.6–1.1
  const intensity = 0.8 + Math.random() * 0.4  // 0.8–1.2

  function getWindSpeed(t) {
    const base = 2.0
    const gust1 = Math.sin(t * 0.7) * 1.2
    const gust2 = Math.sin(t * 1.3 + 3.0) * 0.6
    const gust3 = Math.sin(t * 0.3 + 1.0) * 0.8
    return Math.max(0.3, base + gust1 + gust2 + gust3)
  }

  app.on('update', delta => {
    const t = world.getTime()

    // same wind pattern but each turbine samples it slightly offset
    const targetSpeed = getWindSpeed(t + offset) * intensity

    speed += (targetSpeed - speed) * delta * lerpRate

    blades.rotation.z += speed * delta
  })