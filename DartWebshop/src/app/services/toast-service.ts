import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastMessage: string = '';
  isError: boolean = false;
  toastType: string = '';
  showToast: boolean = false;
  private toastTimer: any;

  showOrUpdateToast(message: string, isError: boolean, messageType: string) {
    this.toastMessage = message;
    this.isError = isError;
    this.toastType = messageType;
    this.showToast = true;
    this.resetTimer();
  }
  resetTimer() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => {
      this.closeToast();
    }, 5000);
  }

  closeToast() {
    this.showToast = false;
  }

  getToastHeader(): string {
    switch (this.toastType) {
      case 'warning':
        return 'Waarschuwing';
      case 'error':
        return 'Incorrect!';
      case 'success':
        return 'Succes!';
      default:
        return '';
    }
  }
}
