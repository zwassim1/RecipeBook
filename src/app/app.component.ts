import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  choice: string = 'recipe';
  title = 'recipe-book';

  onChoiceSelected(event) {
    this.choice = event;
  }
}
