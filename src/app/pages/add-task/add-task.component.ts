import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {}

  addTask(task: Omit<Task, 'id' | 'completed' | 'createdAt'>): void {
    this.taskService.addTask(task).subscribe({
      next: (newTask) => {
        console.log('Task created:', newTask);

        // Go to My Tasks after successful save
        this.router.navigate(['/my-tasks']);
      },

      error: (error) => {
        console.error('Failed to create task:', error);
      },
    });
  }
}
