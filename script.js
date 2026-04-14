import { prisma } from "./lib/prisma.js";

async function main() {
  console.log('🌱 Seeding one post by Lola with 2 comments by Nina...');

  // Find Lola (post author)
  const lola = await prisma.user.findUnique({
    where: { username: 'lola' }
  });

  if (!lola) {
    console.error('❌ User "lola" not found. Please register "lola" first.');
    process.exit(1);
  }

  // Find Nina (comment author)
  const nina = await prisma.user.findUnique({
    where: { username: 'nina' }
  });

  if (!nina) {
    console.error('❌ User "nina" not found. Please register "nina" first.');
    process.exit(1);
  }

  console.log(`✅ Found authors → Post by: ${lola.name || lola.username} | Comments by: ${nina.name || nina.username}`);

  // Optional: Clear previous test data (uncomment if you want a clean start)
  // await prisma.comment.deleteMany({ where: { post: { authorId: lola.id } } });
  // await prisma.post.deleteMany({ where: { authorId: lola.id } });

  // Create 1 post by Lola
  const post = await prisma.post.create({
    data: {
      title: "My First Blog Post2 - Getting Started with Prisma",
      content: "Hello everyone! This is my first post using Prisma and Express. Building a blog with user authentication and comments is actually quite straightforward once you get the relations right.\n\nWhat do you think about this setup?",
      published: true,
      authorId: lola.id,
    }
  });

  console.log(`✅ Post created: "${post.title}"`);

  // Add 2 comments by Nina on the post
  const comments = [
    "Great first post Lola! I really like how clean the code looks. Can't wait to see more content.",
    "This is awesome! The Prisma relations are working perfectly. Keep it up! 👍"
  ];

  for (const commentContent of comments) {
    await prisma.comment.create({
      data: {
        content: commentContent,
        postId: post.id,
        authorId: nina.id,
      }
    });
  }

  console.log(`✅ Added 2 comments by Nina on the post`);

  console.log('\n🎉 Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });