import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.css']
})
export class AddLinkComponent implements OnInit {
  link: any;
  linkForm: FormGroup;
  public linkPattern = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { 
    this.createForm();
  }

  ngOnInit() {
   
  }
  createForm() {
    this.linkForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(this.linkPattern)]]
    });
  }
  sendLink() {
   let data = this.linkForm.value;
   this.http.post('/link', data).subscribe(res => {
     if(res) {
       this.router.navigate(['/links'])
     }
   })
  }

}
