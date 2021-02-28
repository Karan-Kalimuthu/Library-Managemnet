import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  constructor(public BooksService: BooksService, public route: ActivatedRoute) { }
  enteredContent = '';
  enteredTitle = '';
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      imagePath: new FormControl(null, { validators: [Validators.required] }),
      author: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    // this.BooksService.addBook(this.form.value.title, this.form.value.description, this.form.value.imagePath, this.form.value.author);
    this.form.reset();
  }
}
