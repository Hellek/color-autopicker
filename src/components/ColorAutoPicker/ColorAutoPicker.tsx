import { Tile } from './Tile'

export const ColorAutoPicker = () => {
  const images = [
    {
      name: 'bondar',
      src: 'https://s3-alpha-sig.figma.com/img/f1d0/1519/6a5cf6136dde95977fbba232211ce8b0?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qeXNpqF~gsf2244CLTcjmJ4icD6ZsDpQMoQncamJb0IYIJFWGZVjLhivs62oZXHjDKgY51rxqJUVzGWRA1aG0oKTVeFoNgBrP8yF6oMYZIOnWbtrnubJ0H-z2FnoVhmenLFlR~f2ODvfWB0TaAzaImRqUV2K9IsqhGM00qJ2Ukwtb~XuDjC0i888n1Aaf7tZ8GOtAGpLz4Dzp7Y76hp2Ux1U5ACqcqX4d~6Imkdrb43ydZHz~mZq6Xv5dGDurJC35dhHkplVJFcE1wjB-P9NFifZMIRksdC7j1S8sBrRLcyRoUwbBk4Ze04WAR-SQre9UcsukAkBIO03O3WWDk0QLg__',
    },
    {
      name: 'food',
      src: 'https://s3-alpha-sig.figma.com/img/71c8/7996/b2bd1f072fb0c3b1f9f4e8daeac9f3e0?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XRdBr26zlkmD-MPK6sfV0fqX9C6-aG9gIL5dChUZ5hm269PdQlnaXVvgLQNt6~CnBpIwkcpYylgcVZfqdEmTuHZnQvOitckjCDcribz4MtiXN-LpyDg6UA5BpC98pQFlbQPZpzZDMc4e-RjgMmAZhOAW3A~vcr1eJOO1V5AXydOW44mtxtYizp2sAt-iDJbktl9ioQpw22XKsWKrKZxHVDGXOt4dWPY5AMzyTjzsCsyDl-VHdqcnk9FgQWrYO6XtgY~tMWCWNKTjLQHR4l8c0AOl7R7ZgpS81NWyEiReNuF7GIDfGlWVHhsiAHZACZAKKba00RVB-hluviB17Qg3-Q__',
    },
    {
      name: 'tanks',
      src: 'https://s3-alpha-sig.figma.com/img/bbef/7c95/7c207556e213bcdc26c64b14df6f79f4?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l88LRe3CS5lZlROAnH3bBOFRMwXSLDkAvj1HEcsRcp~~3sHNuEsf96yuNOqYrEB0YBP0EvkQmFf5rGfXnCFPQ2LnKcy9d~OzByX2Zff1ozzszeBDR8wW3u2slhwa5bnH4VYoVxdbSh0-pBgaOuFIXjcY4vXqodXdqn2XikPCF7ztQkt8ywpsWDSn-~hdr4tICpSruQ50VH0lzC1kVtiVMg7jFwIrKHDG3IrI9MiLnJsTrWffIUnRvglUWIncFbKgLiPBxpRI6fNvAnUMG2QfLUs4YG4YZXIya~k-AAfc3ZQzICny14~TEIieh~e8IOynknuzmMKgoCpZ2Yg6VaNhNA__',
    },
    {
      name: 'samsung',
      src: 'https://s3-alpha-sig.figma.com/img/54d6/f922/648d0b859751ae9d7b66edec4e6075c4?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qKqSOAJOlTWXzoviM5LiSNGdwfa7AQ1Lcgnu9CMwGTgBlC4o6uNfLCl27jyqaXZfwxepNYuTUlkriHMb4yZeMmagAdp1sA2chDIjVcfc~5mxT184k-OebywmE2C9NoKm7oRdp-Yq~J~CDbMIiuV1WBgppqdKaHZgfSsIFqWRMUFa~n~ib0Isqkol8P5uPxFWJu8Tuk4oxoFNjsQ~Q-sa7dtbR-TVLnlxKil5oB~vie-H1OoKWO35ErPyXHSs4mpFWXyWYYc-LgiiHrv5E3l1j8XGENNCle3jHCVJLcrHOI7DhpxgUqrlD-Y71oOrarGVWwoocH-wJM4qdmjrDYFvCg__',
    },
  ]

  return (
    <div className="flex flex-wrap gap-5">
      {images.map(img => (
        <Tile key={img.name} keyName={img.name} src={img.src} />
      ))}
    </div>
  )
}
