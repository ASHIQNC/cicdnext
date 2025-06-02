//this is the database filter4
//in this project we are using upstash data base
//login to upstash :https://console.upstash.com/login
//2. after login ->go to vector tab-> create new index
//3. give name,type ,(distance) metric:euclidia,dimention:3 since we are using size, color,none
//4. click on next -> free -> create

//note:euclidian measures actual the distance between two vectors
//      cosine measure the distance between two angles

//note:for smaller dimention vectors euclidian is gud

//5. on the same page after creating move down word and select env tab and copy that value and paste in .env file in your project
//6. install upstash/vectors package :npm i @upstash/vector.

import { Index } from '@upstash/vector';
import * as dotenv from 'dotenv';

dotenv.config();

export type Product = {
  id: string;
  imageId: string;
  name: string;
  size: 'S' | 'M' | 'L';
  color: 'white' | 'beige' | 'blue' | 'green' | 'purple';
  price: number;
};

export const db = new Index<Product>();

//note:the above code is enough to establishconnection to data
//inorder to send data to data base we are adding a seedong script

//note:install this package as well : "npm install dotenv -D"
//this dotenv package is used to pull the value from the .env file

//7. add seeding script in our package.json file so that we can add the product in the database
// we are using tsx package to exicute the seeding script
//install the tsx package as well
// "npm install tsx -D" (-D is developer version)
//    "seed": "yarn tsx ./src/db/seed.ts",

//run yarn seed:  to insert data in the database
