import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
  links: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/link').subscribe(res => {
      this.links = res;
    })
  }

}
