import { useEffect, useMemo, useState } from 'react'

import { Tile } from './Tile'

type ImageRecord = {
  name: string
  src: string
}

const imagesList: ImageRecord[] = [
  {
    name: 'bondar', src: 'https://s3-alpha-sig.figma.com/img/f1d0/1519/6a5cf6136dde95977fbba232211ce8b0?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qeXNpqF~gsf2244CLTcjmJ4icD6ZsDpQMoQncamJb0IYIJFWGZVjLhivs62oZXHjDKgY51rxqJUVzGWRA1aG0oKTVeFoNgBrP8yF6oMYZIOnWbtrnubJ0H-z2FnoVhmenLFlR~f2ODvfWB0TaAzaImRqUV2K9IsqhGM00qJ2Ukwtb~XuDjC0i888n1Aaf7tZ8GOtAGpLz4Dzp7Y76hp2Ux1U5ACqcqX4d~6Imkdrb43ydZHz~mZq6Xv5dGDurJC35dhHkplVJFcE1wjB-P9NFifZMIRksdC7j1S8sBrRLcyRoUwbBk4Ze04WAR-SQre9UcsukAkBIO03O3WWDk0QLg__',
  },
  {
    name: 'food', src: 'https://s3-alpha-sig.figma.com/img/71c8/7996/b2bd1f072fb0c3b1f9f4e8daeac9f3e0?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XRdBr26zlkmD-MPK6sfV0fqX9C6-aG9gIL5dChUZ5hm269PdQlnaXVvgLQNt6~CnBpIwkcpYylgcVZfqdEmTuHZnQvOitckjCDcribz4MtiXN-LpyDg6UA5BpC98pQFlbQPZpzZDMc4e-RjgMmAZhOAW3A~vcr1eJOO1V5AXydOW44mtxtYizp2sAt-iDJbktl9ioQpw22XKsWKrKZxHVDGXOt4dWPY5AMzyTjzsCsyDl-VHdqcnk9FgQWrYO6XtgY~tMWCWNKTjLQHR4l8c0AOl7R7ZgpS81NWyEiReNuF7GIDfGlWVHhsiAHZACZAKKba00RVB-hluviB17Qg3-Q__',
  },
  {
    name: 'tanks', src: 'https://s3-alpha-sig.figma.com/img/bbef/7c95/7c207556e213bcdc26c64b14df6f79f4?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l88LRe3CS5lZlROAnH3bBOFRMwXSLDkAvj1HEcsRcp~~3sHNuEsf96yuNOqYrEB0YBP0EvkQmFf5rGfXnCFPQ2LnKcy9d~OzByX2Zff1ozzszeBDR8wW3u2slhwa5bnH4VYoVxdbSh0-pBgaOuFIXjcY4vXqodXdqn2XikPCF7ztQkt8ywpsWDSn-~hdr4tICpSruQ50VH0lzC1kVtiVMg7jFwIrKHDG3IrI9MiLnJsTrWffIUnRvglUWIncFbKgLiPBxpRI6fNvAnUMG2QfLUs4YG4YZXIya~k-AAfc3ZQzICny14~TEIieh~e8IOynknuzmMKgoCpZ2Yg6VaNhNA__',
  },
  {
    name: 'samsung', src: 'https://s3-alpha-sig.figma.com/img/54d6/f922/648d0b859751ae9d7b66edec4e6075c4?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qKqSOAJOlTWXzoviM5LiSNGdwfa7AQ1Lcgnu9CMwGTgBlC4o6uNfLCl27jyqaXZfwxepNYuTUlkriHMb4yZeMmagAdp1sA2chDIjVcfc~5mxT184k-OebywmE2C9NoKm7oRdp-Yq~J~CDbMIiuV1WBgppqdKaHZgfSsIFqWRMUFa~n~ib0Isqkol8P5uPxFWJu8Tuk4oxoFNjsQ~Q-sa7dtbR-TVLnlxKil5oB~vie-H1OoKWO35ErPyXHSs4mpFWXyWYYc-LgiiHrv5E3l1j8XGENNCle3jHCVJLcrHOI7DhpxgUqrlD-Y71oOrarGVWwoocH-wJM4qdmjrDYFvCg__',
  },
  {
    name: 'avito', src: 'https://s3-alpha-sig.figma.com/img/87ea/b40a/12a93b5d24c463e8ef0d5f0c06a41758?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WH9O-Lx9Z5DGGBKGd8iKGAVIYFfo4uBTv90s8ts-8pgnNJpXrfskOp04vgDBCaJbZjxoR6Mh0GHz8u4Ci9tJJ8MhiTLVFa00-yotpK4vsmcGljOK3LcfCAkaGyEpHLCcYs9n7JbbZU3v1RL~X66-eBHzTFRP3avFDdJwumNOHfU2dPR-qvvVeoCWUEKzlCxXQhc-IOYN-OYY2jTk0YZz5KeNBT4lQfZoR7mbCqk8lYsNCuO~w4ITxIwEu0twAME1FKsQQx9RfzweR4DolbIDuD7nHs9eqaV9OC1gJpdmKumuN-Puru0EnF--OzfXg62iea-Pq76CViwplv3TMtvGyw__',
  },
  {
    name: 'black', src: 'https://s3-alpha-sig.figma.com/img/1b78/e5fe/21420ee7effb7c0a34d75fa6f063d3ff?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ch4WfaFIG3oiLnNuF463AuEC-lODnawHK2CCPagH3Gz0STYx324J5wj1dWMCseV41d3k52THdd83iw9kut33n1SlYq1x~1ZmTKGVogRQGwZ0iN1tAkYiqjVzWM8GqG7MlQwzDABZxPWGfPLOg9dWLjZlWRV5FXnruyeiU2RCAR4LU448xQR-tJlpB4CCAWe-bFaLltMtLzsbBYBEA8P~xp2w8lHKTbMOj1CRUbwVEKWCjkHwtyB-0QKEvijNADCSLBl3gnlO4AovwlsIUJqXL3~TwfyX6yCR6PvCxPK~-2agiJajIwPYliCCEVIaFuuPs2ChIfDuN9uHppRMKzc0CQ__',
  },
  {
    name: 'megafon', src: 'https://s3-alpha-sig.figma.com/img/5157/c59e/29fdcf21be51d9fc6ae587d78d44e7ea?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qpe74psqxIxVoj5-h9e0RUz5jkx3aOR0iC-KbeQTzqTsZNe0Y0nkqwPBbJBlZ6ayCB~tU3gP7OUVqdHJ8uNJqxTIv0uYx0YX6-Vh5hdfZntJs1TYfUXnXVE2eJZfE38emWHJ8lR2vOClDJ~VmzfWztnU74xjGdB-tFrF8GrN7vItqwdHrmTtU~Z~DfYuOHJCGx3dO7gG-NNh1kNM6WNJqbJZwPd1LQMW6pTwO0n1-DnLT4JW7eb22WyZH43mwhuI7r64FBdKjgRnG7faDpVVFriH5U0d9dHUfR1dK1ZOuZv6OFdQk7p7Ho-rUgnesylrd7BaW4GadHfG12GVS8Lvfw__',
  },
  {
    name: 'litres', src: 'https://s3-alpha-sig.figma.com/img/6687/46a1/117ea201f09e3a2a8d61e5c3ddbc08ee?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GkK9ecHnhucI5qLbosv6Q8HJPlfBqE8zeyyJ9pkZDv5QOKGc4Us-QWC87GLZdUxmpfiSMrAxKZVHmmXvONEbH0HKkfsC2kIzyMmG9zM5IK3jMeWE36eGKlci55jf6kjgurdzsJedib3~twAs3vOO3Sch7z-MyH2tqpxieJCw7AwJ34MNm0XVbMIhVOtJhJiHsjNjvMI-1pxR7WXRs1nxRZRdl9eeYImNEuse0pG6YUUavy-mT1wk7dl3Agjy~H-CCTErYP6CnnUpnOfYbFCFPUD7n5-jLGPWY3tWzKY~3yuQwuOHjiCCp6qGA0LzZEgBULX2TaSdDxnKrZ6RljWxrw__',
  },
  {
    name: 'eduson', src: 'https://s3-alpha-sig.figma.com/img/9f0f/4d1d/22fd991fd1407f895c15c00fd57965f7?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FARKOYwuJVmmLXHMfIokUsFpFjsuUWBKX6zU4nj5vWVxeWNstP1RRa-OAybkgEVm4D7G1DjCedq5-fEz27YIFCf5pum2YYHbtXwRZEJqGNEHr3D-Pzsj04SZnS8QMbOGyBm6hRfOnLUx6ntDD596GdZXdBttYh6T3fxx~Wmgp9Qr~wVpVuKTI82iRRD4Fo9sqOsPtQkIWp~01Cr3lrtNgbD70~JNZnX12sS0DDvdhcp7BDG8xa1EqzBhoQ-CmOxPKsfBxSf6~3AtDC4u~Xj8sOvrxUaIeUGkHBReMXwmrufnBiYIcIoyU4J~Vw-gM3rISd77RBSSbJjh82iwRZnv8A__',
  },
  {
    name: 'designgraph', src: 'https://s3-alpha-sig.figma.com/img/e760/ebf9/c542af2df9e9e782a1540ae1b375ed42?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LbMY4s-ObKpZvcZrDITGQc5bYRiKKXyoYYh426OWclTNHUVbUWOVex5z4jbKONIr6Zhyj7IBifBttzKmkdj4vtN9T7J1ORvPMX0gQ6v9VpHo8Z2u0h-09MG8BoyVRafvo3z3h8DbIHqQBl9tK-hgsprSnXRn-2OFVb1AV8k7sX4J8etLsSK4OONmaO~7PgZs~PcC0Fy00SEQT8zCeTYwX8nVhDNTJA2w4R~4D2hMudb5aVQTlvq47UhBYFV4dM0~MEs3RmzIy6yK0vBG1DfKIKL5hAsM8FmPhEgEE02iFhrL4ZXUNKSd1Lm9nNQBQWrjn-lyh3BFlN~eAKnMSEUhvg__',
  },
  {
    name: 'phones', src: 'https://s3-alpha-sig.figma.com/img/4a78/42a3/8388c3245171bcb41d517180f06e2618?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aaqO6kFXfD2nIXmAtf5o4maZCRgUtzLzjaLDHuB1SYom1JZc2VO4piECHIR6AG9jMpDXZjVfSqcmg5sNvbPKQWq7CPOcCTQLM~ohKkviG1nKGIsZ3W05F00C5Wb-8FQGaWqgf9wwAjEJdtYKlIAJ1WxETYuCTTlgORptmq~nbUGHoQacU1MPyfxZOevg2ulVsApCdh9MnyK77utThScrMIOdzYgERKSdyNv5muuakF8J2IVeo6OGRJYBJgp0L3hIP2JqS8cNy54Ddu-qjSHnROYzDonVSpWGwFiyE6zXBTFAvHEogGiJ5MllLQHfxL8r-ubWeYfpMScN88HZayD72w__',
  },
  {
    name: 'wildberries', src: 'https://s3-alpha-sig.figma.com/img/3c9d/4216/683c955f00ba1987f2b432c030343a84?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bVmMH74GKvARlcW5RsFxOkobdX3xc8EgtBD1sg5Zn4XV6ZWtsB~jveoktxAUg3VrgCn1JFu1CUhZJftVxh03gn7EKZCFTHabplEllokZQ1dgHBcr~oxvTLCeF1hzOFINdLNcGRppPFKjXUw1b~qMC-V7MQr5X8xJt5OsY8rNJvIhvPZIcb-JWB2w1NCHAgfVa6aZpNZThMpDXzQG4MUo-qFEQHjOWVJaDJdi6IG0cJL~li~eWPosuVdgtewId~rY476S8Nulk-mgA6ia9Hxof5xYxhw0IQ7fAJSYZAeuDjavAN7-eX6raA9F7iwW8E~Li-X9DiS4UFeyWBq-xdroPA__',
  },
  {
    name: 'besplatno', src: 'https://s3-alpha-sig.figma.com/img/2245/1313/eab09be384ccce81a2ccbaf7b33f6f7e?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aEKU7GRfaMZYqCJ3-6k4FZhMAifuo8mU5hfBdxoRwgGzhU0aPZQZ2debEnCa-6bwk2fKZETuTrj1pSVtycsFCJMZLIU79gF2GKsLmo7eSwUMShbC41Lb7O1MMW-9dAjLQyku3jDpJR4gZefSSCDY2mwNqFxqId5SYKWdf4ScnI0N1V2V70NJS4DIn-zr4bu49QulLZz7wZzFzH5OT99D1nK6AKsKh7NNDMiQunKvqSDheR-oLs5DuTgLRmcIgFoplOWMYZi6X2Hu61wPaGz49hTzzR3jMNCEw0TwPjnQHZKs2XT2zmmgEx8ARUbKpKocLb~mMGUQs87DJC3v4ZVdUQ__',
  },
  {
    name: 'figma', src: 'https://s3-alpha-sig.figma.com/img/6fec/fa26/e82a44a12c23e9b4a2bb5be8b3e19554?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ifosgh6sk2swDiUmBuDnVER8tiJmoSRBnH8GdT6vE1j8yZIEuixIGZG~mexgAu~IJJ3BmUQKCO5zSzUo2AfJG-PHrtDII-gQzhvmLPTOPNLcQNETXYbjLJG8id0RsTtTOEZ0rhoKCbKSJiZjQphdmfsiioezh4Ff3tt0-o7PG1~07f2eFRJj6tH14uzGrlq6NEbCW5VzBh6LiNoxAipDcPajpp2IL7xJquUy1HgK8yCWvJ9FZXcZxAkyk1~Xdf-urgTsCZ3fvbjaFPHRXiMiEbh6-WRTZqMohIHlDOX2huKN58JpMfOM2p7~sqKjBLHjyvhmBXLSeeJ9O3uYTBGB2A__',
  },
  {
    name: 'zaiki', src: 'https://s3-alpha-sig.figma.com/img/f347/ace8/39162b18f869d954c82bea0a10fc19a9?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SthDHK3~pu-gatF16HAvu~Yoo6hRPeMOora8gujwEX9F05nhgIEHNtpay1Qz14OlDLejoeMomQy4713WzoSalzs-p9cbxcbPpFNWOsPe2zEuLZVt9JJavmi5-fNS~tf~PuUVskDuyg0mzMG3GsowhXs854vSVa0MBnCEZJH-oEZgarUTsKthHNz7U-esHc4XITUUMwc3rzcQbFPO8-o4ARPa~2XObqOcLlUh1gvnczXWXVRGqJtj4nKdg-bc7sL39Z7G5ZQVEpuX5h4eD75YGaaeF3utBU5-n1VupTOtl7qD8crnOMdXcy0wXR2oEx8tNh2vTrZGXSDWHFR7bUEx8g__',
  },
  {
    name: 'dilplomas', src: 'https://s3-alpha-sig.figma.com/img/ffc5/0b4e/f054af9de6e3f0fe229374090ee844c0?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aEgiX-r-90uffPpdZcO2mYiSMTtSF2Gj7td61ziu8uqiJUWIa5XgWaOoahWC2V66MxvuM~Z6Zmwh9HYdwZuIPBxrG88iHsJbP~l0V1Cdl3lbRm3M5mRMNHsqMQdwO9SWS61fUMlTIOMpgAH~cdomWDK4jdrDw9ynCS~BcHQheIBsPLwxeLPamvLOJ~2B9taDoXjYq4wYq2~~rUd43PjrTXC~pZnDV3IoNWhPfox9VISqBR0KrISkf6NMUGNxZM89SsaR0KiXdUShadFWcT9D~1JksjZMqzleuStW1c~ncJV-9K0AsSBsLYsxcU9XDM~cv1ohYplvBUKj9MaODSsN~g__',
  },
  {
    name: 'tinkoff', src: 'https://s3-alpha-sig.figma.com/img/6f63/db17/5ba6f3775e28b30575e2e9faab4a7456?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Zm2zEd-0UBaq-IBWrhS1CoEaAZZCGShrsEh7oPvPE5XQu3VXQsVjnYKImD0smrHMsbzkx7OUHYMOjyujACWscrLD1ydfHj48Sf-l948WSFynNv8qKpziGzGEZG~elljahKARaRpnDFL2IMJnWHjXOvSbTe~NpEgqYf5hG4v~0MHkYeRFsTcDslSkJ~K8kyDTwpjaF8g4xGBAx3cJ95Vgfe2SMRhjexq~ig0hMyr0mDicgfoB86MK~gkfOxx38dF8uo-pKUeW8QwyAK7zJUqHPIOZ5LWXPxErmRtD2dEJPdlwB7TWtZYklpF2ys~mY~Py4hgq10QI9QsH3vA44YF6iA__',
  },
  {
    name: 'masterklass', src: 'https://s3-alpha-sig.figma.com/img/b503/4a73/188c3e97c30032a1cc59ecab95f0ff08?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jggPh2VnvAVkfD~tTc5wpRU8XDhFsMbMN~kGFIcfRzQ8GqBKXffZeE9wC2MZNn0ku95SDR~KEOAN3bQpbd552vwAYbs8scUUXox1NanrQOQ6JP4WciGuWh6KjbMVeO8dh5Bh9Qwb-wQN6KCnva~cPDjXAhFXcOQCVcoWfrR8YLA1EYekRybKPCk2AiEj1crS1xm6cL6KPOFf3sEeVG2mLumeIR5Mk~ORHjcWWXxv1M-l7nRWXJsb5i~2E1owwsMTH53~t8Du09ASOWaqbJcAjKcyNbyN8TRJ0XP4cR~7VlU~tP2j9pTxMTvWHW1JBrR~FKfnfUX1kHcpRDrisouyiw__',
  },
  {
    name: 'zmvk', src: 'https://s3-alpha-sig.figma.com/img/3491/d8d4/762599017a0997f52227072412d9d54d?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GrgUiXGd-cXZ6p8gVkPy3UYls3eSpy1NXStMpDVRNb6VeNpj6R8CuqWKFbWLejaH00-5TiBxMGD6IY65U02TM-ALcQwwbNTtCraGjPWmWdDgd2HzPdjbVW7EB~sSRhj2cV1smy6N9ncZ5dUixes90cfVPSTTotlAVPmh7SG46wU7PCjNG789tpAp~0fzOOBDw-8YkCTUzYJ4pT7RwnxJ-ZGCcIqxKQnTbCcg7Aog4ZdycwAgFnD7s4q76~Woteg01Yo~VpiHB4e8x0dSIlaEn9Qs-g9f9UYkXGX1leE5vHdHWUdS~9Gv9byqWgMWtmJ1ManhIxyWrx6h-TDkE-mc2w__',
  },
  {
    name: 'adm', src: 'https://s3-alpha-sig.figma.com/img/cba9/857a/805993a7bbbc4c661d09634529702b45?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V7uOlg2qLIqmBXghokMSEkddNZqD8Zx57woJivF6KQdaDC94nHZx0gAYqRX5u6raoCmXOlYjgjJzBATAABu2s2E4ZFDVEdNAR3HS7MO3cVpnMxivhBKlcDXMehjnbyYNnZdARnf0EPCwNtrHiFxB7ugeEKE9mKA~W7Eeb4zyYUneo1fkXGFHN6h83PhHSoddSOQObjBZBpY3mwpRpLZCkyUY24iQ5B56yltV81qRbgJpK2FIKsl-suVFa9Ez6Bam~-UNNCdrw-~myYVLoqeVWQfiM1943K5Q4810vh-4k0cKNERAlERqvr9GO6jFlFkxMBXbJXXQPwt~FBufavnYSg__',
  },
  {
    name: 'mts', src: 'https://s3-alpha-sig.figma.com/img/3d96/03ba/a40a631a909b3f62709395c5a96a412b?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C9~tC-DeX0tKziSp2tA491C~oPHvl19hCq8z8EJs42LrRiIGruKIh4NpLMCDYbxwYsiNZn6ti-xKKUghUyfy-GrYwd8a-jjWJgdVYpiTxnkRTI1H9Dt3a-lA7kIln8arwdpEDKgOcc2IV8mSeqcWLyGZg9rlZmoD864-FxBWDDilVmuCz03Me2ynV~4wamL1ciWCTW7MS1BdLpZHPCstvkJFe7bu8U4e3BHhVt7jqLyWDuusi7Vc4Vws1IM65~kPlSA24ABIod8Nm0VzWaPTlCVgIeRRWZTNyW8m2UVYn38BWfX6n8yRZUupwESnkcaclNZecnLCTM1AnOUEzD95CA__',
  },
  {
    name: 'edgecloud', src: 'https://s3-alpha-sig.figma.com/img/88a2/62a6/bb62b653a7b2bfb75c2762ae21e3dfab?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Nea~FepgTYSWEyQ~NXqhGAUJaeVf2aoOfUNxLLPqlYCV3dgce6oLddCpi3jEwI~Q0WZENl3LhCQkcfEliu5Surcr~7QuiU2O0T-EvuDX7qkXmD~FHCAM2PhE2XBWEdhKGDnxrcMRFhzKyHlj1ddN7dF~vTJXR5~eGUhEEM2RIU32iHMjCW6n40Kf6AqIA1AzRiAgt2gvoPChuF8kVmmTtKeEv7hjYtxijIYrYPh3EBUMHsfueteCJfR5o~hApGJbAC8RP5Lc8ujgGkQTYW4qPrpkOFNuthsxZ~zElPRg3TkQagkc~lXXyabspkfJqaCERRSKJrdmEtQn0lWZGblg3g__',
  },
  {
    name: 'restore', src: 'https://s3-alpha-sig.figma.com/img/e6b5/95fe/fbeea3f349839f0b7c8a626270822f3c?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlixUgMxKOv-BLFZWCkyRSslMYHV5-ldE7AVoPM9-kbSEgPwTr89wrxDee~neDbiWj~1qu8MzgnHWsigjHmWqiQltpxevfgslqjTDTi~eXIlADyqD6ssrcItfkl1CrIb-yEifzfouzkKvKuFxVBbQG2oim0Ww9jOfFNLnqviZy4jWkgF9WIF2lH8mMJ6xCfu8UkArSfWVXmLF8ybK39Cg1SwkylOfAJzBUYn9vPm5HJKcfQJTUw1PMhqMrvs3hNICV0fjFBVLp1H-JARrQsOMxBMCzI~5NThw3ibdtiimSIwv1tqNw8Pg09jtD1exQUPTUTvXp27dT5a5djqkhWLDA__',
  },
  {
    name: 'vtb', src: 'https://s3-alpha-sig.figma.com/img/a4a8/8662/b813ad1c69eb8f1fac946e630b8adaae?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dHYem1-Kkn2SGxDPYinSSIIAiR0SpZJKCUYpKFpxfe6bK1ZZecVZihdjdnQ125z81PnR3S1u3G4z9ZdjLz53i7QYlpz2wfeZRiaPw7dOqBS9~jIzlOb-DUQhzJxbHXA4ZYU8zMmkDRo3Vh71vkZnYpEYCCPqoB8BZRhxPgoPBWdMr7Jj-hKWnk1sDahFzTYO7JvwxEo~ynwCF2ET30JfCV34g4wlBQ69qRLK~NPHguHNi0r5pucZoIqg9~eSkPPaZlZYxggJYABjmdjdt7~PDu66KxE7a38cos61rg-quGqbDM3btCQqW~U0b~eqs3eXuKn6aac1loNZ3XoEh~UHAg__',
  },
  {
    name: 'samsgalaxy', src: 'https://s3-alpha-sig.figma.com/img/831e/9df9/ee96e6ee63f6fb359644f4cf3d54b284?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pQleHINm9iPq2rcbGgpkc5D-vZNvgRwI-RGJKXzwE0IfJKQG2iU3TiIo8e523AQI-8Q5K174AZ~XFgqMQeEu4AOwGE~D7bYuPMDJtu5vZGjS4eo0w~N6SAh2x2B2TWOJWfNCS-qF2UgfecsV4zjfZ1O1unbrpX6pplrChbF9rvV2VZpCBwtUZ-Po-XKSEyB1uvPr8JW8V3ueyHhGYvN4rMB6lHt4glf3fVgX9X5W0AiLeLbYBuLc0IF5ouYPtNljQtM~BHKzQPPdlf9MQbfkCuZb-ltEOyoxagbKr7w62K1QL9RoOml90hQnZ0YmP7YTrqwewnofEP09OpQqglB1Ew__',
  },
  {
    name: 'some1', src: 'https://s3-alpha-sig.figma.com/img/1ba8/dcca/08737a119b4c57bca37ffab44ca3b98c?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=otuN1hKN9RmtUUgOLPDHrh~XukkmnGBCFUpxL9yE6rXiFhrA45xG3ID8KoTE8TPAJqk2O0FMQAT9en2bkKpeCrTzS5SmazXg4~IwqFn7hdGete1xKTmMWviH-VqW7RtX~5Sgz49ZBl3QDVFvAiifyU4eLxPQsQoWHWTQ0yn~yXAjcWfNwESdgK-tCIjfLBd33eYdzAlrEQVTQfOgNM94W1XRGhNX2H5AkwbUHErTDvC6F88SxxwvV2TQvCpgYVKRmo9Wo5-73pMXD1GjwOflEg4trq6m~HQKsfsgrTTnrzaogjbJ3ePa3-1Pxl~jOfRTzBD-mI42yS0oqTQBtMLmIA__',
  },
  {
    name: 'some2', src: 'https://s3-alpha-sig.figma.com/img/df68/2915/87377d22d529a8f3264054bf66581962?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gY-pQ4B7pH1s85m6KJOCJVvZ~peYupmudffUYFMpCf8u23uSbQ2th07xEuz2j8qrhSikDXVr~zJgPNTKRH7g661sovstfiWdiiUTm98xMxQrX5FLHEWBfkK-5OH8tLQ6s-u0aJkbX4NaBZ112kNML9TqQfTd5F8vacBgS1pS70Te0Lq9F~IXNtQlfzXtpE7qZOGm56yFFPCM0v4l3IqFOdSbZ9uB3heaci6eGfHxRwdowaOWem0Qk7Yx64l5MQJSjImRbuDxURo7HGSYRNBHTLKiEpnNMMwU6BPgv6Ay2UONciYEJpWka-oSm~HwRVIFAhkstc7U5hHDSrSDVd7fzw__',
  },
]

export const ColorAutoPicker = () => {
  // примеры https://www.figma.com/design/h2KbpDWQWYogZPVuC6ZZl9/Ads-%C3%97-Newsfeed?node-id=4617-44778
  const [images, setImages] = useState<ImageRecord[]>([imagesList[0]])
  const allImages = useMemo<ImageRecord[]>(() => imagesList, [])

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (images.length === allImages.length) {
        clearInterval(intervalId)
        return
      }

      setImages([
        ...images,
        allImages[images.length],
      ])
    }, 2000)
  }, [allImages, images])

  return (
    <div className="flex flex-wrap gap-5">
      {images.map(img => (
        <Tile key={img.name} keyName={img.name} src={img.src} />
      ))}
    </div>
  )
}
