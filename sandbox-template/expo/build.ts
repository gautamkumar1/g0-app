import { Template, defaultBuildLogger } from 'e2b'
import { template as expoTemplate } from './template'

Template.build(expoTemplate, {
  alias: 'g0-expo-app-v1',
  cpuCount: 4,
  memoryMB: 8192,
  onBuildLogs: defaultBuildLogger(),
})
