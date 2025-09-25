import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from './types/task.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('To-Do App');
  protected readonly tasks = signal<Task[]>([]);
  protected readonly newTaskText = signal('');

  addTask() {
    const text = this.newTaskText().trim();

    if(text) {
      let isDuplicate = false;
      const text = this.newTaskText().trim();

      this.tasks.update(tasks => {
        isDuplicate = tasks.some(task => task.text === text);
        if(!isDuplicate) {
          const newTask: Task = {
            id: Date.now(),
            text,
            completed: false
          };
          this.newTaskText.set('');
          return [...tasks, newTask];
        }
        console.log("Task already exists");
        return tasks;
      });
    }
  }

  toggleTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task
      )
    );
  }

  deleteTask(id: number) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  get completedCount() {
    return this.tasks().filter(task => task.completed).length;
  }

  get totalCount() {
    return this.tasks().length;
  }
}
