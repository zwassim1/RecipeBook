import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  choice = 'recipe';
  title = 'recipe-book';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBZplT4V_O3jv5F6TQtTRh2GPAsNNlwFF4',
      authDomain: 'recipe-book-51132.firebaseapp.com'
    });
  }

  onChoiceSelected(event) {
    this.choice = event;
  }
}
