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

export const setTaskPanel = (isSubscribe: boolean, taskID: number) => {
  const serializedTaskInfo = JSON.stringify({ id: taskID });
  const deleteHandlerText = `${ACTION_NAME.DELETE_TASK}?${serializedTaskInfo}`;
  let selecteTitle = '';
  let subHandlerText = '';
  if (!isSubscribe) {
    selecteTitle = 'Уведомить';
    subHandlerText = `${ACTION_NAME.SUBSCRIBE_TASK}?${serializedTaskInfo}`;
  } else {
    selecteTitle = 'Отписатся от уведомления';
    subHandlerText = `${ACTION_NAME.UN_SUBSCRIBE_TASK}?${serializedTaskInfo}`;
  }

  return Markup.inlineKeyboard([
    [Markup.button.callback('Удалить задачу', deleteHandlerText)],
    [Markup.button.callback(selecteTitle, subHandlerText)],
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
