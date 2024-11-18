import prisma from "../lib/prisma";

async function main() {
  // 初期データの作成
  const todos = [
    {
      title: 'First Todo',
      content: 'This is the content of the first todo.',
    },
    {
      title: 'Second Todo',
      content: 'This is the content of the second todo.',
    },
    {
      title: 'Third Todo',
      content: 'This is the content of the third todo.',
    },
  ];

  // データベースに挿入
  for (const todo of todos) {
    await prisma.todos.create({
      data: todo,
    });
  }

  console.log('Seed data has been added!');
}

// メイン関数を実行
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
