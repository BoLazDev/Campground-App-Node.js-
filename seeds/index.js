const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63ac0dc4ba22b8161edea317',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [ 
                {
                    "url" : "https://res.cloudinary.com/dzadg2ilf/image/upload/v1673352773/YelpCamp/wmiqyc5rn50ag7vrcckd.avif",
                    "filename" : "YelpCamp/wmiqyc5rn50ag7vrcckd"
                }, 
                {
                    "url" : "https://res.cloudinary.com/dzadg2ilf/image/upload/v1673352774/YelpCamp/sp7qhlvojjchq1j7sbma.avif",
                    "filename" : "YelpCamp/sp7qhlvojjchq1j7sbma"
                }, 
                {
                    "url" : "https://res.cloudinary.com/dzadg2ilf/image/upload/v1673352774/YelpCamp/im3epkkxtswpks85io1b.avif",
                    "filename" : "YelpCamp/im3epkkxtswpks85io1b"
                }
            ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod totam, ut odit omnis sint debitis similique suscipit, doloremque magni blanditiis iure consectetur enim fuga vel alias, ab soluta voluptate tempora.',
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});