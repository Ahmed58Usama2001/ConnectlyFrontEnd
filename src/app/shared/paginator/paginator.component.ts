import { Component, computed, input, model, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true, // make it standalone if needed
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  // Signals
  pageNumber = model(1);
  pageSize = model(10);

  // Inputs from parent
  totalCount = input(0);
  totalPages = input(0);

  // Options for dropdown
  pageSizeOptions = [5, 10, 20, 50];

  // Output event
  pageChange = output<{ pageIndex: number; pageSize: number }>();

  // Computed: last item index in current page
  lastItemIndex = computed(() => {
    return Math.min(this.pageNumber() * this.pageSize(), this.totalCount());
  });

  // Handle page/size changes
  onPageChange(newPage?: number, pageSizeTarget?: EventTarget | null) {
    if (pageSizeTarget) {
      const size = Number((pageSizeTarget as HTMLSelectElement).value);
      this.pageSize.set(size);
      this.pageNumber.set(1); // reset to first page on size change
    }

    if (newPage !== undefined && newPage > 0 && newPage <= this.totalPages()) {
      this.pageNumber.set(newPage);
    }

    this.pageChange.emit({
      pageIndex: this.pageNumber(),
      pageSize: this.pageSize()
    });
  }
}
