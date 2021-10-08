docker_compose('./docker-compose.yml')

docker_build(
  'mybodypro.fit/mbp-web',
  context='services/web',
  dockerfile='services/web/Dockerfile',
  target='dev',
  live_update=[
    sync('./services/web', '/app'),
    restart_container()
  ]
)