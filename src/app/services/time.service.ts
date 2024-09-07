import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }

  startCountdown(
    seconds: number,
    callback: (formattedTime: string) => void,
  ): void {
    let timeLeft = seconds;
    const interval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(interval);
        callback('00:00');
      } else {
        timeLeft--;
        callback(this.formatTime(timeLeft));
      }
    }, 1000);
  }
}
