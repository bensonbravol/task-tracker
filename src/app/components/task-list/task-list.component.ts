import { Component, OnInit } from '@angular/core';

import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }


  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('Tasks received:', tasks);
        console.log('First task:', tasks[0]);
        console.log('CreatedAt:', tasks[0]?.createdAt);

        this.tasks = tasks;
      },

      error: (error) => {
        console.error('Failed to load tasks:', error);
      },
    });
  }

  addTask(task: Omit<Task, 'id' | 'completed' | 'createdAt'>): void {
    this.taskService.addTask(task).subscribe({
      next: (newTask) => {
        this.tasks.push(newTask);
      },

      error: (error) => {
        console.error('Failed to add task:', error);
      },
    });
  }

  markCompleted(task: Task): void {
    const updatedTask: Task = {
      ...task,
      completed: true,
    };

    this.taskService.updateTask(updatedTask).subscribe({
      next: (updated) => {
        const index = this.tasks.findIndex((t) => t.id === updated.id);

        if (index !== -1) {
          this.tasks[index] = updated;
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
      next: (updated) => {
        const index = this.tasks.findIndex((t) => t.id === updated.id);

        if (index !== -1) {
          this.tasks[index] = updated;
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
