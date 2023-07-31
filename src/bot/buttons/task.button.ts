import { ACTION_NAME } from 'bot/constants/actions.enum';
import { ITaskEntity } from 'infra/database/entities/task.entity';
import { Markup } from 'telegraf';

export const taskMenu = Markup.inlineKeyboard([
  [
    Markup.button.callback('Мои задачи', ACTION_NAME.MY_TASK)
  ],
  [
    Markup.button.callback('Добавь задачу', ACTION_NAME.ADD_TASK)
  ],
  [
    Markup.button.callback('Назад в меню', ACTION_NAME.HELP_MENU)
  ]
]);

export const backMenuTask = Markup.inlineKeyboard([
  [
    Markup.button.callback('Назад в меню', ACTION_NAME.TASK)
  ]
]);

export const setTaskPanel = (mode: 'unSub' | 'sub', taskID: number) => {
  const selecteTitle = mode === 'sub' ? 'Уведомить' : 'Отменить уведомление';
  const handlerText = 'delete_task?' + JSON.stringify({ id: taskID });

  return Markup.inlineKeyboard([
    [Markup.button.callback('Удалить задачу', handlerText)],
    [Markup.button.callback(selecteTitle, ACTION_NAME.HELP_MENU)],
    [Markup.button.callback('Назад в меню', ACTION_NAME.TASK)]
  ]);
};

export const buttonInfoTask = (tasks: ITaskEntity[]) => {
  const buttonTasks = [];
  for (const element of tasks) {
    const text = 'task_detail?' + JSON.stringify({ id: element.id });
    const title = element.title;
    buttonTasks.push([Markup.button.callback(title, text)]);
  }

  return Markup.inlineKeyboard(buttonTasks);
};
