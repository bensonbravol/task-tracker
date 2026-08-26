import { Component } from '@angular/core';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Learn Angular components',
      completed: true,
    },
    {
      id: 2,
      title: 'Learn Angular forms',
      completed: false,
    },
    {
      id: 3,
      title: 'Learn Angular services',
      completed: false,
    },
  ];

  markCompleted(task: Task) {
    task.completed = true;
  }

  reopenTask(task: Task) {
    task.completed = false;
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }
}
