import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public all_data: any;
  public Famous_books: any;
  constructor(private router: Router, private dataSerivce: DataService) {}

  ngOnInit() {
    this.all_data = this.dataSerivce.all_books;
    this.Famous_books = this.dataSerivce.Famous_books;
    const storedFavorites = JSON.parse(
      localStorage.getItem('favoriteBooks') || '[]'
    );
    this.all_data.forEach((book: any) => {
      if (storedFavorites.includes(book.id)) {
        book.isFavorite = true;
      }
    });
  }
  // isCenterSlide(index: number): boolean {
  //   const centerIndex = Math.floor(this.data.length / 2);
  //   return index === centerIndex;
  // }
  goBookDetailPage(book: any) {
    this.dataSerivce.setBooksDetail(book);
    this.router.navigate(['/book-detail']);
  }
  clickSearch() {
    console.log('click');
    this.router.navigate(['/search-book']);
  }
  logout() {
    this.router.navigate(['/login']);
  }
  updateLocalStorage() {
    const favoriteBookIds = this.all_data
      .filter((book: any) => book.isFavorite)
      .map((book: any) => book.id);
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBookIds));
  }
  toggleFavorite(bookId: number) {
    const book = this.all_data.find((b: any) => b.id === bookId);
    if (book) {
      book.isFavorite = !book.isFavorite; // Toggle favorite status
      this.updateLocalStorage();
    }
  }
}
