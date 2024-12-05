import prisma from '@/lib/prisma'

export const sliderList = [
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/10-21/pic_20241021185242_11524.jpg',
    title: '小鹏P7+ Al智驾技术分享会',
    titleEn: 'Xpeng P7+ Al Driving Technology Sharing Session',
    subtitle: '2024.10.24 14:30',
    subtitleEn: '2024.10.24 14:30',
    buttons: [
      {
        text: '点击预约直播',
        textEn: 'Book live',
        href: '/p7plus'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/10-14/pic_20241014190814_69858.jpg',
    title: '小鹏P7+ 越级登场',
    titleEn: 'Xpeng P7+ Hits the Market',
    subtitle: '智驾掀背轿跑 开启预售',
    subtitleEn: 'Al Driving Sedan Hits the Market',
    buttons: [
      {
        text: '立即预定',
        textEn: 'Order',
        href: '/p7plus'
      },
      {
        text: '预约品鉴',
        textEn: 'Book driving',
        href: '/p7plus'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/09-26/pic_20240926095453_31562.jpg',
    title: '2024小鹏 G9',
    titleEn: 'Xpeng G9 2024',
    subtitle: '650四驱高性能上新',
    subtitleEn: '650 four-wheel drive high performance on the new',
    buttons: [
      {
        text: '立即订购',
        textEn: 'Order',
        href: '/g9'
      },
      {
        text: '预约试驾',
        textEn: 'Book driving',
        href: '/g9'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/04-11/pic_20240411093020_64152.jpg',
    title: '小鹏G6  暗夜黑来袭',
    titleEn: 'Xpeng G6 Black Night Arrival',
    subtitle: '580长续航Plus发布',
    subtitleEn: '580 Long-Range Plus New Arrival',
    buttons: [
      {
        text: '了解G6',
        textEn: 'Learn about G6',
        href: '/g6'
      },
      {
        text: '预约试驾',
        textEn: 'Book driving',
        href: '/g6'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/09-25/pic_20240925134138_94413.jpg',
    title: '超智驾大七座',
    titleEn: 'Super smart car big seven',
    subtitle: '小鹏X9 610长续航 新品上市',
    subtitleEn: 'Xpeng X9 610 long life new product launched',
    buttons: [
      {
        text: '立即订购',
        textEn: 'Order',
        href: '/x9'
      },
      {
        text: '预约试驾',
        textEn: 'Book driving',
        href: '/x9'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/08-27/pic_20240827173407_30962.jpg',
    title: '小鹏 MONA M03  智趣登场',
    titleEn: 'Xpeng MONA M03 Smart Arrival',
    subtitle: '智能纯电掀背轿跑',
    subtitleEn: 'Smart Electric Sedan Hits the Market',
    buttons: [
      {
        text: '立即订购',
        textEn: 'Order',
        href: '/m03'
      },
      {
        text: '预约试驾',
        textEn: 'Book driving',
        href: '/m03'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2024/03-25/pic_20240325100430_54769.jpg',
    title: '全新 P7i 702Max 鹏翼版',
    titleEn: 'Xpeng P7i 702Max Pengyi Edition',
    subtitle: '超智驾鹏翼轿跑 全新登场',
    subtitleEn: 'Super Al Driving Pengyi Sedan New Arrival',
    buttons: [
      {
        text: '了解P7i',
        textEn: 'Learn about P7i',
        href: '/p7i'
      },
      {
        text: '预约试驾',
        textEn: 'Book driving',
        href: '/p7i'
      }
    ]
  },
  {
    img: 'https://xps01.xiaopeng.com/cms/material/pic/2023/09-25/pic_20230925172656_24673.jpg',
    title: '2024款小鹏P5',
    titleEn: 'Xpeng P5 2024',
    subtitle: '「真智享」越级轿车',
    subtitleEn: '「True Intelligence」Super Sedan',
    buttons: [
      {
        text: '了解2024款P5',
        textEn: 'Learn about 2024 P5',
        href: '/p5'
      },
      {
        text: '预约试驾',
        textEn: 'Book driving',
        href: '/p5'
      }
    ]
  }
]

export const importSliders = async () => {
  await prisma.homeSliders.deleteMany()
  await prisma.homeSliders.createMany({
    data: sliderList.map((item, index) => ({
      img: item.img,
      title: item.title,
      titleEn: item.titleEn,
      subtitle: item.subtitle,
      subtitleEn: item.subtitleEn,
      buttons: item.buttons,
      order: index + 1,
      status: 1
    }))
  })
}
