import { Component } from '@angular/core';
import { MainComponent } from '../../components/main/main.component';
import { NewTaskComponent } from '../../components/new-task/new-task.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewTaskComponent, MainComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
