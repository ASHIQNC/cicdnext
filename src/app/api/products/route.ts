import { db } from '@/db';

//use uppercase
export const POST = async () => {
  const products = await db.query({
    //topk is the how many result we want
    topK: 12,
    vector: [0, 0, 0],
    includeMetadata: true,
  });
  //we are sending products to the frontend
  return new Response(JSON.stringify(products));
};
