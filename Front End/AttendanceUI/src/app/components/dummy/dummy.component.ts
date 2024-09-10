import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  // Define a property to hold some dat

  constructor() { }

  ngOnInit(): void {
    // Initialize the property or fetch data here
  }
}
