import { Component, OnInit } from '@angular/core';

import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css'],
})
export class MyTasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },

      error: (error) => {
        console.error('Failed to load tasks:', error);
      },
    });
  }

  markCompleted(task: Task): void {
    const updatedTask: Task = {
      ...task,
      completed: true,
    };

    this.taskService.updateTask(updatedTask).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex((t) => t.id === updatedTask.id);

        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },

      error: (error) => {
        console.error('Failed to complete task:', error);
      },
    });
  }

  reopenTask(task: Task): void {
    const updatedTask: Task = {
      ...task,
      completed: false,
    };

    this.taskService.updateTask(updatedTask).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex((t) => t.id === updatedTask.id);

        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },

      error: (error) => {
        console.error('Failed to reopen task:', error);
      },
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },

      error: (error) => {
        console.error('Failed to delete task:', error);
      },
    });
  }
}
