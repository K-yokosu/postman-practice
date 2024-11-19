import prisma from "../lib/prisma";

async function main() {
  // 初期データの作成
  const todos = [
    {
      title: 'abc',
      content: 'ABC',
    },
    {
      title: 'b',
      content: 'B',
    },
    {
      title: 'c',
      content: 'C',
    },
  ];

  try {
    for (const todo of todos) {
        await prisma.todos.create({
            data: todo,
        });
    }
  } catch (error) {
    console.log(error)
    process.exit(1)  // スクリプト実行時にエラー発生したら、異常終了としてプロセス終了をする
  } finally {
    await prisma.$disconnect(); //prismaとの接続を遮断
  }
}

// メイン関数を実行
main();
