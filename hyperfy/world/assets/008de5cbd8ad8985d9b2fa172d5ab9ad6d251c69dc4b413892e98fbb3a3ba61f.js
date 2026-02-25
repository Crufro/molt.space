const blades = app.get('Windturbine_Blades')

  let speed = 0.4

  const offset = Math.random() * 2
  const lerpRate = 0.3 + Math.random() * 0.2
  const intensity = 0.9 + Math.random() * 0.2

  function getWindSpeed(t) {
    const base = 0.5
    const gust1 = Math.sin(t * 0.4) * 0.2
    const gust2 = Math.sin(t * 0.9 + 3.0) * 0.1
    return Math.max(0.15, base + gust1 + gust2)
  }

  app.on('update', delta => {
    const t = world.getTime()

    const targetSpeed = getWindSpeed(t + offset) * intensity

    speed += (targetSpeed - speed) * delta * lerpRate

    blades.rotation.z += speed * delta
  })