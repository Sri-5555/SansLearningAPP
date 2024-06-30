import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testlist',
  templateUrl: './testlist.page.html',
  styleUrls: ['./testlist.page.scss'],
})
export class TestlistPage implements OnInit {
  segment = 'testList';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  segmentChanged(event) {
    console.log("event", event.detail.value);
    this.router.navigate([`dashboard/${event.detail.value}`]);  }
}
