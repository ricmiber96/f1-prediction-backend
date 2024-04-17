db = db.getSiblingDB('F1PredictionDB')
db.createCollection('drivers')
db.createCollection('races')
db.drivers.insertMany([
  {
    driverNumber: '22',
    name: 'Yuki',
    surname: 'Tsunoda',
    team: 'RB',
    imageDriver: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/2col/image.png',
    imageNumber: 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/YUKTSU01.png.transform/2col/image.png',
    imageFlag: 'https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/flags/Japan.jpg.transform/2col/image.jpg'
  }
])

db.races.insertMany([
  {
    place: 'Bahrain',
    circuit: 'FORMULA 1 GULF AIR BAHRAIN GRAND PRIX 2024',
    imgCircuit: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Saudi%20Arabia%20carbon.png.transform/2col/image.png',
    imgBackground: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245020/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Bahrain.jpg.transform/fullbleed/image.jpg',
    flag: 'https://www.formula1.com/content/dam/fom-website/flags/Bahrain.jpg',
    startDate: '2024-03-01'
  },
  {
    place: 'Saudi Arabia',
    circuit: 'FORMULA 1 STC SAUDI ARABIAN GRAND PRIX 2024',
    imgCircuit: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Saudi%20Arabia%20carbon.png.transform/2col/image.png',
    imgBackground: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245020/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Saudi%20Arabia.jpg.transform/fullbleed/image.jpg',
    flag: 'https://www.formula1.com/content/dam/fom-website/flags/Saudi%20Arabia.jpg',
    startDate: '2024-03-08'
  },
  {
    place: 'Australia',
    circuit: 'FORMULA 1 AUSTRALIAN GRAND PRIX 2024',
    imgCircuit: 'https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Australia%20carbon.png.transform/2col/image.png',
    imgBackground: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677245020/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Australia.jpg.transform/fullbleed/image.jpg',
    flag: 'https://www.formula1.com/content/dam/fom-website/flags/Australia.jpg',
    startDate: '2024-03-23'
  }
])
