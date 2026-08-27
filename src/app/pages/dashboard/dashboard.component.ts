import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasks: Task[] = [];

  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  highPriorityTasks = 0;
  mediumPriorityTasks = 0;
  lowPriorityTasks = 0;

  statusChartData: any[] = [];

  priorityChartData: any[] = [];

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {

    this.taskService.getTasks().subscribe({

      next: (tasks) => {

        this.tasks = tasks;

        this.calculateStatistics();

        this.prepareChartData();

      },

      error: (error) => {

        console.error(
          'Failed to load dashboard tasks:',
          error
        );

      }

    });

  }

  calculateStatistics(): void {

    this.totalTasks = this.tasks.length;

    this.completedTasks = this.tasks.filter(
      task => task.completed
    ).length;

    this.pendingTasks = this.tasks.filter(
      task => !task.completed
    ).length;

    this.highPriorityTasks = this.tasks.filter(
      task => task.priority === 'High'
    ).length;

    this.mediumPriorityTasks = this.tasks.filter(
      task => task.priority === 'Medium'
    ).length;

    this.lowPriorityTasks = this.tasks.filter(
      task => task.priority === 'Low'
    ).length;

  }

  prepareChartData(): void {

    this.statusChartData = [
      {
        status: 'Completed',
        count: this.completedTasks
      },
      {
        status: 'Pending',
        count: this.pendingTasks
      }
    ];


    this.priorityChartData = [
      {
        priority: 'High',
        count: this.highPriorityTasks
      },
      {
        priority: 'Medium',
        count: this.mediumPriorityTasks
      },
      {
        priority: 'Low',
        count: this.lowPriorityTasks
      }
    ];

  }

}
