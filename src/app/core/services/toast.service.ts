import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private CreateToastContainer() {
    if(!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end';
      document.body.appendChild(container);
    }
  }

  private CreateToastElement(message: string, alertClass:string, duration:number=5000) {
    this.CreateToastContainer();
    const toastContainer = document.getElementById('toast-container');
    if(!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg','z-50')
    toast.innerHTML = `
      <span>${message}</span>
      <button class="btn btn-sm btn-ghost ml-44">X</button>
    `;

    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    })

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, duration);
  }


  Success(message: string, duration?: number) {
    this.CreateToastElement(message, 'alert-success', duration);
  }
  Error(message: string, duration?: number) {
    this.CreateToastElement(message, 'alert-error', duration);
  }
  Warning(message: string, duration?: number) {
    this.CreateToastElement(message, 'alert-warning', duration);
  }
  Info(message: string, duration?: number) {
    this.CreateToastElement(message, 'alert-info', duration);
  }

}
