import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.page.html',
  styleUrls: ['./search-book.page.scss'],
})
export class SearchBookPage implements OnInit {
  searchTerm: string = '';
  filteredBooks: any;
  constructor(private router: Router, private dataSerivce: DataService) {}
  ngOnInit() {
    // Initially show all books
    this.filteredBooks = this.dataSerivce.all_books;
  }

  filterBooks(event: any) {
    // console.log('fun call-->', event);
    const searchValue = event.target.value?.toLowerCase() || '';
    this.filteredBooks = this.filteredBooks.filter((book: any) =>
      book.bookName.toLowerCase().includes(searchValue)
    );
  }

  clickFn(index: any) {
    console.log('click fn is working', index);
    const selectedBook = this.filteredBooks[index];
    this.router.navigate(['/book-detail'], { state: { book: selectedBook } }); // Pass selected book data
  }
}
