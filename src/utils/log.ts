export const logPerf = (p: PerformanceMeasure) => {
  // eslint-disable-next-line no-console
  console.log(`%c ${p.name}: ${p.duration}ms`, 'background: #222; color: #bada55')
}
